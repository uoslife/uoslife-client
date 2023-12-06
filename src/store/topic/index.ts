import {atom} from 'jotai';

export type TopicType = 'NOTIFICATION' | 'ANNOUNCEMENT';

export type TopicName =
  | 'SERVICE_NOTIFICATION'
  | 'MARKETING_NOTIFICATION'
  | 'GENERAL_ANNOUNCEMENT'
  | 'ACADEMIC_ANNOUNCEMENT'
  | 'RECRUIT_ANNOUNCEMENT'
  | 'STARTUP_ANNOUNCEMENT';

type ToggleValueType = {
  title: string;
  type: TopicType;
  name: TopicName;
  isToggleOn: boolean;
};

const UOSLIFE_NOTIFICATION_SETTING: Array<ToggleValueType> = [
  {
    title: '시대생 서비스 알림',
    type: 'NOTIFICATION',
    name: 'SERVICE_NOTIFICATION',
    isToggleOn: false,
  },
  {
    title: '광고 및 마케팅 수신 동의 알림',
    type: 'NOTIFICATION',
    name: 'MARKETING_NOTIFICATION',
    isToggleOn: false,
  },
];

const ANNOUNCEMENT_NOTIFICATION_SETTING: Array<ToggleValueType> = [
  {
    title: '일반공지',
    type: 'ANNOUNCEMENT',
    name: 'GENERAL_ANNOUNCEMENT',
    isToggleOn: false,
  },
  {
    title: '학사공지',
    type: 'ANNOUNCEMENT',
    name: 'ACADEMIC_ANNOUNCEMENT',
    isToggleOn: false,
  },
  {
    title: '창업공지',
    type: 'ANNOUNCEMENT',
    name: 'RECRUIT_ANNOUNCEMENT',
    isToggleOn: false,
  },
  {
    title: '직원채용',
    type: 'ANNOUNCEMENT',
    name: 'STARTUP_ANNOUNCEMENT',
    isToggleOn: false,
  },
];

const initTopicAtom = [
  ...UOSLIFE_NOTIFICATION_SETTING,
  ...ANNOUNCEMENT_NOTIFICATION_SETTING,
];

const topicAtom = atom(initTopicAtom);

export default topicAtom;
