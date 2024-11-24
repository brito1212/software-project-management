import { api } from "../../api";
import { Media } from "./media.type";

export async function getMedia(id: string) {
  const response = await api.get(`/midia/movie/${id}/get_by_id`);
  const media = response.data as Media;
  return media;
}

export async function fillDatabase() {
  await api.get(`/midia/movie/fill_database`);
  await api.get(`/midia/serie/fill_database`);
  await api.get(`/midia/game/fill_database`);
}

export async function getAllMedias(type_media: string) {
  const response = await api.get(`/midia/${type_media}`);
  const media = response.data;
  return media;
}
