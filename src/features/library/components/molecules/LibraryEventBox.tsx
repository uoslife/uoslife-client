import styled from '@emotion/native';
import {Txt, Button} from '@uoslife/design-system';
import {useNavigation} from '@react-navigation/native';
import {LibraryNavigationProp} from '../../navigators/types/library';

const LibraryEventBox = () => {
  const navigation = useNavigation<LibraryNavigationProp>();
  return (
    <S.EventWrapper>
      <S.TitleWrapper>
        <Txt label="도서관 이벤트" color="grey190" typograph="titleLarge" />
      </S.TitleWrapper>
      <Button
        label="도서관 순위"
        isFullWidth
        isRounded
        onPress={() => navigation.navigate('library_ranking')}
      />
      <Button
        label="도전과제"
        isFullWidth
        isRounded
        onPress={() => navigation.navigate('library_challenge')}
      />
    </S.EventWrapper>
  );
};

export default LibraryEventBox;

const S = {
  EventWrapper: styled.View`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  TitleWrapper: styled.View`
    padding: 0 5px 2px 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
};
