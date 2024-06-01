import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {RootNavigationProps} from '../../../navigators/types/rootStack';
import Header from '../../../components/molecules/common/header/Header';
import {Txt, Icon, colors} from '@uoslife/design-system';
import {
  View,
  StyleSheet,
  Pressable,
  ListRenderItem,
  Dimensions,
  Linking,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BorderSelect from '../../../components/molecules/common/select/BorderSelect';
import styled from '@emotion/native';
import {FlatList} from 'react-native-gesture-handler';
import usePullToRefresh from '../../../hooks/usePullToRefresh';
import useModal from '../../../hooks/useModal';

const windowHeight = Dimensions.get('window').height;
type RestaurantItemType = {
  name: string;
  location: string;
  restaurantType: string;
  like: boolean;
  likesCount: number;
  mapLink: string;
};
type LocationType = '전체' | '정문' | '후문';
type FoodCategoryType =
  | '전체'
  | '한식'
  | '일식'
  | '중식'
  | '양식'
  | '분식'
  | '간편식'
  | '기타';

const RestaurantScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<RootNavigationProps>();
  const [location, setLocation] = useState<LocationType>('전체');
  const [foodCategory, setFoodCategory] = useState<FoodCategoryType>('전체');
  const [isLike, setIsLike] = useState<boolean>(false);
  const [bottomSheetItem, setBottomSheetItem] =
    useState<RestaurantItemType | null>();
  const [openBottomSheet, closeBottomSheet, BottomSheet] =
    useModal('BOTTOM_SHEET');
  const locationList = ['전체', '정문', '후문'];
  const foodCategoryList = [
    '전체',
    '한식',
    '일식',
    '중식',
    '양식',
    '분식',
    '간편식',
    '기타',
  ];

  const data = [
    {
      name: '도토리양버섯군',
      location: '정문',
      restaurantType: '한식',
      like: false,
      likesCount: 147,
      mapLink:
        'https://map.naver.com/p/search/%EB%8F%84%ED%86%A0%EB%A6%AC%EC%96%91%20%EB%B2%84%EC%84%AF%EA%B5%B0/place/18107987?c=15.00,0,0,0,dh&isCorrectAnswer=true',
    },
    {
      name: '19고깃집',
      location: '정문',
      restaurantType: '한식',
      like: true,
      likesCount: 148,
      mapLink:
        'https://map.naver.com/p/search/%EB%8F%84%ED%86%A0%EB%A6%AC%EC%96%91%20%EB%B2%84%EC%84%AF%EA%B5%B0/place/18107987?c=15.00,0,0,0,dh&isCorrectAnswer=true',
    },
    {
      name: '최원석 돼지한판&서해쭈꾸미 서울시립대점',
      location: '정문',
      restaurantType: '한식',
      like: false,
      likesCount: 149,
      mapLink:
        'https://map.naver.com/p/search/%EB%8F%84%ED%86%A0%EB%A6%AC%EC%96%91%20%EB%B2%84%EC%84%AF%EA%B5%B0/place/18107987?c=15.00,0,0,0,dh&isCorrectAnswer=true',
    },
    {
      name: '초밥',
      location: '후문',
      restaurantType: '일식',
      like: true,
      likesCount: 147,
      mapLink:
        'https://map.naver.com/p/search/%EB%8F%84%ED%86%A0%EB%A6%AC%EC%96%91%20%EB%B2%84%EC%84%AF%EA%B5%B0/place/18107987?c=15.00,0,0,0,dh&isCorrectAnswer=true',
    },
    {
      name: '쌀국수',
      location: '정문',
      restaurantType: '기타',
      like: false,
      likesCount: 148,
      mapLink:
        'https://map.naver.com/p/search/%EB%8F%84%ED%86%A0%EB%A6%AC%EC%96%91%20%EB%B2%84%EC%84%AF%EA%B5%B0/place/18107987?c=15.00,0,0,0,dh&isCorrectAnswer=true',
    },
    {
      name: '햄버거',
      location: '정문',
      restaurantType: '양식',
      like: true,
      likesCount: 149,
      mapLink:
        'https://map.naver.com/p/search/%EB%8F%84%ED%86%A0%EB%A6%AC%EC%96%91%20%EB%B2%84%EC%84%AF%EA%B5%B0/place/18107987?c=15.00,0,0,0,dh&isCorrectAnswer=true',
    },
    {
      name: '돈까스',
      location: '정문',
      restaurantType: '분식',
      like: true,
      likesCount: 147,
      mapLink:
        'https://map.naver.com/p/search/%EB%8F%84%ED%86%A0%EB%A6%AC%EC%96%91%20%EB%B2%84%EC%84%AF%EA%B5%B0/place/18107987?c=15.00,0,0,0,dh&isCorrectAnswer=true',
    },
    {
      name: '라면',
      location: '후문',
      restaurantType: '간편식',
      like: false,
      likesCount: 148,
      mapLink:
        'https://map.naver.com/p/search/%EB%8F%84%ED%86%A0%EB%A6%AC%EC%96%91%20%EB%B2%84%EC%84%AF%EA%B5%B0/place/18107987?c=15.00,0,0,0,dh&isCorrectAnswer=true',
    },
    {
      name: '짜장면',
      location: '후문',
      restaurantType: '중식',
      like: false,
      likesCount: 149,
      mapLink:
        'https://map.naver.com/p/search/%EB%8F%84%ED%86%A0%EB%A6%AC%EC%96%91%20%EB%B2%84%EC%84%AF%EA%B5%B0/place/18107987?c=15.00,0,0,0,dh&isCorrectAnswer=true',
    },
  ];
  const [restaurantList, setLestaurantList] = useState(data);
  const restaurantListTop = [
    {
      name: '도토리양버섯군',
      location: '정문',
      restaurantType: '한식',
      like: true,
      likesCount: 147,
      mapLink:
        'https://map.naver.com/p/search/%EB%8F%84%ED%86%A0%EB%A6%AC%EC%96%91%20%EB%B2%84%EC%84%AF%EA%B5%B0/place/18107987?c=15.00,0,0,0,dh&isCorrectAnswer=true',
    },
    {
      name: '19고깃집',
      location: '정문',
      restaurantType: '한식',
      like: true,
      likesCount: 148,
      mapLink:
        'https://map.naver.com/p/search/%EB%8F%84%ED%86%A0%EB%A6%AC%EC%96%91%20%EB%B2%84%EC%84%AF%EA%B5%B0/place/18107987?c=15.00,0,0,0,dh&isCorrectAnswer=true',
    },
    {
      name: '최원석 돼지한판&서해쭈꾸미 서울시립대점',
      location: '정문',
      restaurantType: '한식',
      like: false,
      likesCount: 149,
      mapLink:
        'https://map.naver.com/p/search/%EB%8F%84%ED%86%A0%EB%A6%AC%EC%96%91%20%EB%B2%84%EC%84%AF%EA%B5%B0/place/18107987?c=15.00,0,0,0,dh&isCorrectAnswer=true',
    },
  ];

  const reduceTitle = (title: string) => {
    if (title.length >= 15) {
      return title.substring(0, 15) + '...';
    }
    return title;
  };
  const renderRestaurantList: ListRenderItem<any> = ({
    item,
  }: {
    item: RestaurantItemType;
  }) => {
    return <RestaurantItem item={item} />;
  };

  const handleClickLikeButton = (item: RestaurantItemType) => {
    // api 완성 후 좋아요 버튼 - 임시
    const newList = restaurantList.map(restaurant => {
      if (restaurant.name === item.name) {
        if (restaurant.like) {
          return {
            ...restaurant,
            like: !restaurant.like,
            likesCount: restaurant.likesCount - 1,
          };
        } else {
          return {
            ...restaurant,
            like: !restaurant.like,
            likesCount: restaurant.likesCount + 1,
          };
        }
      } else {
        return restaurant;
      }
    });
    setLestaurantList(newList);
  };

  const handleClickRestaurantItem = (item: RestaurantItemType) => {
    setBottomSheetItem(item);
    openBottomSheet();
  };

  const handleClickBottomSheetButton = (item: RestaurantItemType) => {
    Linking.openURL(item.mapLink).catch(err =>
      console.error("Couldn't load page", err),
    );
  };

  const filteredRestaurantList = (data: RestaurantItemType[]) => {
    let filteredData = data;
    if (location !== '전체') {
      filteredData = filteredData.filter(item => item.location === location);
    }
    if (foodCategory !== '전체') {
      filteredData = filteredData.filter(
        item => item.restaurantType === foodCategory,
      );
    }
    if (isLike) {
      filteredData = filteredData.filter(item => item.like);
    }
    return filteredData;
  };

  const LikeCategoryButton = () => {
    return (
      <S.LikeContainer onPress={() => setIsLike(!isLike)} isClick={isLike}>
        <Txt
          label={'좋아요'}
          color={isLike ? 'primaryBrand' : 'grey190'}
          typograph="titleSmall"
        />
        <Icon
          name="heart"
          height={18}
          width={18}
          color={isLike ? 'primaryBrand' : 'grey90'}
        />
      </S.LikeContainer>
    );
  };

  const RestaurantItem = ({item}: {item: RestaurantItemType}) => {
    return (
      <S.RestaurantItemContainer
        onPress={() => handleClickRestaurantItem(item)}>
        <View style={{gap: 6}}>
          <Txt
            label={reduceTitle(item.name)}
            color="grey190"
            typograph="titleMedium"
          />
          <View style={{flexDirection: 'row', gap: 6}}>
            <S.CategoryBox type="color">
              <Txt
                label={item.location}
                color="primaryBrand"
                typograph="titleSmall"
              />
            </S.CategoryBox>
            <S.CategoryBox>
              <Txt
                label={item.restaurantType}
                color="grey130"
                typograph="titleSmall"
              />
            </S.CategoryBox>
          </View>
        </View>
        <Pressable
          onPress={() => handleClickLikeButton(item)}
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
            alignItems: 'center',
            backgroundColor: item.like
              ? colors.primaryLighterAlt
              : colors.grey10,
          }}>
          <Icon
            color={item.like ? 'primaryBrand' : 'grey90'}
            name={'heart'}
            width={28}
            height={28}
          />
          <Txt
            label={String(item.likesCount)}
            color="primaryBrand"
            typograph="labelMedium"
          />
        </Pressable>
      </S.RestaurantItemContainer>
    );
  };

  return (
    <View>
      <Header
        style={{paddingTop: inset.top, marginBottom: 8}}
        label="맛집 리스트"
        onPressBackButton={() => navigation.goBack()}
      />
      <View
        style={{
          marginTop: 16,
          marginBottom: 16,
          marginLeft: 20,
          marginRight: 20,
          gap: 40,
        }}>
        <S.RankingContainer>
          <View style={{gap: 12}}>
            <Txt
              label="시대인이 선정한 실시간 맛집 랭킹"
              color="grey190"
              typograph="titleLarge"
            />
            <View>
              {restaurantListTop.map((item, idx) => {
                return (
                  <>
                    <S.RankingItem
                      onPress={() => handleClickRestaurantItem(item)}>
                      <View style={{flexDirection: 'row', gap: 16}}>
                        <Txt
                          label={String(idx + 1)}
                          color="grey90"
                          typograph="titleMedium"
                        />
                        <Txt
                          label={reduceTitle(item.name)}
                          color="grey190"
                          typograph="titleMedium"
                        />
                      </View>
                      <View style={{flexDirection: 'row', gap: 4}}>
                        <S.IconWrapper>
                          <Icon
                            color={'primaryBrand'}
                            name={'heart'}
                            width={20}
                            height={20}
                          />
                        </S.IconWrapper>
                        <Txt
                          label={String(item.likesCount)}
                          color="primaryBrand"
                          typograph="titleMedium"
                        />
                      </View>
                    </S.RankingItem>
                    {idx !== restaurantListTop.length - 1 && (
                      <View style={styles.lineStyle} />
                    )}
                  </>
                );
              })}
            </View>
          </View>
        </S.RankingContainer>
        <S.RestaurantListContainer>
          <View style={{gap: 12}}>
            <Txt
              label="시립대 주변 맛집"
              color="grey190"
              typograph="titleLarge"
            />
          </View>
          <View style={{flexDirection: 'row', gap: 12, zIndex: 10}}>
            <BorderSelect
              options={locationList}
              currentOption={location === '전체' ? '위치' : location}
              setCurrent={setLocation}
            />
            <BorderSelect
              options={foodCategoryList}
              currentOption={foodCategory === '전체' ? '종류' : foodCategory}
              setCurrent={setFoodCategory}
            />
            <LikeCategoryButton />
          </View>
          <View style={{gap: 12}}>
            <FlatList
              style={{gap: 12, height: windowHeight - 500}}
              renderItem={renderRestaurantList}
              data={filteredRestaurantList(restaurantList)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{gap: 12}}
            />
          </View>
        </S.RestaurantListContainer>
      </View>
      <BottomSheet>
        <View style={{padding: 16, paddingBottom: inset.bottom}}>
          <S.bottomSheetTxtWrapper>
            <Txt
              label={bottomSheetItem ? bottomSheetItem?.name : ''}
              color="grey190"
              typograph="titleMedium"
            />
          </S.bottomSheetTxtWrapper>
          <View style={styles.lineStyle} />
          <S.BottomSheetButton
            onPress={() =>
              bottomSheetItem && handleClickBottomSheetButton(bottomSheetItem)
            }>
            <Txt label="카카오맵" color="grey190" typograph="bodyLarge" />
            <Icon name="arrow_down" height={30} width={30} color={'grey190'} />
          </S.BottomSheetButton>
          <S.BottomSheetButton
            onPress={() =>
              bottomSheetItem && handleClickBottomSheetButton(bottomSheetItem)
            }>
            <Txt label="네이버 지도" color="grey190" typograph="bodyLarge" />
            <Icon name="arrow_down" height={30} width={30} color={'grey190'} />
          </S.BottomSheetButton>
        </View>
      </BottomSheet>
    </View>
  );
};

