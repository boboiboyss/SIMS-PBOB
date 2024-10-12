export interface RegisterDto {
  data: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    confirmPassword: string;
  };
}
