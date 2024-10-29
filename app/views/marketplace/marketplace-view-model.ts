import { Observable } from '@nativescript/core';
import { marketplaceService, TattooDesign, FilterOptions } from '../../services/marketplace.service';
import { navigationService } from '../../services/navigation.service';

export class MarketplaceViewModel extends Observable {
    private _searchQuery: string = '';
    private _designs: TattooDesign[] = [];
    private _isLoading: boolean = false;
    private _filters: FilterOptions = {
        priceRange: { min: 0, max: 1000 },
        sortBy: 'newest'
    };
    private _showFilters: boolean = false;
    private _styles: string[] = ['Traditional', 'Japanese', 'Geometric', 'Watercolor', 'Blackwork', 'Minimalist'];
    private _placements: string[] = ['Arm', 'Leg', 'Back', 'Chest', 'Shoulder', 'Hand'];

    constructor() {
        super();
        this.loadDesigns();
    }

    async loadDesigns() {
        this._isLoading = true;
        this.notifyPropertyChange('isLoading', true);

        try {
            this._designs = await marketplaceService.getDesigns(this._filters);
            if (this._searchQuery) {
                this._designs = this._designs.filter(design => 
                    design.title.toLowerCase().includes(this._searchQuery.toLowerCase()) ||
                    design.tags.some(tag => tag.toLowerCase().includes(this._searchQuery.toLowerCase()))
                );
            }
            this.notifyPropertyChange('designs', this._designs);
        } catch (error) {
            console.error('Failed to load designs:', error);
            // TODO: Show error dialog
        } finally {
            this._isLoading = false;
            this.notifyPropertyChange('isLoading', false);
        }
    }

    onSearch() {
        this.loadDesigns();
    }

    onClearSearch() {
        this._searchQuery = '';
        this.notifyPropertyChange('searchQuery', '');
        this.loadDesigns();
    }

    onShowFilters() {
        this._showFilters = !this._showFilters;
        this.notifyPropertyChange('showFilters', this._showFilters);
    }

    onFilterApply() {
        this._showFilters = false;
        this.notifyPropertyChange('showFilters', false);
        this.loadDesigns();
    }

    onDesignTap(args: any) {
        const design = this._designs[args.index];
        navigationService.navigate('views/marketplace/design-detail-page', { designId: design.id });
    }

    onStyleSelect(style: string) {
        this._filters.style = this._filters.style === style ? undefined : style;
        this.notifyPropertyChange('filters', this._filters);
    }

    onPlacementSelect(placement: string) {
        if (!this._filters.placement) {
            this._filters.placement = [];
        }
        const index = this._filters.placement.indexOf(placement);
        if (index > -1) {
            this._filters.placement.splice(index, 1);
        } else {
            this._filters.placement.push(placement);
        }
        this.notifyPropertyChange('filters', this._filters);
    }

    onSortChange(sortBy: 'price' | 'likes' | 'newest') {
        this._filters.sortBy = sortBy;
        this.notifyPropertyChange('filters', this._filters);
        this.loadDesigns();
    }

    // Getters
    get searchQuery(): string {
        return this._searchQuery;
    }
    set searchQuery(value: string) {
        if (this._searchQuery !== value) {
            this._searchQuery = value;
            this.notifyPropertyChange('searchQuery', value);
        }
    }

    get designs(): TattooDesign[] {
        return this._designs;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    get showFilters(): boolean {
        return this._showFilters;
    }

    get styles(): string[] {
        return this._styles;
    }

    get placements(): string[] {
        return this._placements;
    }

    get filters(): FilterOptions {
        return this._filters;
    }

    get selectedStyle(): string | undefined {
        return this._filters.style;
    }

    get selectedPlacements(): string[] {
        return this._filters.placement || [];
    }

    get sortBy(): string {
        return this._filters.sortBy || 'newest';
    }
}