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

export class HotelImpl implements Hotel {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  category: number;
  imageUrl?: string;
  vacational?: boolean;

  constructor(
    id: number,
    name: string,
    location: string,
    price: number,
    rating: number,
    category: number,
    imageUrl?: string,
    vacational?: boolean
  ) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.price = price;
    this.rating = rating;
    this.category = category;
    this.imageUrl = imageUrl;
    this.vacational = vacational;
  }
}
