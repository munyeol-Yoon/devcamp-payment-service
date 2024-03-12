export type Payload = {
  sub: string;
  iat: number;
  jti: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type AccessToken = {
  accessToken: string;
};

export type RefreshToken = {
  refreshToken: string;
};

export type CouponType = 'percent' | 'fixed';
// 'percent'; // 정률제
//  'fixed'; // 정액제