type LikeContainerType = {
  isClick: boolean;
};
type CategoryBoxType = {
  type?: 'color';
};
const S = {
  RankingContainer: styled.View``,
  RankingItem: styled.Pressable`
    justify-content: space-between;
    padding: 12px;
    flex-direction: row;
  `,
  IconWrapper: styled.View`
    justify-content: center;
    align-items: center;
  `,
  RestaurantListContainer: styled.View`
    gap: 12px;
  `,
  LikeContainer: styled.Pressable<LikeContainerType>`
    padding: 6px 8px 6px 10px;
    background-color: white;
    flex-direction: row;
    border-radius: 12px;
    align-self: center;
    justify-content: space-between;
    gap: 4px;
    align-items: center;
    ${props =>
      props.isClick
        ? 'border : 1px solid ' + colors.primaryLighterAlt + ';'
        : 'border: 1px solid ' + colors.grey40 + ';'}
    ${props =>
      props.isClick
        ? 'background-color : ' + colors.primaryLighterAlt
        : ';background-color : white;'}
  `,
  RestaurantItemContainer: styled.Pressable`
    padding: 12px 16px 12px 20px;
    background-color: white;
    flex-direction: row;
    border-radius: 20px;
    border: 1px solid ${colors.grey40};
    justify-content: space-between;
    gap: 4px;
    align-items: center;
  `,
  CategoryBox: styled.View<CategoryBoxType>`
    padding: 2px 8px;
    border-radius: 20px;
    background-color: ${colors.grey20};
    ${props => props.type && 'background-color: ' + colors.primaryLighterAlt};
    align-self: center;
  `,
  BottomSheetButton: styled.Pressable`
    padding: 8px;
    height: 50px;
    justify-content: space-between;
    flex-direction: row;
  `,
  bottomSheetTxtWrapper: styled.Pressable`
    padding: 8px;
    height: 50px;
  `,
};
const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 1,
    borderColor: colors.grey20,
    margin: 8,
  },
});
export default RestaurantScreen;
