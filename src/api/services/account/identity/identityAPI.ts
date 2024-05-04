import {get, post} from '../../../core/methods';
import IdentityService from './identityAPI.interface';
import * as Type from './identityAPI.type';

const IdentityAPI: IdentityService = {
  getIdentities: () => get<Type.GetIdentitiesRes>('v1/identities', 'ACCOUNT'),
  selectIdentity: params =>
    post<Type.SelectIdentityRes>(
      `v1/identities/${params.identityId}`,
      '',
      'ACCOUNT',
    ),
};
export default IdentityAPI;
