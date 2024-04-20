import styled from '@emotion/native';
import LibraryEventBox from '../../../components/molecules/screens/library/LibraryEventBox';
import LibraryUsageHistory from '../../../components/molecules/screens/library/LibraryUsageHistory';

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
