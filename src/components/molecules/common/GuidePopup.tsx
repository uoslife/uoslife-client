import {PressableProps} from 'react-native';
import styled from '@emotion/native';
import {Txt, colors, Icon} from '@uoslife/design-system';

type GuidePopupProps = {
  label: string;
  tail: 'LEFT' | 'CENTER' | 'RIGHT';
  onPress: () => void;
} & PressableProps;
const GuidePopup = ({label, tail, onPress, ...props}: GuidePopupProps) => {
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
};
export default GuidePopup;

const GuidePopupContainer = styled.Pressable`
  position: absolute;
  bottom: 40px;
`;

const GuidePopupBody = styled.View`
  flex-direction: row;
  padding: 8px 10px 8px 16px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: ${colors.secondaryBrand};
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
