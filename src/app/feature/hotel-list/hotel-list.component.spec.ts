import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelListComponent } from './hotel-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HotelService } from 'src/app/core/services/hotels.service';
import { of } from 'rxjs';

const hotelServiceStub = {
  deleteHotel: jest.fn().mockReturnValue(of({})),
  getHotels: jest.fn().mockReturnValue(of([])),
};

describe('component', () => {
  let component: HotelListComponent;
  let fixture: ComponentFixture<HotelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelListComponent],
      providers: [{ provide: HotelService, useValue: hotelServiceStub }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize hotels array with data from hotelService.getHotels()', () => {
    const hotels = [
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
    const spy = jest
      .spyOn(hotelServiceStub, 'getHotels')
      .mockReturnValue(of(hotels));

    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.hotels).toEqual(hotels);
  });

  it('should call the deleteHotel method of the hotelService with the provided hotelId', () => {
    const hotelId = 1;
    const deleteHotelSpy = jest.spyOn(hotelServiceStub, 'deleteHotel');

    component.deleteHotel(hotelId);

    expect(deleteHotelSpy).toHaveBeenCalledWith(hotelId);
  });

  it('should not throw any error when the deleteHotel method of the hotelService is called successfully', () => {
    const hotelId = 1;
    expect(() => {
      component.deleteHotel(hotelId);
    }).not.toThrow();
  });

  it('should not call the deleteHotel method of the hotelService if the provided hotelId is negative', () => {
    const hotelId = -1;
    const deleteHotelSpy = jest.spyOn(hotelServiceStub, 'deleteHotel');

    component.deleteHotel(hotelId);

    expect(deleteHotelSpy).not.toHaveBeenCalled();
  });
});
