import { Review } from "./review.type";
import { createReview, deleteReview } from "./reviewApi";
import { AppThunk } from "../../app/store";
import { useToastAction } from "../toast/toastSlice";
import { HttpStatusCode } from "axios";

export const createReviewAction =
  (
    reviewData: Review,
    callback: () => void,
    errorCallback: () => void
  ): AppThunk =>
  async (dispatch) => {
    createReview(reviewData)
      .then(() => {
        dispatch(
          useToastAction(
            "success",
            "Review criada com sucesso!",
            "Review"
          )
        );
        callback();
      })
      .catch((error) => {
        if (error.response?.status === HttpStatusCode.BadRequest) {
          dispatch(
            useToastAction("error", error.response.data, "Erro na Review")
          );
        } else {
          dispatch(
            useToastAction(
              "error",
              "Erro ao criar Review, tente novamente.",
              "Erro na Review"
            )
          );
        }
        errorCallback();
      });
  };


export const deleteReviewAction =
  (
    reviewId: string,
    callback: () => void,
    errorCallback: () => void
  ): AppThunk =>
  async (dispatch) => {
    deleteReview(reviewId)
      .then(() => {
        dispatch(useToastAction("success", "Review deletada com sucesso!", ""));
        callback();
      })
      .catch((error) => {
        if (error.response?.status === HttpStatusCode.BadRequest) {
          dispatch(useToastAction("error", error.response.data, "Erro na Review"));
        } else {
          dispatch(useToastAction("error", "Erro ao deletar Review, tente novamente.", "Erro na Review"));
        }
        errorCallback();
      });
  };
