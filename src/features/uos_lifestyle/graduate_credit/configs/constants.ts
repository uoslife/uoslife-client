// 전공필수/선택, 교양필수/선택 등 filed 그룹화 위한 배열
import {ButtonConfig} from '../types';

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

export const BUTTONS_LABEL: ButtonConfig[] = [
  {label: '전공 필수', key: 'majorRequirement'},
  {label: '전공 선택', key: 'majorElective'},
  {label: '교양 필수', key: 'generalEducationRequirement'},
  {label: '교양 선택', key: 'generalEducationElective'},
  {label: '복수전공 필수', key: 'doubleMajorRequirement'},
  {label: '복수전공 선택', key: 'doubleMajorElective'},
  {label: '부전공 필수', key: 'minorRequirement'},
  {label: '부전공 선택', key: 'minorElective'},
  {label: '공통 선택', key: 'commonElective'},
];
