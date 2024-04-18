import styled from '@emotion/native';
import {Txt, Icon, colors} from '@uoslife/design-system';
import {useState} from 'react';
import {ScrollView, View} from 'react-native';
import boxShadowStyle from '../../../../styles/boxShadow';
import AnimatePress from '../../../animations/pressable_icon/AnimatePress';

type SelectProps = {
  options: string[];
  currentOption: string;
  setCurrent: React.Dispatch<React.SetStateAction<any>>;
};

const Select = ({options, currentOption, setCurrent}: SelectProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const handlePressExpand = () => {
    setShowOptions(prev => !prev);
  };
  const handlePressOption = (option: string) => {
    setCurrent(option);
    setShowOptions(false);
  };
  return (
    <>
      <S.SelectContainer style={{...boxShadowStyle.LibraryShadow}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Txt label={currentOption} color="grey190" typograph="titleMedium" />
        </ScrollView>
        <AnimatePress variant="scale_up_2" onPress={handlePressExpand}>
          <Icon name="backArrow" height={24} width={24} />
        </AnimatePress>
      </S.SelectContainer>
      {showOptions && (
        <S.SelectOptions
          style={{...boxShadowStyle.LibraryShadow, zIndex: 1000}}>
          {options.map((item, index) => (
            <View key={item}>
              <S.SelectOptionsItems onPress={() => handlePressOption(item)}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <Txt
                    label={item}
                    color="grey190"
                    typograph="titleMedium"
                    style={{paddingLeft: 8}}
                  />
                </ScrollView>
              </S.SelectOptionsItems>
              {options.length !== index - 1 && <S.SelectOptionsDivider />}
            </View>
          ))}
        </S.SelectOptions>
      )}
    </>
  );
};

export default Select;

const S = {
  SelectContainer: styled.View`
    padding: 8px 16px;
    width: 150px;
    background-color: white;
    flex-direction: row;
    border-radius: 60px;
    align-self: center;
    justify-content: space-between;
  `,
  SelectOptions: styled.View`
    width: 150px;
    position: absolute;
    top: 52px;
    left: 50%;
    transform: translateX(-75px);
    border-radius: 20px;
    background-color: white;
  `,
  SelectOptionsItems: styled.Pressable`
    padding: 10px 16px;
  `,
  SelectOptionsDivider: styled.View`
    height: 1px;
    margin: 0 16px;
    background-color: ${colors.grey20};
  `,
};
