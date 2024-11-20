import { Dayjs } from "dayjs";

export interface Review {
    id: number;
    rate: number;
    title: string;
    content: string;
    midia: number;
    user: number;
    comments: string[];
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
