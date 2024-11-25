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
    cast: string[];
    publisher: string;
    avarage_playtime: string;
    avarage_price: number; 
    platforms: string[];
    seasons: number;
    episodes: number;
  }
  
  export enum Provider {
    GOOGLE = "google-oauth2",
  }
  