export interface Media {
    id: number;
    title: string;
    publish_date: Date;
    description: string;
    studio: string;
    banner: string;
    genres: string[];
    duration: string;
    director: string;
    cast: string[]
  }
  
  export enum Provider {
    GOOGLE = "google-oauth2",
  }
  