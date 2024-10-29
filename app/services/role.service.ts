import { Observable } from '@nativescript/core';
import { UserRole } from '../models/user.model';

class RoleService extends Observable {
    private static instance: RoleService;
    private _currentUserRole: UserRole | null = null;

    private constructor() {
        super();
    }

    static getInstance(): RoleService {
        if (!RoleService.instance) {
            RoleService.instance = new RoleService();
        }
        return RoleService.instance;
    }

    setUserRole(role: UserRole) {
        this._currentUserRole = role;
        this.notifyPropertyChange('currentUserRole', role);
    }

    get currentUserRole(): UserRole | null {
        return this._currentUserRole;
    }

    hasPermission(permission: string): boolean {
        const rolePermissions = {
            [UserRole.CLIENT]: ['view_artists', 'book_appointments', 'message_artists', 'view_designs'],
            [UserRole.ARTIST]: ['manage_portfolio', 'manage_availability', 'message_clients', 'upload_designs'],
            [UserRole.STUDIO]: ['manage_artists', 'manage_studio', 'view_analytics', 'manage_bookings']
        };

        return this._currentUserRole ? 
            rolePermissions[this._currentUserRole].includes(permission) : 
            false;
    }
}

export const roleService = RoleService.getInstance();