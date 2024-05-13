//
//  DynamicIslandBridge.m
//  uoslife
//
//  Created by 공은배 on 5/8/24.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(DynamicIslandModule, NSObject)

RCT_EXTERN_METHOD(startActivity:(NSString *) seatRoomName  withSeatNumber:(NSString *) seatNumber  withIsUsing:(BOOL *) isUsing withDateInterval:(nonnull NSNumber *) dateInterval)
RCT_EXTERN_METHOD(updateActivity:(BOOL *) isUsing withDateInterval:(nonnull NSNumber *) dateInterval)
RCT_EXTERN_METHOD(endActivity)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}
  
@end
