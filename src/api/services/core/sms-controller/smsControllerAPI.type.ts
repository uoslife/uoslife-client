export type SendSmsVerificationParams = {
  mobile: string;
};
export type SendSmsVerificationRes = {
  trialCount: number;
  mobile: string;
  smsServerResponse: {
    status: number;
    msg: string;
    msg_detail: string;
  };
};

export type CheckSmsVerificationParams = {
  mobile: string;
  code: string;
};
export type CheckSmsVerificationRes = {
  mobile: string;
  isVerified: boolean;
};
