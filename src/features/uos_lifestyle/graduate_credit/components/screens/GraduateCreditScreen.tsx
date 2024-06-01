import {ScrollView, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from '@emotion/native';
import Header from '../../../../../components/molecules/common/header/Header';
import ProgressBar from '../ProgressBar';
import SubjectDetailButton from '../SubjectDetailButton';
import {Txt, Icon, colors} from '@uoslife/design-system';

// 더미데이터
import dummyData from '../dummydata';

const fieldsData = Object.entries(dummyData).map(([key, value]) => ({
  label: key,
  current: value.current,
  total: value.total,
}));

// lable 태그 매핑 위한 객체
const labelsMap: {[key: string]: string} = {
  majorRequirement: '전공',
  generalEducationRequirement: '교양',
  doubleMajorRequirement: '복수전공',
  minorRequirement: '부전공',
};

// 현재, 필요 학점 더해준다.
const calculateSum = (
  fields: (typeof groupedFields)[number],
): {current: number; total: number} => {
  let currentSum = 0;
  let totalSum = 0;

  fields.forEach(field => {
    const found = fieldsData.find(item => item.label === field);
    if (found) {
      if (found.current !== null) {
        currentSum += found.current;
      }
      if (found.total !== null) {
        totalSum += found.total;
      }
    }
  });
  return {current: currentSum, total: totalSum};
};

// 전공필수/선택, 교양필수/선택 등 filed 그룹화 위한 배열
const groupedFields = [
  ['majorRequirement', 'majorElective'],
  ['generalEducationRequirement', 'generalEducationElective'],
  ['doubleMajorRequirement', 'doubleMajorElective'],
  ['minorRequirement', 'minorElective'],
];

const tags = groupedFields.map(fields => {
  const {current, total} = calculateSum(fields);
  return {
    label: labelsMap[fields[0]],
    current,
    total,
    complete: current >= total,
  };
});

const GraduateCreditScreen = () => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  return (
    <ScrollView bounces={false}>
      <Header
        style={{paddingTop: inset.top, marginBottom: 8}}
        label="이수 학점 확인하기"
        onPressBackButton={() => navigation.goBack()}
      />
      <S.GraduateCreditScreen>
        <SubjectDetailButton type="major" label="디자인학과" />
        <SubjectDetailButton type="subject" label="전공 필수" />
        <ProgressBar
          type="sub"
          maxNum={130}
          currentCredit={70}
          minGraduateCredit={80}
        />
        <S.TagsContainer>
          {tags.map((tag, index) => (
            <S.SubjectTag key={index}>
              {/* total이 0이면 부전공이나 복수전공 여부 X */}
              {tag.total !== 0 ? (
                <S.SubjectTagWrapper>
                  <S.TagView>
                    <Txt
                      label={tag.label}
                      color="black"
                      typograph="bodyLarge"
                    />
                    <Pressable
                    // TODO: label 이용해 navigate 작성
                    // onPress={() => navigation(label)}
                    >
                      <Icon
                        name="forwardArrow"
                        color="grey90"
                        width={20}
                        height={20}
                      />
                    </Pressable>
                  </S.TagView>
                  <S.TagView>
                    <S.CreditView>
                      <Txt
                        label={`${tag.current}`}
                        color="grey130"
                        typograph="bodyMedium"
                      />
                      <Txt
                        label={`/${tag.total}`}
                        color="grey60"
                        typograph="bodyMedium"
                      />
                    </S.CreditView>
                    <S.CompleteButton complete={tag.complete}>
                      {tag.complete ? '이수 완료' : '미이수'}
                    </S.CompleteButton>
                  </S.TagView>
                </S.SubjectTagWrapper>
              ) : (
                // 복수전공, 부전공 여부에 따라 비활성화
                <S.SubjectTagWrapper>
                  <S.TagView>
                    <Txt
                      label={tag.label}
                      color="grey40"
                      typograph="bodyLarge"
                    />
                    <Icon
                      name="forwardArrow"
                      color="grey40"
                      width={20}
                      height={20}
                    />
                  </S.TagView>
                </S.SubjectTagWrapper>
              )}
            </S.SubjectTag>
          ))}
        </S.TagsContainer>
      </S.GraduateCreditScreen>
    </ScrollView>
  );
};

export default GraduateCreditScreen;

const S = {
  GraduateCreditScreen: styled.View`
    gap: 24px;
    padding: 52px 16px 120px 16px;
    flex: 1;
  `,
  TagsContainer: styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  `,
  SubjectTag: styled.View`
    width: 160px;
    height: 100px;
    padding: 12px 8px 12px 12px;
    gap: 10px;
    align-items: center;
    border-radius: 8px;
    background-color: ${colors.grey10};
  `,
  SubjectTagWrapper: styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    background-color: ${colors.grey10};
    width: 100%;
    height: 100%;
  `,
  TagView: styled.View`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  CreditView: styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  CompleteButton: styled.Text<{complete: boolean}>`
    display: flex;
    width: 57px;
    height: auto;
    margin: 0;
    color: ${({complete}) => (complete ? colors.primaryBrand : colors.grey60)};
    border-radius: 10px;
    border: 1px solid grey;
    border-color: ${({complete}) =>
      complete ? colors.primaryBrand : colors.grey60};
    text-align: center;
    align-items: center;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 600;
  `,
};
