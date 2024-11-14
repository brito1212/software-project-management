export interface Media {
    id: number;
    title: string;
    publish_date: Date;
    description: string;
    studio: string;
    banner: string;
  }
  
  export enum Provider {
    GOOGLE = "google-oauth2",
  }
  