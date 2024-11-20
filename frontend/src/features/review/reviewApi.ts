import { api } from "../../api";
import { Review } from "./review.type";

export async function createReview(review: Review) {
    const response = await api.post("/review/", review);
    return response;
}

export async function getReviews(midiaId: string) {
    const response = await api.get(`/review/`,{
        params: {
            midiaId: midiaId,
        }
      })
    return response.data as Review[];
}


export async function deleteReview(reviewId: string) {
    const response = await api.delete(`/review/${reviewId}/`);
    return response.data as Review[];
}