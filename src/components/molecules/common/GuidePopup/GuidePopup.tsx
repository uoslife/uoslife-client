import {PressableProps} from 'react-native';
import styled from '@emotion/native';
import {Txt, colors, Icon} from '@uoslife/design-system';

type GuidePopupProps = {
  label: string;
  tail: 'LEFT' | 'CENTER' | 'RIGHT';
  onPress: () => void;
  theme: 'PRIMARY' | 'SECONDARY';
} & PressableProps;
const GuidePopup = ({
  label,
  tail,
  onPress,
  theme,
  ...props
}: GuidePopupProps) => {
  switch (theme) {
    case 'SECONDARY':
      return (
        <GuidePopupContainer onPress={() => onPress()} {...props}>
          <GuidePopupBody>
            <Txt label={label} color="grey190" typograph="labelMedium" />
            <Icon color="secondaryUi" name="clear" width={20} height={20} />
          </GuidePopupBody>
          <TriangleWrapper tail={tail}>
            <Triangle />
          </TriangleWrapper>
        </GuidePopupContainer>
      );
    default:
      return (
        <GuidePopupContainer onPress={() => onPress()} {...props}>
          <PrimaryGuidePopupBody>
            <Txt label={label} color="grey190" typograph="labelMedium" />
            <Icon color="primaryBrand" name="clear" width={20} height={20} />
          </PrimaryGuidePopupBody>
          <TriangleWrapper tail={tail}>
            <PrimaryTriangleWrapper />
            <PrimaryTriangle />
          </TriangleWrapper>
        </GuidePopupContainer>
      );
  }
};
export default GuidePopup;

const GuidePopupContainer = styled.Pressable`
  height: 60px;
  position: absolute;
`;

const GuidePopupBody = styled.View`
  flex-direction: row;
  padding: 8px 10px 8px 16px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: ${colors.secondaryBrand};
  // z-index: 2;
`;
const PrimaryGuidePopupBody = styled.View`
  flex-direction: row;
  padding: 8px 10px 8px 16px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: ${colors.white};
  border: 1px solid ${colors.primaryBrand};
  // z-index: 2;
`;

type TailProps = {tail: 'LEFT' | 'CENTER' | 'RIGHT'};

const TriangleWrapper = styled.View<TailProps>`
  ${props =>
    // eslint-disable-next-line no-nested-ternary
    props.tail === 'LEFT'
      ? 'align-items: flex-start; left:8px;'
      : props.tail === 'RIGHT'
      ? 'align-items: flex-end; right:8px;'
      : 'align-items: center;'}
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
const PrimaryTriangle = styled.View`
  position: absolute;
  border-style: solid;
  border-color: ${colors.primaryBrand} transparent transparent transparent;
  border-width: 16px 8px 0 8px;
  height: 0;
  width: 0;
  top: -1px;
`;
const PrimaryTriangleWrapper = styled.View`
  position: absolute;
  border-style: solid;
  border-color: ${colors.white} transparent transparent transparent;
  border-width: 14px 7px 0 7px;
  height: 0;
  width: 0;
  top: -1px;
  z-index: 1;
`;
