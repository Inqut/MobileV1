import { Observable } from '@nativescript/core';
import { navigationService } from '../../../services/navigation.service';

export class BookingConfirmationViewModel extends Observable {
    private _booking: any;

    constructor(booking: any) {
        super();
        this._booking = booking;
    }

    onViewBookings() {
        navigationService.navigate('views/client/bookings/bookings-page');
    }

    onBackToHome() {
        navigationService.navigate('views/client/dashboard/client-dashboard-page');
    }

    get booking(): any {
        return this._booking;
    }

    get formattedDate(): string {
        return new Date(this._booking.date).toLocaleDateString();
    }
}