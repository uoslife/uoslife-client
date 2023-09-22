import styled from '@emotion/native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/header/Header';
import {Icon, Txt, colors} from '@uoslife/design-system';
import {View, Text} from 'react-native';
import {
  ANNOUNCEMENT_ARTICLE_DUMMY_DATA,
  Article,
} from '../AnnouncementMainScreen';
import {getUploadTimeString} from '../../../utils/handle-date';
import IconWithText from '../../../components/molecules/iconWithText/IconWithText';
import {AnnouncementStackParamList} from '../../../navigators/AnnouncementStackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

type AnnouncementDetailScreenProps = NativeStackScreenProps<
  AnnouncementStackParamList,
  'AnnouncementDetail'
>;

const AnnouncementDetailScreen = ({route}: AnnouncementDetailScreenProps) => {
  const insets = useSafeAreaInsets();
  const [article, setArticle] = useState<Article>();

  const id = route.params.id;

  // article 불러오는 API 달기
  useEffect(() => {
    const found = ANNOUNCEMENT_ARTICLE_DUMMY_DATA.find(
      article => article.id === id,
    );

    setArticle(found);
  }, []);

  // API 달기
  const onPressBookmark = () => {};

  const Bookmark = ({article}: {article: Article}) => (
    <S.bookmarkBtnContainer onPress={onPressBookmark}>
      <Icon
        name={'bookmark'}
        color={article.bookmarkByMe ? 'grey90' : 'primaryBrand'}
        height={24}
        width={24}
      />
      <Txt
        color={article.bookmarkByMe ? 'grey90' : 'primaryBrand'}
        label={`${article.bookmarkCnt}`}
        typograph={'titleSmall'}
      />
    </S.bookmarkBtnContainer>
  );

  const navigation=useNavigation();

  const handleGoBack=()=>{
    navigation.goBack();
  }

  return !!article ? (
    <S.screenWrapper style={{paddingTop: insets.top}}>
      <Header label={article.category} onPressBackButton={handleGoBack} />
      <S.exceptHeader>
        {/* emotion의 border-{direction} 버그로 인해 style prop 이용 */}
        <View style={{borderBottomColor: colors.grey20, borderBottomWidth: 1}}>
          <S.detailTopWrapper>
            <Txt
              label={article.title}
              color={'black'}
              typograph={'titleLarge'}
            />
            <S.categoryAndDateAndBookmarkWrapper>
              <Txt
                label={`${article.category} | ${getUploadTimeString(
                  article!.uploadTime!,
                )}`}
                color={'grey90'}
                typograph={'bodySmall'}
              />
              <Bookmark article={article} />
            </S.categoryAndDateAndBookmarkWrapper>
          </S.detailTopWrapper>
        </View>
        {article.attachments.length !== 0 && (
          <S.attachmentsContainer>
            {article.attachments.map((item, i) => (
              <S.attachmentItem key={item}>
                <Icon
                  height={18}
                  width={18}
                  name={'download'}
                  color={'primaryBrand'}
                  key={i}
                />
                <Txt
                  label={`${i + 1}. ${item}`}
                  color={'grey130'}
                  typograph={'bodyMedium'}
                />
              </S.attachmentItem>
            ))}
          </S.attachmentsContainer>
        )}
        <Txt label={article.body!} color={'grey190'} typograph={'bodyLarge'} />
      </S.exceptHeader>
    </S.screenWrapper>
  ) : (
    <View>
      <Text>로딩스피너?</Text>
    </View>
  );
};

export default AnnouncementDetailScreen;

const S = {
  screenWrapper: styled.ScrollView`
    width: 100%;
    height: 100%;
    background: #fff; // 수정 필요
  `,
  exceptHeader: styled.View`
    display: flex;
    gap: 24px;

    padding: 0px 16px;
  `,
  detailTopWrapper: styled.View`
    padding: 12px 0;

    border-bottom: 1px ${() => colors.black};
    border-color: ${() => colors.black};
  `,
  categoryAndDateAndBookmarkWrapper: styled.View`
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: space-between;

    margin-top: 8px;
  `,
  bookmarkBtnContainer: styled.Pressable`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-contents: center;

    padding: 6px 12px 6px 8px;
    border-radius: 10px;

    border: 1px ${() => colors.grey40};
  `,
  attachmentsContainer: styled.View`
    gap: 4px;
  `,
  attachmentItem: styled.View`
    display: flex;
    gap: 2px;
    flex-direction: row;
    align-items: center;

    border-radius: 10px;
    border: 1px ${() => colors.grey40};

    padding: 8px 16px;
  `,
  divider: styled.View`
    width: 100%;
    height: 1px;
    margin: 0px 16px;
    background: ${() => colors.grey20};
  `,
};
