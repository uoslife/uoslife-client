export type GetCafeteriasWithIdParams = {
  id: number;
};

export type GetCafeteriasWithIdResponse = {
  name: string;
  menu: string;
  sideMenus: string;
  openTime: string;
  closeTime: string;
  kcal: string;
  protein: string;
  mealTime: string;
};

export type GetCafeteriasWithDateParams = {
  date: string;
};

export type GetCafeteriasWithDateResponse = [
  {
    name: string;
    menu: string;
    sideMenus: string;
    openTime: string;
    closeTime: string;
    kcal: string;
    protein: string;
    mealTime: string;
  },
];
