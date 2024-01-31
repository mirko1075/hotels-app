import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditHotelComponent } from './edit-hotel.component';
import { HotelService } from 'src/app/core/services/hotels.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const authServiceStub = {
  logout: jest.fn(),
};

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

const hotelServiceStub = {
  hotels: [],
  getHotelById: jest.fn().mockReturnValue(hotelMock),
  getHotels: jest.fn().mockReturnValue([hotelMock]),
  updateHotel: () => null,
};

const routeParams = {
  snapshot: {
    paramMap: {
      get: jest.fn(),
    },
  },
};

const routerStub = {
  navigate: jest.fn(),
};

describe('EditHotelComponent', () => {
  let component: EditHotelComponent;
  let fixture: ComponentFixture<EditHotelComponent>;
  const mElement = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditHotelComponent],
      imports: [BrowserModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        FormsModule,
        { provide: HotelService, useValue: hotelServiceStub },
        { provide: ActivatedRoute, useValue: routeParams },
        { provide: Router, useValue: routerStub },
        { provide: AuthService, useValue: authServiceStub },
        {
          provide: 'auth0.client',
          useValue: {
            domain: 'dev-38qceg6kcjuno4ng.us.auth0.com',
            clientId: 'MHliV86XQiLmNyI9FFRgXpOfJcGOZgJN',
            authorizationParams: {
              redirect_uri: '',
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHotelComponent);
    component = fixture.componentInstance;
    component.hotel = hotelMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set hotelId to the id from the route parameter when OnInit is called', () => {
    component.ngOnInit();
    expect(component.hotelId).toBeNaN();
  });

  it('should set hotel to the hotel with the id from the hotelService when OnInit is called', () => {
    component.ngOnInit();
    expect(component.hotel).toEqual({
      category: 4,
      id: 1,
      imageUrl:
        'https://media.istockphoto.com/id/104731717/es/foto/complejo-tur%C3%ADstico-de-lujo.jpg?s=2048x2048&w=is&k=20&c=QRLnvUZi6xp9xgss6e6IMg5Gv5g2iosfFzPR9DyS__g=',
      location: 'Madrid',
      name: 'Hotel A',
      price: 100,
      rating: 4,
      vacational: true,
    });
  });

  it('should update the hotel using the hotelService when saveChanges is called', () => {
    const spy = jest.spyOn(hotelServiceStub, 'updateHotel');
    component.hotel = { id: 1, name: 'Hotel A' };
    component.saveChanges();
    expect(spy).toHaveBeenCalledWith({
      id: 1,
      name: 'Hotel A',
    });
  });

  it('should set hotelId to -1 when it is not a number', () => {
    component.hotelId = NaN;
    component.ngOnInit();
    expect(component.hotelId).toBeNaN();
  });

  it('should set hotel to undefined when the hotel with the given id does not exist in the hotelService', () => {
    jest.spyOn(hotelServiceStub, 'getHotelById').mockReturnValueOnce(null);
    component.ngOnInit();
    expect(component.hotel).toBeNull();
  });
});
