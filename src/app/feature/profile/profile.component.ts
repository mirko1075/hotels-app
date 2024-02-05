import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: any;
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {
    this.user = {};
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe((success: any) => {
      this.user = success;
    });
  }
}
