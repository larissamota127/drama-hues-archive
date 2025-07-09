
export interface Drama {
  id: string;
  title: string;
  year: number;
  status: 'watched' | 'want-to-watch' | 'watching';
  rating: number;
  opinion?: string;
  poster?: string;
  genre?: string;
  country?: string;
  episodes?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type DramaFormData = Omit<Drama, 'id' | 'createdAt' | 'updatedAt'>;
