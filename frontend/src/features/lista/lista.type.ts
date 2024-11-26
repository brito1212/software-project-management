export interface Lista {
  name: string;
  description: string;
  midias: (number | undefined)[];
}

export interface MidiaList {
  id: number;
  title: string;
  banner: string;
  media_type: string;
}
