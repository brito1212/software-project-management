import { api } from "../../api";
import { Lista } from "./lista.type";

export async function createLista(lista: Lista) {
  const response = await api.post("/lista/", lista);
  return response;
}

export async function updateLista(id: number, lista: Lista) {
  const response = await api.patch(`lista/${id}/`, lista);
  return response;
}

export async function deleteLista(id: number) {
  const response = await api.delete(`lista/${id}/`);
  return response;
}
