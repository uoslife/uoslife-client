import {atom} from 'jotai';
import {DownloadProgress} from 'react-native-code-push';

export type SyncProgressAtomType = {
  syncProgress?: DownloadProgress;
  isUpdate: boolean;
};

const syncProgressAtom = atom<SyncProgressAtomType>({
  isUpdate: false,
});

export default syncProgressAtom;
