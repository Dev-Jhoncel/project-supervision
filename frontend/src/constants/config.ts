//Project Supervision endpoint
export const LOGIN_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`;
export const SIGN_UP_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`;

//OTP CONFIGURATION
export const OTP_BASE_URL = `${process.env.NEXT_PUBLIC_OTP_URL}`;
export const OTP_SEND_OTP_URL = `${process.env.NEXT_PUBLIC_OTP_URL}/api/v2/sendOTP`;
export const OTP_VALIDATE_OTP_URL = `${process.env.NEXT_PUBLIC_OTP_URL}/api/v2/validateOTP`;
export const OTP_USER = `${process.env.NEXT_PUBLIC_OTP_USER}`;
export const OTP_PASS = `${process.env.NEXT_PUBLIC_OTP_PASS}`;
export const OTP_LIMIT = `${process.env.NEXT_PUBLIC_OTP_LIMIT}`;
