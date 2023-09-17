import styled from '@emotion/native';
import React from 'react';
import CafeteriaCardProps from './CafeteriaCard.type';
import {View} from 'react-native';
import {Txt, colors} from '@uoslife/design-system';

const CafeteriaCard = ({cafeteriaItems, isEmpty}: CafeteriaCardProps) => {
  return (
    <View>
      {isEmpty ? (
        <S.emptyWrapper>
          <Txt
            label={'오늘은 운영하지 않아요.'}
            color={'grey150'}
            typograph={'bodyLarge'}
          />
        </S.emptyWrapper>
      ) : (
        <S.cardContentWrapper>
          {cafeteriaItems &&
            cafeteriaItems.map((value, index) => {
              return (
                <View key={index}>
                  <S.cardContent>
                    {value.corner && (
                      <Txt
                        label={value.corner}
                        color={'grey190'}
                        typograph={'labelLarge'}
                      />
                    )}
                    <S.inlineWrapper>
                      <Txt
                        label={value.dish}
                        color={'grey190'}
                        typograph={'bodyLarge'}
                      />
                      <Txt
                        label={value.price}
                        color={'grey130'}
                        typograph={'bodyLarge'}
                      />
                    </S.inlineWrapper>

                    <S.inlineWrapper>
                      {value.subDish && (
                        <Txt
                          label={value.subDish}
                          color={'grey90'}
                          typograph={'bodyMedium'}
                        />
                      )}
                      {value.extraPrice && (
                        <Txt
                          label={value.extraPrice}
                          color={'grey90'}
                          typograph={'bodyMedium'}
                        />
                      )}
                    </S.inlineWrapper>
                  </S.cardContent>
                  {value.showDivider && <S.divider />}
                </View>
              );
            })}
        </S.cardContentWrapper>
      )}
    </View>
  );
};

const S = {
  inlineWrapper: styled.View`
    flex-direction: row;
    justify-content: space-between;
  `,
  cardContent: styled.View`
    gap: 4px;
  `,
  cardContentWrapper: styled.View`
    flex-direction: column;
    gap: 12px;
    margin-left: 16px;
    margin-right: 16px;
  `,
  divider: styled.View`
    height: 1px;
    background-color: ${colors.grey10};
    margin-top: 12px;
  `,
  emptyWrapper: styled.View`
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
  `,
};

export default CafeteriaCard;
