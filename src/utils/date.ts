import {MealTimeType} from '../api/services/util/cafeteria/cafeteriaAPI.type';

export default class DateUtils {
  private _today: Date;

  private _year: number;
  private _month: number;
  private _date: number;
  private _day: number;
  private _hour: number;
  private _minutes: number;

  private _korDays: Array<string>;
  private _mealTime: Array<MealTimeType>;

  private _startOfWeek: Date;
  private _thisWeekCommonDates: Array<string>;
  private _thisWeekDisplayDates: Array<string>;

  constructor(date: Date) {
    this._today = date;

    this._year = date.getFullYear();
    this._month = date.getMonth() + 1;
    this._date = date.getDate();
    this._day = date.getDay();
    this._hour = date.getHours();
    this._minutes = date.getMinutes();

    this._korDays = ['일', '월', '화', '수', '목', '금', '토'];
    this._mealTime = ['BREAKFAST', 'LUNCH', 'DINNER'];

    this._startOfWeek = new Date(date);
    this._startOfWeek.setDate(date.getDate() - date.getDay());
    this._thisWeekCommonDates = this.generateWeekCommonDates();
    this._thisWeekDisplayDates = this.generateWeekDisplayDates();
  }

  get today() {
    return this._today;
  }

  get year() {
    return this._year;
  }

  get month() {
    return this._month;
  }

  get date() {
    return this._date;
  }

  get day() {
    return this._day;
  }

  get hour() {
    return this._hour;
  }

  get minutes() {
    return this._minutes;
  }

  get korDays() {
    return this._korDays;
  }

  get mealTime() {
    return this._mealTime;
  }

  get startOfWeek() {
    return this._startOfWeek;
  }

  get commonDate() {
    return `${this._year}-${this._month}-${this._date}`;
  }

  get displayDate() {
    return `${this.year}.${this.month}.${this.date} (${
      this.korDays[this.day]
    })`;
  }

  get currentMealTime(): MealTimeType {
    const currentHour = this.hour;
    if (currentHour < 10) return this.mealTime[0];
    if (currentHour >= 17) return this.mealTime[2];
    return this.mealTime[1];
  }

  get thisWeekCommonDates() {
    return this._thisWeekCommonDates;
  }

  get thisWeekDisplayDates() {
    return this._thisWeekDisplayDates;
  }

  // eslint-disable-next-line class-methods-use-this
  generateCommonDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  generateDisplayDate(date: Date) {
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} (${
      this.korDays[date.getDay()]
    })`;
  }

  generateWeekCommonDates() {
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(this.startOfWeek);
      currentDate.setDate(this.startOfWeek.getDate() + i);
      weekDates.push(this.generateCommonDate(currentDate));
    }
    return weekDates;
  }

  generateWeekDisplayDates() {
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(this.startOfWeek);
      currentDate.setDate(this.startOfWeek.getDate() + i);
      weekDates.push(this.generateDisplayDate(currentDate));
    }
    return weekDates;
  }
}
