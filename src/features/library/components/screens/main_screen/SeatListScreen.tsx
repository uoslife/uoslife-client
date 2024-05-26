import {Button, Icon, Txt, colors} from '@uoslife/design-system';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {LibraryNavigationProp} from '../../../../../navigators/types/library';

const SeatListScreen = () => {
  const navigation = useNavigation<LibraryNavigationProp>();
  return (
    <S.Container>
      <S.InfoItem>
        <Icon name="notification" width={24} height={24} />
        <Txt
          label="그룹스터디룸과 전자정보실은 준비 중이에요."
          color="grey130"
          typograph="labelMedium"
        />
      </S.InfoItem>
      <S.ButtonContainer>
        <Button
          label="그룹스터디룸"
          variant="outline"
          isEnabled={false}
          isFullWidth
        />
        <Button
          label="자유열람실"
          variant="outline"
          isEnabled
          isFullWidth
          onPress={() => navigation.navigate('Library_room_status')}
        />
        <Button
          label="전자정보실"
          variant="outline"
          isEnabled={false}
          isFullWidth
        />
      </S.ButtonContainer>
    </S.Container>
  );
};

export default SeatListScreen;

const S = {
  Container: styled.View`
    width: 100%;
    padding: 40px 16px 0 16px;
    gap: 12px;
    display: flex;
    align-items: center;
  `,
  InfoItem: styled.View`
    width: 262px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 10px;
    background-color: ${colors.grey20};
    border: 1px solid ${colors.grey40};
    border-radius: 40px;
  `,
  ButtonContainer: styled.View`
    width: 100%;
    gap: 12px;
  `,
};
