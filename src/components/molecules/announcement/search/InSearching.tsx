import {Txt} from '@uoslife/design-system';
import HistoryList from './HistoryList';
import styled from '@emotion/native';

const InSearching = () => {
  return (
    // keyboardShouldPersistTaps: 키보드 열린 상태에서 클릭시 ScrollView 내부 Item들의 리스너 동작을 위해 부여
    <S.Root keyboardShouldPersistTaps={'always'}>
      <S.Top>
        <S.TextContainer
          onPress={() => {
            // TODO: 스토리지 연결해서 검색 기록 모두 지우기
          }}>
          <Txt
            color={'grey90'}
            label={'모두 지우기'}
            typograph={'bodyMedium'}
          />
        </S.TextContainer>
      </S.Top>
      <HistoryList />
    </S.Root>
  );
};

export default InSearching;

const S = {
  Root: styled.ScrollView``,
  Top: styled.View`
    width: 100%;
    padding: 4px 0;

    flex-direction: row-reverse;
  `,
  TextContainer: styled.Pressable`
    padding: 10px 20px;
  `,
};
