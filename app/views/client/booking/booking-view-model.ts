import { Observable } from '@nativescript/core';
import { navigationService } from '../../../services/navigation.service';
import { bookingService } from '../../../services/booking.service';

export class BookingViewModel extends Observable {
    private _currentStep: number = 1;
    private _searchQuery: string = '';
    private _selectedArtist: any = null;
    private _selectedService: any = null;
    private _selectedDate: Date = new Date();
    private _selectedTimeSlot: string = '';
    private _showSummary: boolean = false;

    private _availableArtists: any[] = [
        {
            id: '1',
            name: 'John Doe',
            profileImage: 'res://profile_placeholder',
            specialties: 'Traditional, Japanese',
            rating: 4.8
        },
        {
            id: '2',
            name: 'Jane Smith',
            profileImage: 'res://profile_placeholder',
            specialties: 'Watercolor, Minimalist',
            rating: 4.9
        }
    ];

    private _availableServices: any[] = [
        {
            id: '1',
            name: 'Small Tattoo',
            duration: '1-2 hours',
            price: 150
        },
        {
            id: '2',
            name: 'Medium Tattoo',
            duration: '2-4 hours',
            price: 300
        },
        {
            id: '3',
            name: 'Large Tattoo',
            duration: '4+ hours',
            price: 500
        }
    ];

    private _availableTimeSlots: any[] = [
        { time: '10:00 AM', available: true },
        { time: '11:00 AM', available: false },
        { time: '12:00 PM', available: true },
        { time: '2:00 PM', available: true },
        { time: '3:00 PM', available: true }
    ];

    constructor() {
        super();
    }

    async onArtistSelect(args: any) {
        const artist = this._availableArtists[args.index];
        this._selectedArtist = artist;
        this._currentStep = 2;
        this.notifyPropertyChange('currentStep', this._currentStep);
        this.notifyPropertyChange('selectedArtist', this._selectedArtist);
    }

    async onServiceSelect(args: any) {
        const service = this._availableServices[args.index];
        this._selectedService = service;
        this._currentStep = 3;
        this.notifyPropertyChange('currentStep', this._currentStep);
        this.notifyPropertyChange('selectedService', this._selectedService);
    }

    async onTimeSlotSelect(args: any) {
        const timeSlot = this._availableTimeSlots[args.index];
        if (timeSlot.available) {
            this._selectedTimeSlot = timeSlot.time;
            this._showSummary = true;
            this.notifyPropertyChange('selectedTimeSlot', this._selectedTimeSlot);
            this.notifyPropertyChange('showSummary', this._showSummary);
        }
    }

    async onNext() {
        if (this._currentStep === 3 && this._selectedTimeSlot) {
            // Create booking
            try {
                await bookingService.createBooking({
                    artistId: this._selectedArtist.id,
                    serviceId: this._selectedService.id,
                    date: this._selectedDate,
                    timeSlot: this._selectedTimeSlot
                });
                
                // Navigate to confirmation page
                navigationService.navigate('views/client/booking/booking-confirmation-page', {
                    booking: {
                        artist: this._selectedArtist,
                        service: this._selectedService,
                        date: this._selectedDate,
                        timeSlot: this._selectedTimeSlot
                    }
                });
            } catch (error) {
                console.error('Booking failed:', error);
                // Show error dialog
            }
        }
    }

    onBack() {
        if (this._currentStep > 1) {
            this._currentStep--;
            this._showSummary = false;
            this.notifyPropertyChange('currentStep', this._currentStep);
            this.notifyPropertyChange('showSummary', this._showSummary);
        }
    }

    // Getters
    get currentStep(): number {
        return this._currentStep;
    }

    get searchQuery(): string {
        return this._searchQuery;
    }

    get availableArtists(): any[] {
        return this._availableArtists;
    }

    get availableServices(): any[] {
        return this._availableServices;
    }

    get availableTimeSlots(): any[] {
        return this._availableTimeSlots;
    }

    get selectedArtist(): any {
        return this._selectedArtist;
    }

    get selectedService(): any {
        return this._selectedService;
    }

    get selectedDate(): Date {
        return this._selectedDate;
    }

    get selectedTimeSlot(): string {
        return this._selectedTimeSlot;
    }

    get showSummary(): boolean {
        return this._showSummary;
    }

    get formattedDate(): string {
        return this._selectedDate.toLocaleDateString();
    }
}