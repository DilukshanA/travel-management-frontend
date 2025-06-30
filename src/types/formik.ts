export type FormValues = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreedToTerms?: boolean;
  rememberMe?: boolean;
}

export type FormErrors = {
  firstName?: string,
  lastName?: string,
  email?: string,
  password?: string,
  confirmPassword?: string,
  agreedToTerms?: string
  rememberMe?: string;
}
