import { Dayjs } from "dayjs";

export interface Review {
    id: number;
    rate: number;
    title: string;
    content: string;
    midia: number;
    user: number;
    comments: Comment[];
}

export interface ReviewUser {
    id: number;
    username: string;
    profile_image: string;
}

export interface ReviewResponse {
    id: number;
    rate: number;
    title: string;
    content: string;
    midia: number;
    user: ReviewUser;
    comments: string[];
    created_at: Dayjs;
}


export interface Comment {
    id: number;
    content: string;
    review: number;
    user: number;
}

export interface CommentResponse{
    id: number;
    content: string;
    review: number;
    user: ReviewUser;
    created_at: Dayjs;
}