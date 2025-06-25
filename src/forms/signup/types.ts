export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

export type FormErrors = {
  firstName?: string,
  lastName?: string,
  email?: string,
  password?: string,
  confirmPassword?: string,
  agreedToTerms?: string
}
