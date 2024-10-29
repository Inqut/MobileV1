import { Observable } from '@nativescript/core';
import { navigationService } from '../../../services/navigation.service';
import authService from '../../../services/auth.service';

export class ArtistDashboardViewModel extends Observable {
    private _welcomeMessage: string;
    private _bookingStats: string;
    private _todayAppointments: any[];
    private _recentMessages: any[];

    constructor() {
        super();

        const user = authService.currentUser;
        this._welcomeMessage = `Welcome back, ${user?.displayName || 'Artist'}`;
        this._bookingStats = '5 appointments today';

        // Mock data
        this._todayAppointments = [
            { time: '14:00', clientName: 'Alice Johnson', status: 'Confirmed' },
            { time: '16:30', clientName: 'Bob Wilson', status: 'Pending' }
        ];

        this._recentMessages = [
            {
                clientName: 'Sarah Parker',
                clientImage: 'res://profile_placeholder',
                lastMessage: 'Looking forward to our session!',
                time: '10:30'
            },
            {
                clientName: 'Mike Thompson',
                clientImage: 'res://profile_placeholder',
                lastMessage: 'Can we discuss the design?',
                time: '09:15'
            }
        ];
    }

    // Quick Action Handlers
    onManagePortfolio() {
        navigationService.navigate('views/artist/portfolio/portfolio-page');
    }

    onManageSchedule() {
        navigationService.navigate('views/artist/schedule/schedule-page');
    }

    onUploadDesigns() {
        navigationService.navigate('views/artist/designs/upload-design-page');
    }

    onViewAnalytics() {
        navigationService.navigate('views/artist/analytics/analytics-page');
    }

    // Getters
    get welcomeMessage(): string {
        return this._welcomeMessage;
    }

    get bookingStats(): string {
        return this._bookingStats;
    }

    get todayAppointments(): any[] {
        return this._todayAppointments;
    }

    get recentMessages(): any[] {
        return this._recentMessages;
    }
}