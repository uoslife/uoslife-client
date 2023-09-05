#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
// #import <CodePush/CodePush.h>
#import <Firebase.h>
#import <RNSplashScreen.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"uoslife";
  self.initialProps = @{};
  
  [FIRApp configure];
  
  bool didFinish = [super application:application didFinishLaunchingWithOptions:launchOptions];
  
  [RNSplashScreen show];
  
  return didFinish;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  // return [CodePush bundleURL];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

@end
