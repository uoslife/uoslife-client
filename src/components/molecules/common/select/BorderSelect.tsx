import styled, {css} from '@emotion/native';
import {Txt, Icon, colors} from '@uoslife/design-system';
import {useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import boxShadowStyle from '../../../../styles/boxShadow';
import AnimatePress from '../../../animations/pressable_icon/AnimatePress';

type SelectProps = {
  options: readonly string[];
  currentOption: string;
  setCurrent: React.Dispatch<React.SetStateAction<any>>;
};

const BorderSelect = ({options, currentOption, setCurrent}: SelectProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const handlePressExpand = () => {
    setShowOptions(prev => !prev);
  };
  const handlePressOption = (option: string) => {
    setCurrent(option);
    setShowOptions(false);
  };
  const isSelected = options.includes(currentOption);
  return (
    <View>
      <S.SelectContainer
        onPress={handlePressExpand}
        // options의 첫번째 요소에는 default값, 즉 선택되지 않은 상태가 들어갑니다.
        color={
          currentOption !== options[0] && isSelected
            ? colors.primaryBrand
            : colors.grey40
        }>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Txt label={currentOption} color="grey190" typograph="titleSmall" />
        </ScrollView>
        <AnimatePress variant="scale_up_2" onPress={handlePressExpand}>
          <Icon name="arrow_down" height={18} width={18} />
        </AnimatePress>
      </S.SelectContainer>
      {showOptions && (
        // https://github.com/facebook/react-native/issues/38730#issuecomment-1695742239
        <ScrollView
          style={[
            {...boxShadowStyle.bottomTapShadow},
            css`
              width: 70px;
              position: absolute;
              top: 45px;
              border-radius: 12px;
              background-color: white;
              border: 0.7px solid ${colors.grey40};
              ${boxShadowStyle.bottomTapShadow};
            `,
          ]}>
          {options.map((item, index) => (
            <View key={item}>
              <S.SelectOptionsItems onPress={() => handlePressOption(item)}>
                <Txt
                  label={item}
                  color={item === currentOption ? 'primaryBrand' : 'grey190'}
                  typograph="titleSmall"
                  style={{paddingLeft: 8}}
                />
              </S.SelectOptionsItems>
              {options.length !== index - 1 && <S.SelectOptionsDivider />}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default BorderSelect;

type SelectContainerType = {
  color: string;
};
const S = {
  SelectContainer: styled.Pressable<SelectContainerType>`
    padding: 6px 8px 6px 10px;
    background-color: white;
    flex-direction: row;
    border-radius: 12px;
    border: 1px solid ${props => props.color};
    align-self: center;
    justify-content: space-between;
    gap: 4px;
    align-items: center;
  `,
  SelectOptionsItems: styled.Pressable`
    padding: 10px 8px;
  `,
  SelectOptionsDivider: styled.View`
    height: 1px;
    background-color: ${colors.grey20};
  `,
};
