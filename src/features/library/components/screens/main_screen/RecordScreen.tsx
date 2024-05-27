import styled from '@emotion/native';
import LibraryEventBox from '../../molecules/LibraryEventBox';
import LibraryUsageHistory from '../../molecules/LibraryUsageHistory';

const RecordScreen = () => {
  return (
    <S.Container>
      <LibraryEventBox />
      <LibraryUsageHistory />
    </S.Container>
  );
};

export default RecordScreen;

const S = {
  Container: styled.View`
    width: 100%;
    padding: 24px 16px 0 16px;
    gap: 48px;
  `,
};
