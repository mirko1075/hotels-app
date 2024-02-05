import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelSearchComponent } from './hotel-search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HotelSearchComponent', () => {
  let component: HotelSearchComponent;
  let fixture: ComponentFixture<HotelSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelSearchComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HotelSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search text when searchHotels is called', () => {
    const searchText = 'example search text';
    const emitSpy = jest.spyOn(component.sendText, 'emit');

    component.searchText = searchText;
    component.searchHotels();

    expect(emitSpy).toHaveBeenCalledWith(searchText);
  });

  it('should clear search text when clearSearch is called', () => {
    const searchText = 'example search text';

    component.searchText = searchText;
    component.clearSearch();

    expect(component.searchText).toBe('');
  });
});
