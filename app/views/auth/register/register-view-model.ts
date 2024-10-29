import { Observable } from '@nativescript/core';
import { UserRole } from '../../../models/user.model';
import { roleService } from '../../../services/role.service';
import { navigationService } from '../../../services/navigation.service';

export class RegisterViewModel extends Observable {
    private _selectedRole: UserRole | null = null;
    private _email: string = '';
    private _password: string = '';
    private _displayName: string = '';
    private _tattooStyles: Array<{ name: string; selected: boolean }> = [
        { name: 'Traditional', selected: false },
        { name: 'Neo-Traditional', selected: false },
        { name: 'Japanese', selected: false },
        { name: 'Blackwork', selected: false },
        { name: 'Realism', selected: false },
        { name: 'Watercolor', selected: false }
    ];

    // Artist specific fields
    private _experience: string = '';
    private _specialties: string = '';

    // Studio specific fields
    private _businessName: string = '';
    private _address: string = '';
    private _city: string = '';
    private _state: string = '';

    constructor() {
        super();
    }

    onRoleSelect(args: any) {
        const button = args.object;
        this._selectedRole = button.data.role as UserRole;
        this.notifyPropertyChange('selectedRole', this._selectedRole);
    }

    async onRegister() {
        if (!this._selectedRole || !this._email || !this._password) {
            // Show error
            return;
        }

        try {
            const userData = this.buildUserData();
            // TODO: Implement actual registration
            roleService.setUserRole(this._selectedRole);
            
            // Navigate to appropriate dashboard based on role
            switch (this._selectedRole) {
                case UserRole.CLIENT:
                    navigationService.navigate('views/client/dashboard/client-dashboard-page');
                    break;
                case UserRole.ARTIST:
                    navigationService.navigate('views/artist/dashboard/artist-dashboard-page');
                    break;
                case UserRole.STUDIO:
                    navigationService.navigate('views/studio/dashboard/studio-dashboard-page');
                    break;
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }

    private buildUserData() {
        const baseData = {
            email: this._email,
            displayName: this._displayName,
            role: this._selectedRole
        };

        switch (this._selectedRole) {
            case UserRole.CLIENT:
                return {
                    ...baseData,
                    preferences: {
                        styles: this._tattooStyles
                            .filter(style => style.selected)
                            .map(style => style.name)
                    }
                };
            case UserRole.ARTIST:
                return {
                    ...baseData,
                    experience: parseInt(this._experience),
                    specialties: this._specialties.split(',').map(s => s.trim())
                };
            case UserRole.STUDIO:
                return {
                    ...baseData,
                    businessName: this._businessName,
                    location: {
                        address: this._address,
                        city: this._city,
                        state: this._state
                    }
                };
            default:
                return baseData;
        }
    }

    // Getters and setters for all properties
    get selectedRole(): UserRole | null {
        return this._selectedRole;
    }

    get email(): string {
        return this._email;
    }
    set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notifyPropertyChange('email', value);
        }
    }

    // ... Similar getters and setters for other properties
}