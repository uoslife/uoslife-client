import {PressableProps} from 'react-native';
import styled from '@emotion/native';
import {Txt, colors, Icon} from '@uoslife/design-system';

type Props = {
  label: string;
  onPress: () => void;
} & PressableProps;

const HiddenGradeGuidePopup = ({label, onPress, ...props}: Props) => {
  return (
    <GuidePopupContainer onPress={() => onPress()} {...props}>
      <GuidePopupBody>
        <Txt label={label} color="grey190" typograph="labelMedium" />
        <Icon color="secondaryUi" name="clear" width={20} height={20} />
      </GuidePopupBody>
      <TriangleWrapper>
        <Triangle />
      </TriangleWrapper>
    </GuidePopupContainer>
  );
};
export default HiddenGradeGuidePopup;

const GuidePopupContainer = styled.Pressable`
  position: fixed;
  align-self: flex-end;
`;

const GuidePopupBody = styled.View`
  flex-direction: row;
  padding: 8px 10px 8px 16px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: ${colors.secondaryBrand};
`;

const TriangleWrapper = styled.View`
  position: absolute;
  align-items: flex-end;
  right: 8px;
  bottom: -22px;
  width: 100%;
`;

const Triangle = styled.View`
  border-style: solid;
  border-color: ${colors.secondaryBrand} transparent transparent transparent;
  border-width: 24px 12px 0 12px;
  height: 0;
  width: 0;
  top: -10px;
`;
