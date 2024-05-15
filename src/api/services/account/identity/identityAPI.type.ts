type IdentityType = Array<{
  id: string;
  type: string;
  status: string;
  idNumber: string;
  university: string;
  department: string;
  major: string;
  isActive: boolean;
}>;

export type GetIdentitiesRes = IdentityType;

export type SelectIdentityParams = {identityId: string};
export type SelectIdentityRes = IdentityType;
