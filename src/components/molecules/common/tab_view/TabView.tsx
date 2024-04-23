/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */

import {colors} from '@uoslife/design-system';
import {Children, PropsWithChildren} from 'react';
import {useWindowDimensions} from 'react-native';
import {TabView as RNTabView, SceneMap, TabBar} from 'react-native-tab-view';

type TabViewScreenProps = {
  tabKey: string;
  tabTitle: string;
  component: React.ReactNode;
};

type TabViewProps = PropsWithChildren & {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Screen = ({component}: TabViewScreenProps) => {
  return component;
};

const TabView = ({children, index, setIndex}: TabViewProps) => {
  const layout = useWindowDimensions();

  // @ts-ignore
  const routes = Children.toArray(children).map(({props}) => {
    const {tabKey, tabTitle, component} = props as TabViewScreenProps;
    return {key: tabKey, title: tabTitle, component};
  });
  const renderScene = SceneMap(transformSceneMap(routes));

  return (
    <RNTabView
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: colors.primaryBrand}}
          style={{backgroundColor: colors.white}}
          activeColor={colors.primaryBrand}
          inactiveColor={colors.grey190}
          pressColor={colors.primaryBrand}
        />
      )}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};

TabView.Screen = Screen;

export default TabView;

function transformSceneMap(
  routes: {
    key: string;
    title: string;
    component: React.ReactNode;
  }[],
) {
  return routes.reduce(
    (result: Record<string, () => React.ReactNode>, item) => {
      const {key, component} = item;
      result[key] = () => component;
      return result;
    },
    {},
  );
}
