import styled from '@emotion/native';
import {Txt, colors} from '@uoslife/design-system';
import AnimatePress from '../../../../components/animations/pressable_icon/AnimatePress';

type Props = {
  label: string;
  isEnabled: boolean;
  isCurrent: boolean;
  onPress: () => void;
};

const changeBackgroundColor = ({
  isEnabled,
  isCurrent,
}: Pick<Props, 'isEnabled' | 'isCurrent'>) => {
  if (isCurrent) return colors.secondaryBrand;
  if (isEnabled) return colors.secondaryLight;
  return colors.grey10;
};

const LibraryChallengeItem = ({
  label,
  isEnabled,
  isCurrent,
  onPress,
}: Props) => {
  return (
    <AnimatePress
      variant={isEnabled ? 'scale_up_3' : 'none'}
      onPress={isEnabled ? onPress : () => {}}>
      <S.Container
        style={{
          backgroundColor: changeBackgroundColor({isEnabled, isCurrent}),
        }}>
        <Txt
          label={label}
          color="black"
          typograph={isEnabled ? 'titleSmall' : 'bodyMedium'}
        />
      </S.Container>
    </AnimatePress>
  );
};

export default LibraryChallengeItem;

const S = {
  Container: styled.View`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
