import { api } from "../../api";
import { Media } from "./media.type";

export async function getMedia(mediaType: string, id: string) {
  const response = await api.get(`/midia/${mediaType}/${id}/get_by_id`);
  const media = response.data as Media;
  return media;
}

export async function getAllMedias(type_media: string) {
  const response = await api.get(`/midia/${type_media}`);
  const media = response.data;
  return media;
}

export async function getSearchMedia(type_media: string, name: string | null) {
  const response = await api.get(`/midia/${type_media}/search?q=${name}`);
  return response.data;
}
