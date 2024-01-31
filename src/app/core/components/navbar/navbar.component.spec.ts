import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

const authServiceStub = {
  logout: jest.fn(),
  loginWithRedirect: jest.fn(),
  isAuthenticated$: of(false),
};

const windowStub = {
  location: {
    replace: jest.fn(),
  },
};
describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: window, useValue: windowStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to authService.isAuthenticated$ and update isAuthenticated', () => {
    component.ngOnInit();
    expect(component.isAuthenticated).toBe(false);
  });

  it('should call authService.loginWithRedirect with openUrl function that replaces window location', () => {
    const spy = jest.spyOn(authServiceStub, 'loginWithRedirect');
    component.signIn();
    expect(spy).toHaveBeenCalled();
  });

  it('should update isAuthenticated when authService.isAuthenticated$ emits true', () => {
    authServiceStub.isAuthenticated$ = of(true);
    component.ngOnInit();
    expect(component.isAuthenticated).toBe(true);
  });

  it('should handle error when authService.logout throws an error', () => {
    jest
      .spyOn(authServiceStub, 'logout')
      .mockRejectedValue(new Error('Logout error'));
    expect(() => component.signOut()).not.toThrow();
  });

  it('should not call window.location.replace when openUrl function is not provided', () => {
    component.signOut();

    expect(windowStub.location.replace).not.toHaveBeenCalled();
  });

  it('should set navbarCollapsed to false when it is true', () => {
    component.navbarCollapsed = true;
    component.toggleNavbarCollapsing();
    expect(component.navbarCollapsed).toBe(false);
  });
});
