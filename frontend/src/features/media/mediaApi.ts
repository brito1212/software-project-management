import { api } from "../../api";
import { Media } from "./media.type";

export async function getMedia(id: string) {
  const response = await api.get(`/midia/movie/${id}/get_by_id`);
  const media = response.data as Media;
  return media;
}

export async function getAllMedias() {
  const response = await api.get("/api-auth/all-medias/");

  const media = response.data as Media;
  return media;
}
