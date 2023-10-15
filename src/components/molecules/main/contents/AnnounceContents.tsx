import styled from '@emotion/native';
import {Icon, Txt, colors} from '@uoslife/design-system';
import CardLayout from '../cardLayout/CardLayout';
import {useCallback} from 'react';
import {Linking, Alert} from 'react-native';
import URLS from '../../../../configs/urls';
import CategoryTab from '../../announcement/category-tab/CategoryTab';

const AnnounceContents = () => {
  const handlePressLinkButton = useCallback(async () => {
    const supported = await Linking.canOpenURL(URLS.UOSTORY);

    if (supported) {
      await Linking.openURL(URLS.UOSTORY);
    } else {
      Alert.alert(`Don't know how to open this URL: ${URLS.UOSTORY}`);
    }
  }, [URLS.UOSTORY]);
  return (
    <CardLayout>
      <S.Wrapper>
        <S.AnnounceCategoryWrapper>
          <CategoryTab />
        </S.AnnounceCategoryWrapper>
        <S.AnnounceTextWrapper>
          <S.AnnounceText>
            <Txt
              label={
                '[대학일자리플러스센터] 2023년 골라듣는 온오프라인 프리패스'
              }
              color={'grey190'}
              typograph={'bodyMedium'}
            />
          </S.AnnounceText>
          <S.AnnounceText>
            <Txt
              label={
                '[대학일자리플러스센터] 2023년 골라듣는 온오프라인 프리패스'
              }
              color={'grey190'}
              typograph={'bodyMedium'}
            />
          </S.AnnounceText>
          <S.AnnounceText>
            <Txt
              label={
                '[대학일자리플러스센터] 2023년 골라듣는 온오프라인 프리패스'
              }
              color={'grey190'}
              typograph={'bodyMedium'}
            />
          </S.AnnounceText>
        </S.AnnounceTextWrapper>
        <S.Border />
        <S.LinkButton onPress={handlePressLinkButton}>
          <Icon
            name={'openInNew'}
            width={18}
            height={18}
            color={'primaryBrand'}
          />
          <Txt
            label={'UOSTORY 바로가기'}
            color={'primaryBrand'}
            typograph={'bodySmall'}
          />
        </S.LinkButton>
      </S.Wrapper>
    </CardLayout>
  );
};

export default AnnounceContents;

const S = {
  Wrapper: styled.View`
    padding: 16px 16px 0;
  `,
  AnnounceCategoryWrapper: styled.View`
    width: 100%;
    margin-bottom: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  AnnounceCategoryButton: styled.Pressable`
    padding: 9px 24px;
    /* border-bottom-width: 1px; */
    border-color: ${colors.primaryBrand};
    border-style: solid;
  `,
  AnnounceTextWrapper: styled.View`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
  AnnounceText: styled.View`
    padding: 8px;
  `,
  Border: styled.View`
    margin: 4px 0;
    width: 100%;
    height: 1px;
    background-color: ${colors.grey40};
  `,
  LinkButton: styled.Pressable`
    display: flex;
    flex-direction: row;
    align-items: space-between;
    justify-content: center;
    padding: 16px 0;
    gap: 2px;
  `,
};
