import styled from '@emotion/native';
import {Txt, colors, Icon} from '@uoslife/design-system';
import {TouchableOpacity} from 'react-native';
type TextMessageProps = {
  children: React.ReactNode;
  tail: 'LEFT' | 'CENTER' | 'RIGHT';
  onPress: () => void;
};
const TextMessageModalLayout = ({
  children,
  tail,
  onPress,
}: TextMessageProps) => {
  return (
    <TextMessageContainer>
      <TextMessageBody>
        <Txt
          label={children ? children.toString() : ''}
          color="grey190"
          typograph="labelMedium"
        />
        <IconWrapper onPress={() => onPress()}>
          <Icon color={'secondaryUi'} name={'clear'} width={24} height={24} />
        </IconWrapper>
      </TextMessageBody>
      <TriangleWrapper tail={tail}>
        <Triangle />
      </TriangleWrapper>
    </TextMessageContainer>
  );
};
export default TextMessageModalLayout;

const TextMessageContainer = styled.View``;
const TextMessageBody = styled.View`
  flex-direction: row;
  padding: 11px 8px 11px 16px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: ${colors.secondaryBrand};
`;

type TailProps = {tail: 'LEFT' | 'CENTER' | 'RIGHT'};
const TriangleWrapper = styled.View<TailProps>`
  ${props =>
    props.tail === 'LEFT'
      ? 'align-items: flex-start; left:5%;'
      : props.tail === 'RIGHT'
      ? 'align-items: flex-end; right:5%;;'
      : 'align-items: center;'}
  width: 100%;
`;
const Triangle = styled.View`
  border-style: solid;
  border-color: ${colors.secondaryBrand} transparent transparent transparent;
  border-width: 24px 12px 0 12px;
  height: 0;
  width: 0;
  top: -4px;
`;
type IconWrapperProps = {onPress: () => void};
const IconWrapper = styled(TouchableOpacity)<IconWrapperProps>``;
