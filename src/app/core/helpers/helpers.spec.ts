import { Hotel } from '../models/hotel.model';
import { NamebasedFinder } from './helpers';

const hotelList: Hotel[] = [
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
    price: 300,
    rating: 4,
    category: 1,
  },
];

describe('NamebasedFinder', () => {
  it('should find a hotel by its ID', () => {
    const finder = new NamebasedFinder();

    const expectedHotel = {
      id: 2,
      name: 'Hotel B',
      location: 'Location B',
      price: 200,
      rating: 5,
      category: 2,
    };

    const result$ = finder.getById(hotelList, 2);

    result$.subscribe((result) => {
      expect(result).toEqual(expectedHotel);
    });
  });

  it('should find hotels by name (case-insensitive)', () => {
    const finder = new NamebasedFinder();

    const expectedHotels = [
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
    ];

    const result$ = finder.getByName(hotelList, 'hotel');

    result$.subscribe((result) => {
      expect(result).toEqual(expectedHotels);
    });
  });

  it('should find hotels by exact name match', () => {
    const finder = new NamebasedFinder();

    const expectedHotels = [
      {
        id: 2,
        name: 'Hotel B',
        location: 'Location B',
        price: 200,
        rating: 5,
        category: 2,
      },
    ];

    const result$ = finder.getExactMatchType(hotelList, 'Hotel B');

    result$.subscribe((result) => {
      expect(result).toEqual(expectedHotels);
    });
  });

  it('should handle a list of hotels with duplicate names', () => {
    const finder = new NamebasedFinder();

    const expectedHotels = [
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
        name: 'Hotel B',
        location: 'Location C',
        price: 300,
        rating: 4,
        category: 1,
      },
    ];

    const result$ = finder.getByName(hotelList, 'hotel b');

    result$.subscribe((result) => {
      expect(result).toEqual(expectedHotels);
    });
  });
});
