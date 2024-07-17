import {
  FoodCategoryType,
  LocationType,
} from '../../features/uos_lifestyle/restaurant/types/restaurant.type';

export const DEFAULT_LOG_EVENT_NAME = 'unknown';

type ApplyDefaultLogEventName<T> = {
  [K in keyof T]: T[K] | typeof DEFAULT_LOG_EVENT_NAME;
};

export type LogEventNameType =
  | 'banner'
  | 'logout'
  | 'unregister'
  | 'library_reservation_success'
  | 'library_return_success'
  | 'library_extend_success'
  | 'clipboard_copy'
  | 'bookmark_success'
  | 'notification_success'
  | 'restaurant_filter'
  | 'restaurant_like'
  | 'restaurant_map_click'
  | typeof DEFAULT_LOG_EVENT_NAME;

type BannerObjectType = ApplyDefaultLogEventName<{
  bannerId: number;
  bannerLinkUrl: string;
}>;

type LogoutObjectType = ApplyDefaultLogEventName<{
  logoutUserId: number;
}>;
type UnregisterObjectType = ApplyDefaultLogEventName<{
  unregisterUserId: number;
}>;

type IncludeUserIdType = ApplyDefaultLogEventName<{userId: number}>;

type RestaurantFilterObject = ApplyDefaultLogEventName<{
  location: LocationType;
  foodCategory: FoodCategoryType;
}>;

export type LogEventObjectType =
  | BannerObjectType
  | LogoutObjectType
  | UnregisterObjectType
  | IncludeUserIdType
  | RestaurantFilterObject;
