import {MypageProfileNavigationProp} from '../navigators/MyPageStackNavigator';
import {AccountNavigationProp} from '../navigators/AccountStackNavigator';

export type ServiceAgreementStackNavigation =
  | MypageProfileNavigationProp
  | AccountNavigationProp;
