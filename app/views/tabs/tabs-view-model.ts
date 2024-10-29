import { Observable, Application } from '@nativescript/core';

export class TabsViewModel extends Observable {
    private _selectedIndex: number;
    private _isLoading: boolean;
    private _resumeHandler: any;
    private _suspendHandler: any;

    constructor() {
        super();
        this._selectedIndex = 0;
        this._isLoading = false;
        this.initializeViewModel();
    }

    private initializeViewModel() {
        try {
            this.setupEventListeners();
            this.setupApplicationHandlers();
        } catch (error) {
            console.error('Error initializing TabsViewModel:', error);
        }
    }

    private setupEventListeners() {
        // Add any view-specific event listeners here
    }

    private setupApplicationHandlers() {
        // Handle application resume
        this._resumeHandler = () => {
            console.log('TabsViewModel: Application resumed');
            this.refreshCurrentTab();
        };

        // Handle application suspend
        this._suspendHandler = () => {
            console.log('TabsViewModel: Application suspended');
            this.saveState();
        };

        Application.on(Application.resumeEvent, this._resumeHandler);
        Application.on(Application.suspendEvent, this._suspendHandler);
    }

    private refreshCurrentTab() {
        try {
            // Refresh the current tab's content
            this.notifyPropertyChange('selectedIndex', this._selectedIndex);
        } catch (error) {
            console.error('Error refreshing current tab:', error);
        }
    }

    private saveState() {
        try {
            // Save any necessary state
            Application.setResource('lastTabIndex', this._selectedIndex);
        } catch (error) {
            console.error('Error saving state:', error);
        }
    }

    // Public methods
    public onTabSelected(index: number) {
        try {
            if (this._selectedIndex !== index) {
                this._selectedIndex = index;
                this.notifyPropertyChange('selectedIndex', index);
            }
        } catch (error) {
            console.error('Error selecting tab:', error);
        }
    }

    // Getters and setters
    get selectedIndex(): number {
        return this._selectedIndex;
    }

    set selectedIndex(value: number) {
        if (this._selectedIndex !== value) {
            this._selectedIndex = value;
            this.notifyPropertyChange('selectedIndex', value);
        }
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this._isLoading !== value) {
            this._isLoading = value;
            this.notifyPropertyChange('isLoading', value);
        }
    }

    // Cleanup
    public cleanup() {
        try {
            // Remove application event handlers
            if (this._resumeHandler) {
                Application.off(Application.resumeEvent, this._resumeHandler);
            }
            if (this._suspendHandler) {
                Application.off(Application.suspendEvent, this._suspendHandler);
            }

            // Save state before cleanup
            this.saveState();
        } catch (error) {
            console.error('Error cleaning up TabsViewModel:', error);
        }
    }
}