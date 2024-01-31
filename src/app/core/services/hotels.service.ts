// hotel.service.ts
import { Injectable } from '@angular/core';
import { Hotel } from '../models/hotel.model';
const hotels = [
  {
    id: 1,
    name: 'Hotel A',
    location: 'Madrid',
    price: 100,
    rating: 4,
    category: 4,
    vacational: true,
    imageUrl:
      'https://media.istockphoto.com/id/104731717/es/foto/complejo-tur%C3%ADstico-de-lujo.jpg?s=2048x2048&w=is&k=20&c=QRLnvUZi6xp9xgss6e6IMg5Gv5g2iosfFzPR9DyS__g=',
  },
  {
    id: 2,
    name: 'Hotel B',
    location: 'Barcelona',
    price: 120,
    rating: 3.5,
    category: 4,
    vacational: true,
    imageUrl:
      'https://media.istockphoto.com/id/183880289/es/foto/isla-fisher-en-miami.jpg?s=2048x2048&w=is&k=20&c=_XYz9xYSZ0sJ55tzFhX4Ga0xYMTfiePUZMewA_4U10I=',
  },
];
@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private hotels: Hotel[] = hotels;

  getHotels(): any[] {
    return [...this.hotels];
  }

  getHotelById(id: number): any {
    return this.hotels.find((hotel) => hotel.id === id);
  }

  updateHotel(updatedHotel: any): void {
    debugger;
    const index = this.hotels.findIndex(
      (hotel) => hotel.id === updatedHotel.id
    );
    if (index !== -1) {
      this.hotels[index] = { ...this.hotels[index], ...updatedHotel };
    }
  }

  deleteHotel(hotelId: number): void {
    this.hotels = this.hotels.filter((h) => h.id !== hotelId);
  }
}
