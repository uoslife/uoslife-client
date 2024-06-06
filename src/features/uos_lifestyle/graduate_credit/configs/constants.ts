// 전공필수/선택, 교양필수/선택 등 filed 그룹화 위한 배열
export const GROUP_FIELDS = [
  ['majorRequirement', 'majorElective'],
  ['generalEducationRequirement', 'generalEducationElective'],
  ['doubleMajorRequirement', 'doubleMajorElective'],
  ['minorRequirement', 'minorElective'],
];

// lable 태그 매핑 위한 객체
export const LABEL_MAPS: {[key: string]: string} = {
  majorRequirement: '전공',
  generalEducationRequirement: '교양',
  doubleMajorRequirement: '복수전공',
  minorRequirement: '부전공',

};

export const PROGRESS_IMAGE = {
  dashed_primary: require('../assets/dashed_border_primary.png'),
  dashed_grey: require('../assets/dashed_border_grey.png'),
  speech_bubble: require('../assets/speech_bubble.png'),
};
