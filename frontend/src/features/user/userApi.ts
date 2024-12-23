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

export async function getUserByUsername(username: string) {
  const response = await api.get(
    `/api-auth/user/${username}/get_user_by_username/`
  );

  const user = response.data as User;
  return user;
}

export async function getUserById(id: number) {
  const response = await api.get(`/api-auth/user/${id}/get_user_by_id/`);

  const user = response.data as User;
  return user;
}

export async function followUser(username: string) {
  const response = await api.post(`/api-auth/user/${username}/follow/`);
  return response;
}

export async function unfollowUser(username: string) {
  const response = await api.post(`/api-auth/user/${username}/unfollow/`);
  return response;
}

export async function createUser(user: UserRegistration) {
  const response = await api.post("/api-auth/create/", user);
  return response;
}

export async function loginWithEmailAndPassword(
  username: string,
  password: string
) {
  const body = {
    client_id: backendClientId,
    client_secret: backendClientSecret,
    grant_type: "password",
    username: username,
    password: password,
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

export async function updateUser(userId: number, data: FormData) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await api.post(`api-auth/update/${userId}`, data, config);
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
