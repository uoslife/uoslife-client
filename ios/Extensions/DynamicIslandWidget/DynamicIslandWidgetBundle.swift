//
//  DynamicIslandWidgetBundle.swift
//  DynamicIslandWidget
//
//  Created by 공은배 on 5/8/24.
//

import WidgetKit
import SwiftUI

@main
struct DynamicIslandWidgetBundle: WidgetBundle {
    var body: some Widget {
      if #available(iOS 16.1, *) {
        DynamicIslandWidgetLiveActivity()
      }
    }
}
