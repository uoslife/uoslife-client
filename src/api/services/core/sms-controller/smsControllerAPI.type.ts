export type sendSmsVerificationParams = {
  mobile: string;
};
export type sendSmsVerificationRes = {
  trialCount: number;
  mobile: string;
  smsServerResponse: {
    status: number;
    msg: string;
    msg_detail: string;
  };
};

export type checkSmsVerificationParams = {
  mobile: string;
  code: string;
};
export type checkSmsVerificationRes = {
  mobile: string;
  isVerified: boolean;
};
