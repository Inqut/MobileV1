import { Observable } from '@nativescript/core';

export interface TattooDesign {
    id: string;
    artistId: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    style: string;
    tags: string[];
    likes: number;
    isCustomizable: boolean;
    createdAt: Date;
    dimensions?: {
        width: number;
        height: number;
        unit: 'inches' | 'cm'
    };
    colorPalette?: string[];
    estimatedTime?: number;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    placement?: string[];
}

export interface FilterOptions {
    style?: string;
    priceRange?: { min: number; max: number };
    artistId?: string;
    tags?: string[];
    placement?: string[];
    difficulty?: string;
    sortBy?: 'price' | 'likes' | 'newest';
}

class MarketplaceService extends Observable {
    private static instance: MarketplaceService;
    private _favorites: Set<string> = new Set();

    private constructor() {
        super();
    }

    static getInstance(): MarketplaceService {
        if (!MarketplaceService.instance) {
            MarketplaceService.instance = new MarketplaceService();
        }
        return MarketplaceService.instance;
    }

    async getDesigns(filters?: FilterOptions): Promise<TattooDesign[]> {
        try {
            // TODO: Replace with actual API call
            return [
                {
                    id: '1',
                    artistId: '1',
                    title: 'Japanese Dragon',
                    description: 'Traditional Japanese dragon design with cherry blossoms',
                    price: 250,
                    imageUrl: 'res://design_1',
                    style: 'Japanese',
                    tags: ['dragon', 'traditional', 'color'],
                    likes: 124,
                    isCustomizable: true,
                    createdAt: new Date(),
                    dimensions: { width: 8, height: 12, unit: 'inches' },
                    colorPalette: ['#FF0000', '#000000', '#FFB6C1'],
                    estimatedTime: 180,
                    difficulty: 'advanced',
                    placement: ['arm', 'back']
                },
                {
                    id: '2',
                    artistId: '2',
                    title: 'Geometric Wolf',
                    description: 'Modern geometric wolf design',
                    price: 180,
                    imageUrl: 'res://design_2',
                    style: 'Geometric',
                    tags: ['wolf', 'geometric', 'blackwork'],
                    likes: 98,
                    isCustomizable: true,
                    createdAt: new Date(),
                    dimensions: { width: 6, height: 6, unit: 'inches' },
                    colorPalette: ['#000000'],
                    estimatedTime: 120,
                    difficulty: 'intermediate',
                    placement: ['arm', 'leg', 'chest']
                }
            ];
        } catch (error) {
            console.error('Failed to fetch designs:', error);
            throw error;
        }
    }

    async getDesignById(id: string): Promise<TattooDesign | null> {
        try {
            const designs = await this.getDesigns();
            return designs.find(design => design.id === id) || null;
        } catch (error) {
            console.error('Failed to fetch design:', error);
            throw error;
        }
    }

    async purchaseDesign(designId: string): Promise<{ success: boolean; orderId?: string }> {
        try {
            // TODO: Implement actual purchase logic
            return {
                success: true,
                orderId: Math.random().toString(36).substr(2, 9)
            };
        } catch (error) {
            console.error('Failed to purchase design:', error);
            throw error;
        }
    }

    async toggleFavorite(designId: string): Promise<boolean> {
        try {
            if (this._favorites.has(designId)) {
                this._favorites.delete(designId);
                return false;
            } else {
                this._favorites.add(designId);
                return true;
            }
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
            throw error;
        }
    }

    isFavorite(designId: string): boolean {
        return this._favorites.has(designId);
    }

    async getFavorites(): Promise<TattooDesign[]> {
        try {
            const designs = await this.getDesigns();
            return designs.filter(design => this._favorites.has(design.id));
        } catch (error) {
            console.error('Failed to fetch favorites:', error);
            throw error;
        }
    }
}

export const marketplaceService = MarketplaceService.getInstance();