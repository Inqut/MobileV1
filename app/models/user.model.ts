import { Observable } from '@nativescript/core';

export enum UserRole {
    CLIENT = 'client',
    ARTIST = 'artist',
    STUDIO = 'studio'
}

export interface UserProfile {
    id: string;
    email: string;
    role: UserRole;
    displayName: string;
    profileImage?: string;
    createdAt: Date;
}

export interface ClientProfile extends UserProfile {
    preferences: {
        styles: string[];
        preferredPlacements: string[];
    };
    tattooHistory: any[];
    favoriteArtists: string[];
}

export interface ArtistProfile extends UserProfile {
    studioId?: string;
    specialties: string[];
    experience: number;
    portfolio: any[];
    availability: any[];
    rating: number;
    verified: boolean;
}

export interface StudioProfile extends UserProfile {
    businessName: string;
    location: {
        address: string;
        city: string;
        state: string;
        country: string;
    };
    artists: string[];
    businessHours: any;
    verified: boolean;
}