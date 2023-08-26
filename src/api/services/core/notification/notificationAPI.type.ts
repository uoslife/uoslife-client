export type SendNotificationParams = {
  topicName: 'string';
  data: {
    notifee: {
      id: 'string';
      title: 'string';
      subtitle: 'string';
      body: 'string';
      data: {
        additionalProp1: {};
        additionalProp2: {};
        additionalProp3: {};
      };
      android: {
        actions: [
          {
            pressAction: {
              id: 'string';
              launchActivity: 'string';
              launchActivityFlags: ['NO_HISTORY'];
              mainComponent: 'string';
            };
            title: 'string';
            icon: 'string';
            input: {};
          },
        ];
        asForegroundService: true;
        lightUpScreen: true;
        autoCancel: true;
        badgeCount: 0;
        badgeIconType: 'NONE';
        category: 'ALARM';
        channelId: 'string';
        color: {};
        colorized: true;
        chronometerDirection: 'string';
        defaults: ['ALL'];
        groupId: 'string';
        groupAlertBehavior: 'ALL';
        groupSummary: true;
        inputHistory: ['string'];
        largeIcon: {};
        circularLargeIcon: true;
        lights: [{}];
        localOnly: true;
        ongoing: true;
        loopSound: true;
        flags: ['FLAG_INSISTENT'];
        onlyAlertOnce: true;
        pressAction: {
          id: 'string';
          launchActivity: 'string';
          launchActivityFlags: ['NO_HISTORY'];
          mainComponent: 'string';
        };
        fullScreenAction: {
          id: 'string';
          launchActivity: 'string';
          launchActivityFlags: ['NO_HISTORY'];
          mainComponent: 'string';
        };
        importance: 'DEFAULT';
        progress: {
          max: 0;
          current: 0;
          indeterminate: true;
        };
        showTimestamp: true;
        smallIcon: 'string';
        smallIconLevel: 0;
        sortKey: 'string';
        style: {};
        ticker: 'string';
        timeoutAfter: 0;
        showChronometer: true;
        vibrationPattern: [0];
        visibility: 'PRIVATE';
        tag: 'string';
        timestamp: 0;
        sound: 'string';
      };
      ios: {
        attachments: [
          {
            id: 'string';
            url: 'string';
            typeHint: 'string';
            thumbnailHidden: true;
            thumbnailClippingRect: {
              x: 0;
              y: 0;
              width: 0;
              height: 0;
            };
            thumbnailTime: 0;
          },
        ];
        badgeCount: 0;
        categoryId: 'string';
        launchImageName: 'string';
        sound: 'string';
        interruptionLevel: 'ACTIVE';
        critical: true;
        criticalVolume: 0;
        threadId: 'string';
        summaryArgument: 'string';
        summaryArgumentCount: 0;
        targetContentId: 'string';
        foregroundPresentationOptions: {
          alert: true;
          sound: true;
          badge: true;
          banner: true;
          list: true;
        };
        communicationInfo: {
          conversationId: 'string';
          body: 'string';
          sender: {
            id: 'string';
            displayName: 'string';
            avatar: 'string';
          };
        };
      };
      remote: {
        messageID: 'string';
        senderID: 'string';
        mutableContent: 0;
        contentAvailable: 0;
      };
    };
  };
};

export type sendNotificationResponse = {
  messageId: 'string';
};

export type sendNotificationWithTokenParams = {
  tokens: ['string'];
} & SendNotificationParams;

export type sendNotificationWithTokenResponse = {
  success: 0;
  failure: 0;
  failedInfo: [
    {
      messageId: 'string';
      error: 'string';
    },
  ];
};
