import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {Txt, Button} from '@uoslife/design-system';
import {View} from 'react-native';
import {RootNavigationProps} from '../../../../../navigators/types/rootStack';

const PortalUnauthorizedScreen = () => {
  const navigation = useNavigation<RootNavigationProps>();

  const handleNavigatePortalAuthenticate = async () => {
    return navigation.navigate('student_id_portal_authentication');
  };

  return (
    <S.PortalUnauthorizedScreenContainer>
      <View style={{alignItems: 'center', gap: 6}}>
        <Txt
          label="포털 계정이 연동되어 있지 않아요."
          color="grey190"
          typograph="headlineMedium"
        />
        <Txt
          label="숨겨진 학점을 보려면 포털 연동을 해주세요!"
          color="grey130"
          typograph="titleSmall"
        />
      </View>
      <Button
        label="포털 계정 연동하기"
        isFullWidth
        onPress={handleNavigatePortalAuthenticate}
      />
    </S.PortalUnauthorizedScreenContainer>
  );
};

export default PortalUnauthorizedScreen;

const S = {
  PortalUnauthorizedScreenContainer: styled.View`
    padding: 24px 20px 150px;
    flex: 1;
    gap: 30px;
    justify-content: center;
  `,
};
