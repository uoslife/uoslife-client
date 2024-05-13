//
//  DynamicIslandModule.swift
//  uoslife
//
//  Created by 공은배 on 5/8/24.
//

import Foundation
import SwiftUI
import ActivityKit

@available(iOS 16.2, *)

@objc(DynamicIslandModule)
class DynamicIslandModule: NSObject {
  @objc(startActivity:withSeatNumber:withIsUsing:withDateInterval:)
  func startActivity(seatRoomName: String, seatNumber: String, isUsing: Bool, dateInterval: NSNumber) -> Void {
    do {
      let ActivityAttributes = DynamicIslandWidgetAttributes(seatRoomName: seatRoomName, seatNumber: seatNumber)
      let ActivityContentState = DynamicIslandWidgetAttributes.ContentState(isUsing: isUsing, dateInterval: Double(truncating: dateInterval))
      
      let _ = try Activity<DynamicIslandWidgetAttributes>.request(attributes: ActivityAttributes, contentState: ActivityContentState, pushType: nil)
    } catch {
      print("Error")
    }
  }
  
  @objc(updateActivity:withDateInterval:)
  func updateActivity(isUsing: Bool, dateInterval: NSNumber) -> Void {
    let ActivityContentState = DynamicIslandWidgetAttributes.ContentState(isUsing: isUsing, dateInterval: Double(truncating: dateInterval))
    Task {
      for activity in Activity<DynamicIslandWidgetAttributes>.activities {
        await activity.update(using: ActivityContentState)
      }
    }
  }
  
  
  @objc(endActivity)
  func endActivity() -> Void {
    Task {
      for activity in Activity<DynamicIslandWidgetAttributes>.activities {
        await activity.end(dismissalPolicy: .default)
      }
    }
  }
}
