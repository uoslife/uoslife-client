type EmptifiedObject = {};
export type PortalVerificationResType = {
  studentId: string;
  studentName: string;
  status: string;
  isRepresentative: boolean;
};

export type PortalVerificationParams = {
  username: string;
  password: string;
};
export type PortalVerificationRes = EmptifiedObject;

export type GetPortalVerificationParams = EmptifiedObject;
export type GetPortalVerificationRes = Array<PortalVerificationResType>;

export type DeletePortalVerificationParams = EmptifiedObject;
export type DeletePortalVerificationRes = EmptifiedObject;

export type RepresentativePortalVerificationParams = {
  studentNumber: string;
};
export type RepresentativePortalVerificationRes = PortalVerificationResType;
