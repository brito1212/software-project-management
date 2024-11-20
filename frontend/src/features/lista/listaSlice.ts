import { AppThunk } from "../../app/store";
import { useToastAction } from "../toast/toastSlice";
import { getUser } from "../user/userApi";
import { setUser } from "../user/userSlice";
import { HttpStatusCode } from "axios";
import { Lista } from "./lista.type";
import { createLista, deleteLista, updateLista } from "./listaApi";
import { createSlice } from "@reduxjs/toolkit";

export interface ListaSate {
  list: Lista | null;
}

const initialState: ListaSate = {
  list: null,
};

export const listaSlice = createSlice({
  name: "lista",
  initialState,
  reducers: {
    addMidia(state, action) {
      state.midias.push(...action.payload);
    },
  },
});

export const createListaAction =
  (lista: Lista, callback: () => void, errorCallback: () => void): AppThunk =>
  async (dispatch) => {
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

export const updateListaAction =
  (data, callback: () => void, errorCallback: () => void): AppThunk =>
  async (dispatch, getState) => {
    const { listas } = getState().user.user;
    let lista = listas.find((lista) => lista.id == data.id);
    lista = {
      ...lista,
      name: data.name,
      description: data.description,
      midias: data.midias,
    };
    console.log(lista);
    updateLista(data.id, lista)
      .then(() => {
        dispatch(
          useToastAction(
            "success",
            "Atualizado com sucesso!",
            "Lista atualizada"
          )
        );
        getUser().then((user) => {
          dispatch(setUser(user));
        });
        callback();
      })
      .catch((error) => {
        if (error.response?.status === HttpStatusCode.BadRequest) {
          dispatch(
            useToastAction("error", error.response.data, "Erro ao atualizar")
          );
        } else {
          dispatch(
            useToastAction(
              "error",
              "Erro ao realizar a atualização, tente novamente.",
              "Erro na atualização"
            )
          );
        }
        errorCallback();
      });
  };

export const deleteListaAction =
  (id: number, callback: () => void, errorCallback: () => void): AppThunk =>
  async (dispatch, getState) => {
    deleteLista(id)
      .then(() => {
        dispatch(
          useToastAction("success", "Deletado com sucesso!", "Lista deletada")
        );
        getUser().then((user) => {
          dispatch(setUser(user));
        });
        callback();
      })
      .catch((error) => {
        if (error.response?.status === HttpStatusCode.BadRequest) {
          dispatch(
            useToastAction("error", error.response.data, "Erro ao atualizar")
          );
        } else {
          dispatch(
            useToastAction(
              "error",
              "Erro ao deletar, tente novamente.",
              "Erro ao deletar"
            )
          );
        }
        errorCallback();
      });
  };

export default listaSlice.reducer;
