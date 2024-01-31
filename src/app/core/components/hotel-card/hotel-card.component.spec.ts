import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelCardComponent } from './hotel-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const hotelMock = {
  id: 1,
  name: 'Hotel A',
  location: 'Madrid',
  price: 100,
  rating: 4,
  category: 4,
  vacational: true,
  imageUrl:
    'https://media.istockphoto.com/id/104731717/es/foto/complejo-tur%C3%ADstico-de-lujo.jpg?s=2048x2048&w=is&k=20&c=QRLnvUZi6xp9xgss6e6IMg5Gv5g2iosfFzPR9DyS__g=',
};

describe('HotelCardComponent', () => {
  let component: HotelCardComponent;
  let fixture: ComponentFixture<HotelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HotelCardComponent);
    component = fixture.componentInstance;
    component.hotel = hotelMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit sendDeleteHotel event with correct hotelId parameter', () => {
    const hotelId = 1;
    const emitSpy = jest.spyOn(component.sendDeleteHotel, 'emit');

    component.deleteHotel(hotelId);

    expect(emitSpy).toHaveBeenCalledWith(hotelId);
  });

  it('should not throw any errors or exceptions', () => {
    const component = new HotelCardComponent();

    expect(() => {
      component.deleteHotel(1);
    }).not.toThrow();
  });

  it('should handle the case where hotelId parameter is undefined', () => {
    const component = new HotelCardComponent();

    expect(() => {
      component.deleteHotel('1' as unknown as number);
    }).not.toThrow();
  });
});
