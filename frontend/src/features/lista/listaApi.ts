import { api } from "../../api";
import { Lista } from "./lista.type";

export async function createLista(lista: Lista) {
  const response = await api.post("/lista/", lista);
  return response;
}
