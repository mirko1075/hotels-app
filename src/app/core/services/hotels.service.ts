// hotel.service.ts
import { Injectable } from '@angular/core';
import { Hotel } from '../models/hotel.model';
import { Observable, of } from 'rxjs';
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

  getHotels(): Observable<Hotel[]> {
    return of([...this.hotels]);
  }

  getHotelById(id: number): Observable<Hotel | undefined> {
    return of(this.hotels.find((hotel) => hotel.id === id));
  }

  updateHotel(updatedHotel: any): Observable<Hotel> {
    debugger;
    const index = this.hotels.findIndex(
      (hotel) => hotel.id === updatedHotel.id
    );
    if (index !== -1) {
      this.hotels[index] = { ...this.hotels[index], ...updatedHotel };
    }
    return of(this.hotels[index]);
  }

  addHotel(hotel: Hotel): Observable<Hotel> {
    const ids = this.hotels.map((h) => h.id);
    const lastId = Math.max(...ids);
    hotel.id = lastId + 1;
    this.hotels.push(hotel);
    return of(hotel);
  }

  deleteHotel(hotelId: number): Observable<Hotel[]> {
    this.hotels = this.hotels.filter((h) => h.id !== hotelId);
    return of(this.hotels);
  }
}
