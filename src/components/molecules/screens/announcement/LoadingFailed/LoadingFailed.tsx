import {Button, Txt, colors} from '@uoslife/design-system';
import styled from '@emotion/native';
import {RefreshControl} from 'react-native-gesture-handler';
import {Linking} from 'react-native';

const failComment1 = `공지사항을 가져오는 데 실패했어요.`;
const failComment2 = `잠시 후 다시 시도해 주세요.`;
const checkInHomepageComment = '홈페이지에서 전체 공지사항 확인하기';

const LoadingFailed = ({onRefresh}: {onRefresh: () => void}) => {
  const refreshControl = (
    <RefreshControl
      onRefresh={onRefresh}
      colors={[colors.primaryBrand, colors.primaryBrand]}
      refreshing={false}
    />
  );

  const openSiteUrl = () => {
    const url =
      'https://www.uos.ac.kr/korNotice/list.do?list_id=FA2&epTicket=INV';

    Linking.openURL(url);
  };

  return (
    <S.Root refreshControl={refreshControl}>
      <S.Inner>
        <S.Descriptions>
          <Txt color="grey160" typograph="bodyMedium" label={failComment1} />
          <Txt color="grey160" typograph="bodyMedium" label={failComment2} />
        </S.Descriptions>
        <Button
          onPress={openSiteUrl}
          label={checkInHomepageComment}
          variant="filled"
          size="medium"
        />
      </S.Inner>
    </S.Root>
  );
};

const S = {
  Root: styled.ScrollView`
    flex: 1;
  `,
  Descriptions: styled.View`
    align-items: center;
  `,
  Inner: styled.View`
    padding: 48px 0;
    justify-content: center;
    align-items: center;

    gap: 80px;
  `,
  IrumaeContainer: styled.Image`
    height: 250px;
    object-fit: scale-down;
  `,
};

export default LoadingFailed;
