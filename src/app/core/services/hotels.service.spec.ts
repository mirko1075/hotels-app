import { TestBed } from '@angular/core/testing';

import { HotelService } from './hotels.service';
import { Hotel } from '../models/hotel.model';

const hotels: Hotel[] = [
  {
    category: 4,
    id: 1,
    imageUrl:
      'https://media.istockphoto.com/id/104731717/es/foto/complejo-tur%C3%ADstico-de-lujo.jpg?s=2048x2048&w=is&k=20&c=QRLnvUZi6xp9xgss6e6IMg5Gv5g2iosfFzPR9DyS__g=',
    location: 'Madrid',
    name: 'Hotel A',
    price: 100,
    rating: 4,
    vacational: true,
  },
  {
    category: 4,
    id: 2,
    imageUrl:
      'https://media.istockphoto.com/id/183880289/es/foto/isla-fisher-en-miami.jpg?s=2048x2048&w=is&k=20&c=_XYz9xYSZ0sJ55tzFhX4Ga0xYMTfiePUZMewA_4U10I=',
    location: 'Barcelona',
    name: 'Hotel B',
    price: 120,
    rating: 3.5,
    vacational: true,
  },
];
describe('HotelService', () => {
  let hotelService: HotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    hotelService = TestBed.inject(HotelService);
    hotelService['hotels'] = hotels;
  });

  it('should be created', () => {
    expect(hotelService).toBeTruthy();
  });

  it('should return an array of hotels when getHotels method is called', () => {
    hotelService.getHotels().subscribe((result) => {
      expect(result).toEqual(hotels);
    });
  });

  it('should return the correct hotel object when getHotelById method is called with a valid id', () => {
    const id = 1;
    hotelService.getHotelById(id).subscribe((result) => {
      expect(result).toEqual(hotels.find((hotel) => hotel.id === id));
    });
  });

  it('should update the correct hotel object with the provided data when updateHotel method is called', () => {
    const updatedHotel = {
      id: 1,
      name: 'Updated Hotel A',
      location: 'Updated Madrid',
      price: 200,
      rating: 5,
      category: 5,
      vacational: false,
      imageUrl: 'https://updated-image-url.com',
    };
    hotelService.updateHotel(updatedHotel);
    hotelService.getHotelById(updatedHotel.id).subscribe((result) => {
      expect(result).toEqual(updatedHotel);
    });
  });

  it('should not update any hotel object when updateHotel method is called with an invalid id', () => {
    const updatedHotel = {
      id: 3,
      name: 'Updated Hotel C',
      location: 'Updated Barcelona',
      price: 150,
      rating: 4.5,
      category: 4,
      vacational: true,
      imageUrl: 'https://updated-image-url.com',
    };
    hotelService.updateHotel(updatedHotel);
    hotelService.getHotelById(updatedHotel.id).subscribe((result) => {
      expect(result).toBeUndefined();
    });
  });

  it('should return an empty array when getHotels method is called and there are no hotels', () => {
    hotelService['hotels'] = [];
    hotelService.getHotels().subscribe((result) => {
      expect(result).toEqual([]);
    });
  });

  it('should return undefined when getHotelById method is called with an invalid id', () => {
    const id = 3;
    hotelService.getHotelById(id).subscribe((result) => {
      expect(result).toBeUndefined();
    });
  });

  it('should not update any hotel object when updateHotel method is called with an empty object', () => {
    const updatedHotel = {} as Hotel;
    hotelService.updateHotel(updatedHotel);
    hotelService.getHotels().subscribe((result) => {
      expect(result).toEqual(hotels);
    });
  });

  it('should not update any hotel object when updateHotel method is called with an object with an invalid id', () => {
    const updatedHotel = {
      id: 3,
      name: 'Updated Hotel C',
      location: 'Updated Barcelona',
      price: 150,
      rating: 4.5,
      category: 4,
      vacational: true,
      imageUrl: 'https://updated-image-url.com',
    };
    hotelService.updateHotel(updatedHotel);
    hotelService.getHotels().subscribe((result) => {
      expect(result).toEqual(hotels);
    });
  });

  it('should delete the hotel with the given id from the list of hotels', () => {
    const hotelService = new HotelService();
    const hotels = [
      {
        id: 1,
        name: 'Hotel 1',
        location: '',
        price: 20,
        category: 5,
        rating: 6,
      },
      {
        id: 2,
        name: 'Hotel 2',
        location: '',
        price: 20,
        category: 5,
        rating: 6,
      },
      {
        id: 3,
        name: 'Hotel 3',
        location: '',
        price: 20,
        category: 5,
        rating: 6,
      },
    ];
    hotelService['hotels'] = hotels;

    hotelService.deleteHotel(2).subscribe((result) => {
      expect(hotelService['hotels']).toEqual([
        {
          id: 1,
          name: 'Hotel 1',
          location: '',
          price: 20,
          category: 5,
          rating: 6,
        },
        {
          id: 3,
          name: 'Hotel 3',
          location: '',
          price: 20,
          category: 5,
          rating: 6,
        },
      ]);
    });
  });

  it('should add a new hotel with a unique id to the list of hotels', () => {
    const hotelService = new HotelService();
    const hotel: Hotel = {
      id: 1,
      name: 'Hotel A',
      location: 'Location A',
      price: 100,
      rating: 4,
      category: 1,
    };
    hotelService.addHotel(hotel);
    hotelService.getHotels().subscribe((result) => {
      expect(hotels).toContain(hotel);
    });
  });

  it('should delete the hotel with the valid hotelId', () => {
    const hotelId = 2;
    hotelService.deleteHotel(hotelId).subscribe((result) => {
      const hotels = hotelService['hotels'];
      expect(hotels).toEqual([
        {
          category: 5,
          id: 1,
          imageUrl: 'https://updated-image-url.com',
          location: 'Updated Madrid',
          name: 'Updated Hotel A',
          price: 200,
          rating: 5,
          vacational: false,
        },
      ]);
    });
  });

  it('should return an Observable of an array of hotels that match the given name', () => {
    const hotelService = new HotelService();
    const hotels: Hotel[] = [
      {
        id: 1,
        name: 'Hotel A',
        location: 'Location A',
        price: 100,
        rating: 4,
        category: 1,
      },
      {
        id: 2,
        name: 'Hotel B',
        location: 'Location B',
        price: 200,
        rating: 5,
        category: 2,
      },
      {
        id: 3,
        name: 'Hotel C',
        location: 'Location C',
        price: 150,
        rating: 3,
        category: 1,
      },
    ];
    hotelService['hotels'] = hotels;

    const result$ = hotelService.getHotelByName('Hotel A');
    result$.subscribe((result) => {
      expect(result).toEqual([hotels[0]]);
    });
  });
});
