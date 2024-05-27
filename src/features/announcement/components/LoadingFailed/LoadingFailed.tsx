import {Linking, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import styled, {css} from '@emotion/native';
import {Button, Txt} from '@uoslife/design-system';

const failComment1 = '공지사항을 가져오는 데 실패했어요.';
const failComment2 = '잠시 후 다시 시도해 주세요.';
const checkInHomepageComment = '홈페이지에서 전체 공지사항 확인하기';

const LoadingFailed = ({onRefresh}: {onRefresh: () => void}) => {
  const insets = useSafeAreaInsets();
  const openSiteUrl = () => {
    const url =
      'https://www.uos.ac.kr/korNotice/list.do?list_id=FA2&epTicket=INV';

    Linking.openURL(url);
  };

  return (
    <S.Root style={{paddingBottom: insets.bottom}}>
      <S.Descriptions>
        <Txt color="grey160" typograph="titleMedium" label={failComment1} />
        <Txt color="grey160" typograph="bodyMedium" label={failComment2} />
      </S.Descriptions>
      <View
        style={css`
          gap: 12px;
        `}>
        <Button
          onPress={onRefresh}
          label="공지사항 다시 불러오기"
          variant="filled"
          size="medium"
          isFullWidth
        />
        <Button
          onPress={openSiteUrl}
          label={checkInHomepageComment}
          variant="outline"
          size="medium"
          isFullWidth
        />
      </View>
    </S.Root>
  );
};

const S = {
  Root: styled.View`
    padding: 18px 24px;
    gap: 80px;
    width: 100%;
    justify-content: space-between;
    height: 90%;
  `,
  Descriptions: styled.View`
    gap: 6px;
  `,
};

export default LoadingFailed;
