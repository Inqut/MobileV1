import { Observable } from '@nativescript/core';
import { UserRole, UserProfile } from '../models/user.model';
import { roleService } from './role.service';

class AuthService extends Observable {
    private _isAuthenticated: boolean = false;
    private _currentUser: UserProfile | null = null;

    constructor() {
        super();
    }

    async register(userData: any): Promise<boolean> {
        try {
            // TODO: Implement actual registration with backend
            this._isAuthenticated = true;
            this._currentUser = {
                id: Math.random().toString(36).substr(2, 9),
                email: userData.email,
                role: userData.role,
                displayName: userData.displayName,
                createdAt: new Date()
            };
            
            roleService.setUserRole(userData.role);
            this.notifyPropertyChange('currentUser', this._currentUser);
            return true;
        } catch (error) {
            console.error('Registration failed:', error);
            return false;
        }
    }

    async login(email: string, password: string): Promise<boolean> {
        try {
            // TODO: Implement actual authentication
            this._isAuthenticated = true;
            this._currentUser = {
                id: '1',
                email,
                role: UserRole.CLIENT,
                displayName: 'Test User',
                createdAt: new Date()
            };
            
            roleService.setUserRole(this._currentUser.role);
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    }

    async logout(): Promise<void> {
        this._isAuthenticated = false;
        this._currentUser = null;
        roleService.setUserRole(null);
    }

    get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    get currentUser(): UserProfile | null {
        return this._currentUser;
    }
}

const authService = new AuthService();

export function initializeAuth() {
    return authService;
}

export default authService;