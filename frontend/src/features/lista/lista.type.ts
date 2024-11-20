export interface Lista {
  name: string;
  description: string;
  midias: MediaList[];
}

export interface MidiaList {
  id: number;
  title: string;
  banner: string;
}
