export class ResetCredentials {
  email: string;
  reset_code: string;
}

export class ChangeCredentials {
  password: string;
  reset_code: string;
}
