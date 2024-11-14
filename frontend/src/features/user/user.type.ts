export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  seguindo: string[];
  seguidores: string[];
  profile_image: string;
  banner: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export enum Provider {
  GOOGLE = "google-oauth2",
}

export interface UserRegistration extends User {
  password: string;
}
