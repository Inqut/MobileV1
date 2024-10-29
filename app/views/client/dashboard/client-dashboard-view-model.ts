import { Observable } from '@nativescript/core';
import { navigationService } from '../../../services/navigation.service';
import authService from '../../../services/auth.service';

export class ClientDashboardViewModel extends Observable {
    private _welcomeMessage: string;
    private _appointmentCount: string;
    private _upcomingAppointments: any[];
    private _savedDesigns: any[];

    constructor() {
        super();

        const user = authService.currentUser;
        this._welcomeMessage = `Welcome back, ${user?.displayName || 'Guest'}`;
        
        // Mock data
        this._appointmentCount = 'You have 2 upcoming appointments';
        this._upcomingAppointments = [
            { date: '2024-03-20', artistName: 'John Doe', time: '14:00' },
            { date: '2024-03-25', artistName: 'Jane Smith', time: '15:30' }
        ];
        this._savedDesigns = [
            { name: 'Dragon Design', imageUrl: 'res://design_placeholder' },
            { name: 'Flower Pattern', imageUrl: 'res://design_placeholder' },
            { name: 'Geometric', imageUrl: 'res://design_placeholder' }
        ];
    }

    // Quick Action Handlers
    onFindArtist() {
        navigationService.navigate('views/client/artists/artist-search-page');
    }

    onBookAppointment() {
        navigationService.navigate('views/client/booking/booking-page');
    }

    onViewGallery() {
        navigationService.navigate('views/client/gallery/gallery-page');
    }

    onViewFavorites() {
        navigationService.navigate('views/client/favorites/favorites-page');
    }

    // Getters
    get welcomeMessage(): string {
        return this._welcomeMessage;
    }

    get appointmentCount(): string {
        return this._appointmentCount;
    }

    get upcomingAppointments(): any[] {
        return this._upcomingAppointments;
    }

    get savedDesigns(): any[] {
        return this._savedDesigns;
    }
}