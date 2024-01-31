import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  navbarCollapsed = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService
  ) {
    this.isAuthenticated = false;
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(
      (auth) => (this.isAuthenticated = auth)
    );
  }

  public signOut(): void {
    this.authService.logout({
      openUrl(url) {
        window.location.replace(url);
      },
    });
  }

  public signIn(): void {
    this.authService.loginWithRedirect();
  }

  public toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
}
