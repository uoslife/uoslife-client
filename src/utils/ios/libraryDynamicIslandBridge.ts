import {NativeModules} from 'react-native';

interface DynamicIslandModule {
  startActivity: (
    seatRoomName: string,
    seatNumber: string,
    isUsing: boolean,
    dateInterval: number,
  ) => void;
  updateActivity: (isUsing: boolean, dateInterval: number) => void;
  endActivity: () => void;
  isActivityEnabled: () => string;
}

/* eslint-disable import/prefer-default-export */
export class LibraryDynamicIslandBridge {
  static dynamicIslandModule(): DynamicIslandModule {
    return NativeModules.DynamicIslandModule;
  }

  static validateExistModule(func: keyof DynamicIslandModule): boolean {
    if (
      this.dynamicIslandModule() &&
      typeof this.dynamicIslandModule()[func] === 'function'
    )
      return true;
    // eslint-disable-next-line no-console
    console.warn('DynamicIslandModule not found');
    return false;
  }

  static onStartActivity({
    seatRoomName,
    seatNumber,
    isUsing,
    dateInterval,
  }: {
    seatRoomName: string;
    seatNumber: string;
    isUsing: boolean;
    dateInterval: number;
  }): void {
    if (!this.validateExistModule('startActivity')) return;
    this.dynamicIslandModule().startActivity(
      seatRoomName,
      seatNumber,
      isUsing,
      dateInterval,
    );
  }

  static onUpdateActivity({
    isUsing,
    dateInterval,
  }: {
    isUsing: boolean;
    dateInterval: number;
  }): void {
    if (!this.validateExistModule('updateActivity')) return;
    this.dynamicIslandModule().updateActivity(isUsing, dateInterval);
  }

  static onEndActivity(): void {
    if (!this.validateExistModule('endActivity')) return;
    this.dynamicIslandModule().endActivity();
  }
}
