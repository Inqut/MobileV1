import { Observable } from '@nativescript/core';
import { navigationService } from '../../../services/navigation.service';
import authService from '../../../services/auth.service';

export class StudioDashboardViewModel extends Observable {
    private _welcomeMessage: string;
    private _studioStats: string;
    private _studioArtists: any[];
    private _todaySchedule: any[];
    private _recentReviews: any[];

    constructor() {
        super();

        const user = authService.currentUser;
        this._welcomeMessage = `Welcome back, ${user?.displayName || 'Studio'}`;
        this._studioStats = '8 artists · 12 appointments today';

        // Mock data
        this._studioArtists = [
            {
                name: 'John Doe',
                profileImage: 'res://profile_placeholder',
                specialties: 'Traditional, Japanese',
                bookingStatus: 'Booked'
            },
            {
                name: 'Jane Smith',
                profileImage: 'res://profile_placeholder',
                specialties: 'Watercolor, Minimalist',
                bookingStatus: 'Available'
            }
        ];

        this._todaySchedule = [
            {
                time: '10:00',
                clientName: 'Alice Johnson',
                artistName: 'John Doe',
                status: 'In Progress'
            },
            {
                time: '14:30',
                clientName: 'Bob Wilson',
                artistName: 'Jane Smith',
                status: 'Confirmed'
            }
        ];

        this._recentReviews = [
            {
                clientName: 'Sarah Parker',
                clientImage: 'res://profile_placeholder',
                rating: 5,
                review: 'Amazing experience! The studio is clean and professional.'
            },
            {
                clientName: 'Mike Thompson',
                clientImage: 'res://profile_placeholder',
                rating: 4,
                review: 'Great artists and atmosphere. Will definitely return.'
            }
        ];
    }

    // Quick Action Handlers
    onManageArtists() {
        navigationService.navigate('views/studio/artists/manage-artists-page');
    }

    onManageSchedule() {
        navigationService.navigate('views/studio/schedule/schedule-page');
    }

    onManageProfile() {
        navigationService.navigate('views/studio/profile/studio-profile-page');
    }

    onViewAnalytics() {
        navigationService.navigate('views/studio/analytics/analytics-page');
    }

    // Getters
    get welcomeMessage(): string {
        return this._welcomeMessage;
    }

    get studioStats(): string {
        return this._studioStats;
    }

    get studioArtists(): any[] {
        return this._studioArtists;
    }

    get todaySchedule(): any[] {
        return this._todaySchedule;
    }

    get recentReviews(): any[] {
        return this._recentReviews;
    }
}