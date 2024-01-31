import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './feature/profile/profile.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { HotelListComponent } from './feature/hotel-list/hotel-list.component';
import { HomeComponent } from './feature/home/home.component';
import { EditHotelComponent } from './feature/edit-hotel/edit-hotel.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'hotels',
    component: HotelListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-hotel',
    component: EditHotelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-hotel/:id',
    component: EditHotelComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
