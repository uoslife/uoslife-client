package com.beyondconnect.uoslife

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Intent
import android.graphics.Color
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.os.SystemClock
import android.widget.RemoteViews
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat
import androidx.core.net.toUri
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import kotlin.math.abs

class LibraryStateNotificationModule: ReactContextBaseJavaModule {
  private lateinit var handler: Handler

  private lateinit var notificationManager: NotificationManager
  private val channelId: String = "255"
  private val notificationId: Int = 255
  private var packageName: String = ""
  private var myContext: ReactApplicationContext;

  constructor (context: ReactApplicationContext): super(context) {
      this.myContext = context
      this.packageName = this.myContext.packageName
  }

  override fun getName(): String {
    return "LibraryStateNotification"
  }

  private fun buildNotification(objectData:ReadableMap): NotificationCompat.Builder {
    val id = notificationId

    val seatRoomName = objectData.getString("seatRoomName");
    val seatNumber = objectData.getString("seatNumber");
    val isUsing = objectData.getBoolean("isUsing");
    val dateInterval = objectData.getInt("dateInterval");

    val title = if (isUsing) "이용 중" else "외출 중";
    val body = if (isUsing) "$seatRoomName | ${seatNumber}번 좌석" else "복귀까지 남은 시간이에요";

    val isCountDown = !isUsing

    val startTime = SystemClock.elapsedRealtime()

    val elapsed: Int = if (isUsing) dateInterval * 1000 else dateInterval * 1000 * (-1)
    val remainingTime = startTime - elapsed

    // mainActivity Intent
    val intent = Intent(Intent.ACTION_VIEW, "uoslife://library".toUri(), myContext, MainActivity::class.java)
      .addFlags( Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_SINGLE_TOP)

    // notification PendingIntent
    var pendingIntent = PendingIntent.getActivity(myContext, 0, intent, if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) PendingIntent.FLAG_IMMUTABLE else PendingIntent.FLAG_UPDATE_CURRENT)

    // set notification view layout
    val notificationLayout = RemoteViews(packageName, R.layout.notification_view);
    notificationLayout.setTextViewText(R.id.title, title)
    notificationLayout.setTextViewText(R.id.text, body)

    notificationLayout.setChronometerCountDown(R.id.simpleChronometer, isCountDown);
    notificationLayout.setChronometer(R.id.simpleChronometer, remainingTime, ("%tM:%tS"), true);

    val bigNotificationLayout = RemoteViews(packageName, R.layout.notification_view_big);
    bigNotificationLayout.setTextViewText(R.id.title, title)
    bigNotificationLayout.setTextViewText(R.id.text, body)

    bigNotificationLayout.setChronometerCountDown(R.id.simpleChronometer, isCountDown);
    bigNotificationLayout.setChronometer(R.id.simpleChronometer, remainingTime, ("%tM:%tS"), true);

    // set notification channel
    val notificationChannel =
      NotificationChannel(channelId, "도서관 이용시간", NotificationManager.IMPORTANCE_LOW)
    notificationChannel.description = "도서관 이용시간 및 외출시간을 안내합니다."
    notificationChannel.enableLights(true)
    notificationChannel.lightColor = R.color.uoslife_primarybrand
    notificationChannel.setShowBadge(false)
    notificationManager = myContext.getSystemService(NotificationManager::class.java)
    notificationManager.createNotificationChannel(notificationChannel)


    val notificationBuilder: NotificationCompat.Builder =
      NotificationCompat.Builder(myContext,channelId)

    notificationBuilder
      .setContentTitle(title)
      .setContentText(body)
      .setSmallIcon(R.drawable.ic_small_icon)
      .setColor(ContextCompat.getColor(reactApplicationContext, R.color.uoslife_primarybrand)) // small icon background color
      .setStyle(NotificationCompat.DecoratedCustomViewStyle())
      .setCustomContentView(notificationLayout)
      .setCustomBigContentView(bigNotificationLayout)
      .setContentIntent(pendingIntent)
      .setPriority(NotificationCompat.PRIORITY_LOW)
      .setSound(null)
      .setAutoCancel(false) // 알림 클릭시 제거 방지
      .setShowWhen(false) // timestamp 표시하지 않음
      .setOngoing(true); // 알림 제거 방지

    // 외출 시간 종료 후 알림 삭제 - background 상태일 경우, 삭제되지 않는 문제 o
    if (!isUsing) {
      val handler = Handler(Looper.getMainLooper())
      handler.postDelayed({
        try {
          removeNotification(id)
        } catch (e:Exception) {
          println(e)
        }
      }, abs(elapsed).toLong())
    }

    return notificationBuilder
  }

  private fun startNotification(objectData: ReadableMap){
    val notificationBuilder:NotificationCompat.Builder = buildNotification(objectData)
    notificationManager.notify(notificationId, notificationBuilder.build())
  }

  @ReactMethod
  fun startLibraryStateNotification(objectData: ReadableMap) {
    startNotification(objectData)
  }

  private fun removeNotification(id: Int) {
    val notificationManager = myContext.getSystemService(NotificationManager::class.java)
    notificationManager.cancel(id);
  }

  @ReactMethod
  fun endLibraryStateNotification() {
    removeNotification(notificationId);
  }
}

