import styled from '@emotion/native';
import React from 'react';
import CafeteriaCardProps from './CafeteriaCard.type';
import {Txt} from '@uoslife/design-system';
import {View} from 'react-native';

const CafeteriaCard = ({
  title,
  caption,
  cafeteriaItems,
  isEmpty,
}: CafeteriaCardProps) => {
  return (
    <S.cardContainer>
      <S.cardHeader>
        <S.inlineWrapper>
          <Txt label={title} color={'grey160'} typograph={'titleMedium'} />
          <Txt label={caption} color={'grey150'} typograph={'caption'} />
        </S.inlineWrapper>
      </S.cardHeader>
      <S.cardBody>
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
            {cafeteriaItems.map((value, index) => {
              return (
                <View key={index}>
                  <S.cardContent>
                    {value.label && (
                      <Txt
                        label={value.label}
                        color={'grey190'}
                        typograph={'labelLarge'}
                      />
                    )}
                    <S.inlineWrapper>
                      <Txt
                        label={value.item}
                        color={'grey190'}
                        typograph={'bodyLarge'}
                      />
                      <Txt
                        label={value.largeSubText}
                        color={'grey130'}
                        typograph={'bodyLarge'}
                      />
                    </S.inlineWrapper>

                    <S.inlineWrapper>
                      {value.subItem && (
                        <Txt
                          label={value.subItem}
                          color={'grey90'}
                          typograph={'bodyMedium'}
                        />
                      )}
                      {value.smallSubText && (
                        <Txt
                          label={value.smallSubText}
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
      </S.cardBody>
    </S.cardContainer>
  );
};

const S = {
  cardContainer: styled.View`
    width: 100%;
    border-radius: 20px;
    border-width: 1px;
    border-color: #e1dfdd;
    background-color: #ffffff;
    overflow: hidden;
  `,
  cardHeader: styled.View`
    background-color: #f2f2f2;
    padding: 20px 16px 12px 16px;
  `,
  cardBody: styled.View`
    margin-top: 16px;
    margin-bottom: 20px;
  `,
  labelWrapper: styled.View`
    padding-bottom: 4px;
  `,
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
    background-color: #f3f2f1;
    margin-top: 12px;
  `,
  emptyWrapper: styled.View`
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
  `,
};

export default CafeteriaCard;
