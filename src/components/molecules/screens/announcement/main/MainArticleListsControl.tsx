import {createRef, useEffect, useRef} from 'react';
import {Dimensions, View} from 'react-native';
import {useAtom} from 'jotai';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {
  AnnouncmentCategoryOriginType,
  categoryStatusAtom,
} from '../../../../../store/announcement';
import CategoryTab from '../category-tab/CategoryTab';
import MainArticleList from './MainArticleList';

const {width} = Dimensions.get('window');

const MainArticleListsControl = () => {
  const horizontalScrollViewRef = useRef<ScrollView>(null);
  const [categoryStatus, setCategoryStatus] = useAtom(categoryStatusAtom);
  const listRefArray = categoryStatus.map(() => createRef<FlatList>());
  const currentIndex = categoryStatus.findIndex(
    item => item.isSelected === true,
  );
  const currentOrigin = categoryStatus[currentIndex].origin;

  const setCategoryStatusByIndex = (index: number) => {
    setCategoryStatus(prev =>
      prev.map((prevItem, i) => ({
        ...prevItem,
        isSelected: index === i,
      })),
    );
  };
  const setCategoryStatusByOrigin = (origin: AnnouncmentCategoryOriginType) => {
    setCategoryStatus(prev =>
      prev.map(prevItem => ({
        ...prevItem,
        isSelected: prevItem.origin === origin,
      })),
    );
  };

  useEffect(() => {
    horizontalScrollViewRef?.current?.scrollTo({x: width * currentIndex});
  }, [currentIndex]);

  const tabPressAdditionalAction = (origin: AnnouncmentCategoryOriginType) => {
    setCategoryStatusByOrigin(origin);

    if (origin === currentOrigin)
      listRefArray[currentIndex].current?.scrollToOffset({offset: 0});
  };

  return (
    <View>
      <CategoryTab tabPressAdditionalAction={tabPressAdditionalAction} />
      {/* TODO: 애니메이션 속도 지정을 위해 FlatList로 변경 */}
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}
        ref={horizontalScrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const offset = event.nativeEvent.contentOffset.x;
          const currentPage = Math.round(offset / width);
          setCategoryStatusByIndex(currentPage);
        }}>
        {categoryStatus.map((_, index) => (
          <View style={{width}}>
            <MainArticleList
              key={categoryStatus[index].origin}
              ref={listRefArray[index]}
              origin={categoryStatus[index].origin}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MainArticleListsControl;
