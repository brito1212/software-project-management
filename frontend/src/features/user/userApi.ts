import { api } from "../../api";
import { backendClientId, backendClientSecret } from "../../main";
import { LoginResponse, User, UserRegistration } from "./user.type";

export async function getUser() {
  const response = await api.get("/api-auth/current-user/");

  const user = response.data as User;
  return user;
}

export async function getAllUsers() {
  const response = await api.get("/api-auth/all-users/");

  const user = response.data as User;
  return user;
}

export async function createUser(user: UserRegistration) {
  const response = await api.post("/api-auth/create/", user);
  return response;
}

export async function loginWithEmailAndPassword(
  username: string,
  password: string,
  captchaResponse: string
) {
  const body = {
    client_id: backendClientId,
    client_secret: backendClientSecret,
    grant_type: "password",
    username: username,
    password: password,
    captcha_response: captchaResponse,
  };
  const response = await api.post("api-auth/token/", body);
  return response.data as LoginResponse;
}

export async function refreshUser(refreshToken: string) {
  const body = {
    client_id: backendClientId,
    client_secret: backendClientSecret,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };
  const response = await api.post("api-auth/token/", body);
  return response.data as LoginResponse;
}

export async function updateUser(userId: string, data: object) {
  const response = await api.patch(`api-auth/update/${userId}`, data);
  return response.data;
}

export async function passwordForget(email: string) {
  const response = await api.post("api-auth/password-forget/", { email });
  return response.data;
}

export async function passwordReset(newPassword: string, token: string) {
  const response = await api.post("api-auth/password-reset/", {
    token,
    new_password: newPassword,
  });
  return response.data;
}