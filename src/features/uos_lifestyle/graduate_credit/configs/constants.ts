// 전공필수/선택, 교양필수/선택 등 field 그룹화 위한 배열
import {ButtonConfig} from '../types';

export const LABEL_MAPS: {[key: string]: string} = {
  major: '전공',
  generalEducation: '교양',
  doubleMajor: '복수전공',
  minor: '부전공',
  commonElective: '공통 선택',
};

export const GROUP_FIELDS = [
  ['major.requirement', 'major.elective'],
  ['generalEducation.requirement', 'generalEducation.elective'],
  ['doubleMajor.requirement', 'doubleMajor.elective'],
  ['minor.requirement', 'minor.elective'],
];
export const PROGRESS_IMAGE = {
  dashed_primary: require('../assets/dashed_border_primary.png'),
  dashed_grey: require('../assets/dashed_border_grey.png'),
  speech_bubble: require('../assets/speech_bubble.png'),
};

export const BUTTONS_LABEL: ButtonConfig[] = [
  {label: '전공 필수', key: 'major.requirement'},
  {label: '전공 선택', key: 'major.elective'},
  {label: '교양 필수', key: 'generalEducation.requirement'},
  {label: '교양 선택', key: 'generalEducation.elective'},
  {label: '복수전공 필수', key: 'doubleMajor.requirement'},
  {label: '복수전공 선택', key: 'doubleMajor.elective'},
  {label: '부전공 필수', key: 'minor.requirement'},
  {label: '부전공 선택', key: 'minor.elective'},
  {label: '일반 선택', key: 'commonElective'},
];

export const SUBJECT_BUTTON_LABEL = {
  '전공 필수': '전공',
  '전공 선택': '전공',
  '교양 필수': '교양',
  '교양 선택': '교양',
  '복수전공 필수': '복수전공',
  '복수전공 선택': '복수전공',
  '부전공 필수': '부전공',
  '부전공 선택': '부전공',
  '일반 선택': '부전공',
};
