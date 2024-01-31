import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService
  ) {
    this.isAuthenticated = false;
  }

  public ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe({
      next: (success: boolean) => {
        this.isAuthenticated = success;
      },
      error: (err) => console.error(err),
    });
  }
}
