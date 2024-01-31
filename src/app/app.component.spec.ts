import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authServiceStub: Partial<AuthService>;
  const mElement = {};

  beforeEach(async () => {
    authServiceStub = {
      isAuthenticated$: new BehaviorSubject<boolean>(false),
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: AuthService, useValue: authServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with isAuthenticated set to false', () => {
    expect(component.isAuthenticated).toBe(false);
  });

  it('should subscribe to isAuthenticated$ observable in ngOnInit', () => {
    const authService = TestBed.inject(AuthService);
    const spySubscribe = jest.spyOn(authService.isAuthenticated$, 'subscribe');

    component.ngOnInit();

    expect(spySubscribe).toHaveBeenCalled();
  });

  it('should update isAuthenticated on successful subscription', () => {
    const authService = TestBed.inject(AuthService);
    const isAuthenticated$ =
      authService.isAuthenticated$ as BehaviorSubject<boolean>;
    const expectedValue = true;

    component.ngOnInit();
    isAuthenticated$.next(expectedValue);

    expect(component.isAuthenticated).toBe(expectedValue);
  });

  it('should update isAuthenticated on multiple subscription events', () => {
    const authService = TestBed.inject(AuthService);
    const isAuthenticated$ =
      authService.isAuthenticated$ as BehaviorSubject<boolean>;

    component.ngOnInit();
    isAuthenticated$.next(true);
    isAuthenticated$.next(false);
    isAuthenticated$.next(true);

    expect(component.isAuthenticated).toBe(true);
  });

  it('should not update isAuthenticated on error in subscription', () => {
    const authService = TestBed.inject(AuthService);
    const isAuthenticated$ =
      authService.isAuthenticated$ as BehaviorSubject<boolean>;
    const consoleErrorSpy = jest.spyOn(console, 'error');

    component.ngOnInit();
    isAuthenticated$.error('Test error');

    expect(component.isAuthenticated).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Test error');
  });
});
