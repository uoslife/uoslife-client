import {NativeModules} from 'react-native';
import {throwLinkingError} from '../throwLinkingError';

interface ILibraryStateNotification {
  startLibraryStateNotification: ({
    seatRoomName,
    seatNumber,
    isUsing,
    dateInterval,
  }: {
    seatRoomName: string;
    seatNumber: string;
    isUsing: boolean;
    dateInterval: number;
  }) => void;
  endLibraryStateNotification: () => void;
}

export class LibraryStateNotificationBridge {
  static libraryStateNotificationModule(): ILibraryStateNotification {
    return NativeModules.LibraryStateNotification;
  }

  static validateExistModule(func: keyof ILibraryStateNotification): boolean {
    if (
      this.libraryStateNotificationModule() &&
      typeof this.libraryStateNotificationModule()[func] === 'function'
    )
      return true;

    throwLinkingError('LibraryStateNotification');
    return false;
  }

  static start({
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
    if (!this.validateExistModule('startLibraryStateNotification')) return;
    this.libraryStateNotificationModule().startLibraryStateNotification({
      seatRoomName,
      seatNumber,
      isUsing,
      dateInterval,
    });
  }

  static end(): void {
    if (!this.validateExistModule('endLibraryStateNotification')) return;
    this.libraryStateNotificationModule().endLibraryStateNotification();
  }
}
