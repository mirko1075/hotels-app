import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Hotel, HotelImpl } from 'src/app/core/models/hotel.model';
import { HotelService } from 'src/app/core/services/hotels.service';
@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.scss'],
})
export class EditHotelComponent implements OnInit, OnDestroy {
  hotelId: number = -1;
  hotel: Hotel = new HotelImpl(-1, '', '', 0, 0, 0);
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.hotelId = Number(this.route.snapshot.paramMap.get('id'));

    this.subscription = this.hotelService
      .getHotelById(this.hotelId)
      .subscribe((hotel) => {
        if (hotel) this.hotel = hotel;
      });
  }

  saveChanges() {
    if (this.hotelId && this.hotelId > 0)
      this.subscription.add(
        this.hotelService.updateHotel(this.hotel).subscribe()
      );
    else
      this.subscription.add(this.hotelService.addHotel(this.hotel).subscribe());
    this.cdr.detectChanges();
    this.router.navigate(['/hotels']);
  }
}
