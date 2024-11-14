import { api } from "../../api";
import { Media } from "./media.type";

export async function getMedia(id: string) {
  console.log(id);
  const response = await api.get(`/media/movie/get_by_id/${id}`);
  console.log(response);
  const media = response.data as Media;
  console.log(media);
  return media;
}
  
  

export async function getAllMedias() {
  const response = await api.get("/api-auth/all-medias/");

  const media = response.data as Media;
  return media;
}
