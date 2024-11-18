import { AppThunk, RootState } from "../../app/store";
import { useToastAction } from "../toast/toastSlice";
import { getUser } from "../user/userApi";
import { setUser } from "../user/userSlice";
import { HttpStatusCode } from "axios";
import { Lista } from "./lista.type";
import { createLista } from "./listaApi";
import { createSlice } from "@reduxjs/toolkit";

export interface ListaSate {
  list: Lista | null;
}

const initialState: ListaSate = {
  list: null,
};

export const listaSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const createListaAction =
  (lista: Lista, callback: () => void, errorCallback: () => void): AppThunk =>
  async (dispatch, getState) => {
    createLista(lista)
      .then(() => {
        dispatch(
          useToastAction(
            "success",
            "Lista cadastrada com sucesso!",
            "Lista cadastrada"
          )
        );
        getUser()
          .then((user) => {
            dispatch(setUser(user));
          })
          .then(() => {
            callback();
          });
      })
      .catch((error) => {
        if (error.response?.status === HttpStatusCode.BadRequest) {
          dispatch(
            useToastAction("error", error.response.data, "Erro no cadastro")
          );
        } else {
          dispatch(
            useToastAction(
              "error",
              "Erro ao realizar o cadastro de lista, tente novamente.",
              "Erro no cadastro de lista"
            )
          );
        }
        errorCallback();
      });
  };

export default listaSlice.reducer;
