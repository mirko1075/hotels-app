export interface Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  category: number;
  imageUrl?: string;
  vacational?: boolean;
}
