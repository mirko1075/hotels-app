import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './feature/profile/profile.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { HotelListComponent } from './feature/hotel-list/hotel-list.component';
import { HotelCardComponent } from './core/components/hotel-card/hotel-card.component';
import { EditHotelComponent } from './feature/edit-hotel/edit-hotel.component';
import { HotelSearchComponent } from './core/components/hotel-search/hotel-search.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    NavbarComponent,
    HotelListComponent,
    HotelCardComponent,
    EditHotelComponent,
    HotelSearchComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: environment.auth0.authorizationParams,
    }),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
