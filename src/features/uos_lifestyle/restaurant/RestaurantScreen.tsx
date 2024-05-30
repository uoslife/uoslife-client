import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {RootNavigationProps} from '../../../navigators/types/rootStack';
import Header from '../../../components/molecules/common/header/Header';
import {Txt, Icon, colors} from '@uoslife/design-system';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BorderSelect from '../../../components/molecules/common/select/BorderSelect';
import styled from '@emotion/native';

type LocationType = '위치' | '정문' | '후문';
type FoodCategoryType =
  | '종류'
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
  const [location, setLocation] = useState<LocationType>('위치');
  const [foodCategory, setFoodCategory] = useState<FoodCategoryType>('종류');
  const [isLike, setIsLike] = useState<boolean>(false);
  const locationList = ['정문', '후문'];
  const foodCategoryList = [
    '한식',
    '일식',
    '중식',
    '양식',
    '분식',
    '간편식',
    '기타',
  ];
  const restaurantList = [
    {
      name: '도토리양버섯군',
      location: '정문',
      restaurantType: '한식',
      like: true,
      likesCount: 147,
      mapLink: 'url',
    },
    {
      name: '19고깃집',
      location: '정문',
      restaurantType: '한식',
      like: true,
      likesCount: 148,
      mapLink: 'url',
    },
    {
      name: '최원석 돼지한판&서해쭈꾸미 서울시립대점',
      location: '정문',
      restaurantType: '한식',
      like: true,
      likesCount: 149,
      mapLink: 'url',
    },
  ];

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
              {restaurantList.map((item, idx) => {
                if (item.name.length >= 15) {
                  item.name = item.name.substring(0, 15) + '...';
                }
                return (
                  <>
                    <S.RankingItem>
                      <View style={{flexDirection: 'row', gap: 16}}>
                        <Txt
                          label={String(idx + 1)}
                          color="grey90"
                          typograph="titleMedium"
                        />
                        <Txt
                          label={item.name}
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
                    {idx !== 2 ? <View style={styles.lineStyle} /> : null}
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
          <View style={{flexDirection: 'row', gap: 12}}>
            <BorderSelect
              options={locationList}
              currentOption={location}
              setCurrent={setLocation}
            />
            <BorderSelect
              options={foodCategoryList}
              currentOption={foodCategory}
              setCurrent={setFoodCategory}
            />
            <LikeCategoryButton />
          </View>
        </S.RestaurantListContainer>
      </View>
    </View>
  );
};

type LikeContainerType = {
  isClick: boolean;
};
const S = {
  RankingContainer: styled.View``,
  RankingItem: styled.View`
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
};
const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 1,
    borderColor: colors.grey20,
    margin: 8,
  },
});
export default RestaurantScreen;
