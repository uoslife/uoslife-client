import {GetCafeteriasResponse} from '../../api/services/util/cafeteria/cafeteriaAPI.type';

export const mockCafeteriaItem: GetCafeteriasResponse = [
  {
    location: '학생회관',
    operationTime: '코너 A, B ,C 11:00 ~ 14:00\n코너 E 11:00 ~ 13:30',
    attributes: [
      {
        corner: '코너 A',
        menuList: [
          {
            menu: '라면',
            price: '2,000원',
            sideDish: '치즈 / 떡 / 만두 / 공기밥',
            sidePrice: '(+ 500원)',
          },
          {
            menu: '오징어해장라면',
            price: '2,800원',
          },
          {
            menu: '삶은계란',
            price: '400원',
          },
        ],
      },
      {
        corner: '코너 B',
        menuList: [
          {
            menu: '참치마요덮밥',
            price: '3,800원',
          },
          {
            menu: '치킨마요덮밥',
            price: '3,800원',
          },
        ],
      },
      {
        corner: '코너 C',
        menuList: [
          {
            menu: '참치김치찌개',
            price: '3,800원',
            sideDish: '사모사튀김 / 아삭이고추된장무침 / 깍두기',
          },
        ],
      },
      {
        corner: '코너 E',
        menuList: [
          {
            menu: '언양식불고기&파채무침',
            price: '5,000원',
            sideDish: '두부된장국 / 애호박양파볶음 / 김치',
          },
        ],
      },
    ],
  },
  {
    location: '본관 8층',
    operationTime: '11:30 ~ 14:00',
    attributes: [
      {
        menuList: [
          {
            menu: '치킨토마토스튜',
            price: '6,000원',
            sideDish: '푸실리파스타/야채버섯구이/갈릭바게트/단호박샐러드',
          },
        ],
      },
    ],
  },
  {
    location: '자연과학관',
    operationTime: '11:30 ~ 14:00',
    attributes: [
      {
        menuList: [
          {
            menu: '김치잔치국수',
            price: '6,000원',
            sideDish: '싸먹는유부초밥/오이무침/군만두튀김/단무지',
          },
        ],
      },
    ],
  },
];

export default mockCafeteriaItem;
