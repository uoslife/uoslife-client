//
//  DynamicIslandWidgetLiveActivity.swift
//  DynamicIslandWidget
//
//  Created by 공은배 on 5/8/24.
//

import ActivityKit
import WidgetKit
import SwiftUI

private let APP_NAME: String = "시대생"
private let APP_LOGO_IMAGE: String = "uoslife"
private let CHARACTER_IMAGE: String = "iroomae"

struct DynamicIslandWidgetAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
      var isUsing: Bool
      var dateInterval: Double
    }
    var seatRoomName: String
    var seatNumber: String
}

@available(iOS 16.2, *)
struct LockScreenViewContainerStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding(12)
            .activityBackgroundTint(Color("primaryLighter"))
            .activitySystemActionForegroundColor(Color.black)
            .foregroundStyle(Color(.black)).tint(.black)
    }
}

@available(iOS 16.2, *)
struct LockScreenView: View {
  let context: ActivityViewContext<DynamicIslandWidgetAttributes>
  var body: some View {
    VStack(alignment: .center, spacing: 12) {
      HStack() {
        LeadingView()
        Spacer()
        TrailingView(context: context)
      }
      ContentView(context: context)
    }
    .modifier(LockScreenViewContainerStyle())
  }
}

@available(iOS 16.2, *)
struct CompactLeadingView: View {
  let context: ActivityViewContext<DynamicIslandWidgetAttributes>
  
  var body: some View {
    HStack () {
      Image(APP_LOGO_IMAGE)
        .resizable()
        .aspectRatio(contentMode: .fit)
        .frame(width: 22, height: 22)
        .cornerRadius(4)
    }
    .padding(EdgeInsets(top: 0, leading: 4, bottom: 0, trailing: 0))
  }
}

@available(iOS 16.2, *)
struct CompactTrailingView: View {
  let context: ActivityViewContext<DynamicIslandWidgetAttributes>
  
  var body: some View {
    Text(context.state.isUsing ? "이용 중" : "외출 중")
      .foregroundColor(.white)
      .font(.system(size: 14, weight: .medium))
      .padding(EdgeInsets(top: 0, leading: 5, bottom: 0, trailing: 0))
  }
}

@available(iOS 16.2, *)
struct BorderedProgressViews: View {
  var dateInterval: Double
  
  var body: some View {
      VStack {
        ProgressView(timerInterval: Date()...Date().addingTimeInterval(dateInterval)) {}    currentValueLabel: { EmptyView() }
      }
      .padding(EdgeInsets(top: 0, leading: 8, bottom: 0, trailing: 8))
  }
}

@available(iOS 16.2, *)
struct ContentView: View {
  let context: ActivityViewContext<DynamicIslandWidgetAttributes>
  
  var body: some View {
    VStack(alignment: .leading) {
      HStack {
        if context.state.isUsing {
          VStack(alignment: .leading, spacing: 4) {
            Text("학습시간 \(Date() - context.state.dateInterval, style: .timer)")
              .foregroundColor(.white)
              .font(.system(size: 24, weight: .bold))
            Text("\(context.attributes.seatRoomName) \(context.attributes.seatNumber)번 좌석")
              .foregroundColor(.white)
              .font(.system(size: 14, weight: .regular))
          }
        } else {
          VStack(alignment: .leading, spacing: 4) {
            Text(Date() + context.state.dateInterval, style: .timer)
              .foregroundColor(.white)
              .font(.system(size: 26, weight: .heavy))
            Text("복귀까지 남은 시간이에요")
              .foregroundColor(.white)
              .font(.system(size: 13, weight: .regular))
          }
        }
        Spacer()
        Image(CHARACTER_IMAGE)
          .resizable()
          .aspectRatio(contentMode: .fit)
          .frame(width: 90, height: 70)
          .cornerRadius(12)
      }
      .padding(EdgeInsets(top: 0, leading: 8, bottom: 0, trailing: 0))
      if !context.state.isUsing {
        BorderedProgressViews(dateInterval: context.state.dateInterval)
      }
    }
  }
}

struct LeadingView: View {
  var body: some View {
    HStack () {
      Image(APP_LOGO_IMAGE)
        .resizable()
        .aspectRatio(contentMode: .fit)
        .frame(width: 24, height: 24)
        .cornerRadius(6)
      Text(APP_NAME)
        .foregroundColor(.white)
        .font(.system(size: 14, weight: .semibold))
    }.padding(EdgeInsets(top: 0, leading: 8, bottom: 0, trailing: 0))
  }
}

@available(iOS 16.2, *)
struct TrailingView: View {
  let context: ActivityViewContext<DynamicIslandWidgetAttributes>
  
  var body: some View {
      Text(context.state.isUsing ? "이용 중" : "외출 중")
        .foregroundColor(.white)
        .font(.system(size: 14, weight: .regular))
        .padding(EdgeInsets(top: 0, leading: 0, bottom: 0, trailing: 10))
  }
}




@available(iOS 16.2, *)
struct DynamicIslandWidgetLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: DynamicIslandWidgetAttributes.self) { context in
          LockScreenView(context: context)
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                  LeadingView()
                }
                DynamicIslandExpandedRegion(.trailing) {
                  TrailingView(context: context)
                }
            
              DynamicIslandExpandedRegion(.bottom) {
                  ContentView(context: context)
                }
            } compactLeading: {
                CompactLeadingView(context: context)
            } compactTrailing: {
                CompactTrailingView(context: context)
            } minimal: {
                EmptyView()
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}
