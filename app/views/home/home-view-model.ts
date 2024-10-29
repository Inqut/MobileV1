import { Observable } from '@nativescript/core';

export class HomeViewModel extends Observable {
    private _appointments: any[];
    private _featuredArtists: any[];

    constructor() {
        super();
        
        // Mock data
        this._appointments = [
            { date: '2024-03-20', artistName: 'John Doe', time: '14:00' },
            { date: '2024-03-25', artistName: 'Jane Smith', time: '15:30' }
        ];

        this._featuredArtists = [
            { name: 'Mike Wilson', profileImage: 'res://profile_placeholder' },
            { name: 'Sarah Johnson', profileImage: 'res://profile_placeholder' },
            { name: 'David Brown', profileImage: 'res://profile_placeholder' }
        ];
    }

    get appointments(): any[] {
        return this._appointments;
    }

    get featuredArtists(): any[] {
        return this._featuredArtists;
    }

    onNotificationsTap() {
        // TODO: Implement notifications view
        console.log('Notifications tapped');
    }
}