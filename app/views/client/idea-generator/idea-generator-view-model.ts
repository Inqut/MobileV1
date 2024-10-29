import { Observable } from '@nativescript/core';
import { aiService } from '../../../services/ai.service';
import { navigationService } from '../../../services/navigation.service';

interface Suggestion {
    text: string;
    liked: boolean;
}

interface ReferenceImage {
    url: string;
}

interface RecommendedArtist {
    id: string;
    name: string;
    profileImage: string;
    specialties: string;
}

export class IdeaGeneratorViewModel extends Observable {
    private _prompt: string = '';
    private _refinementFeedback: string = '';
    private _isLoading: boolean = false;
    private _suggestions: Suggestion[] = [];
    private _referenceImages: ReferenceImage[] = [];
    private _recommendedArtists: RecommendedArtist[] = [];

    constructor() {
        super();
    }

    async onGenerateIdeas() {
        if (!this._prompt) return;

        this._isLoading = true;
        this.notifyPropertyChange('isLoading', true);

        try {
            const response = await aiService.generateIdeas(this._prompt);
            
            this._suggestions = response.suggestions.map(text => ({ text, liked: false }));
            this._referenceImages = response.referenceImages.map(url => ({ url }));
            
            // Mock artist data - replace with actual artist fetching
            this._recommendedArtists = [
                {
                    id: '1',
                    name: 'John Doe',
                    profileImage: 'res://profile_placeholder',
                    specialties: 'Traditional, Japanese'
                },
                {
                    id: '2',
                    name: 'Jane Smith',
                    profileImage: 'res://profile_placeholder',
                    specialties: 'Watercolor, Minimalist'
                }
            ];

            this.notifyPropertyChange('suggestions', this._suggestions);
            this.notifyPropertyChange('referenceImages', this._referenceImages);
            this.notifyPropertyChange('recommendedArtists', this._recommendedArtists);
        } catch (error) {
            console.error('Failed to generate ideas:', error);
            // TODO: Show error dialog
        } finally {
            this._isLoading = false;
            this.notifyPropertyChange('isLoading', false);
        }
    }

    async onRefineIdea() {
        if (!this._refinementFeedback) return;

        this._isLoading = true;
        this.notifyPropertyChange('isLoading', true);

        try {
            const response = await aiService.refineIdea(this._prompt, this._refinementFeedback);
            
            // Update suggestions with refined ideas
            this._suggestions = response.suggestions.map(text => ({ text, liked: false }));
            this._referenceImages = response.referenceImages.map(url => ({ url }));

            this.notifyPropertyChange('suggestions', this._suggestions);
            this.notifyPropertyChange('referenceImages', this._referenceImages);

            // Clear refinement feedback
            this._refinementFeedback = '';
            this.notifyPropertyChange('refinementFeedback', '');
        } catch (error) {
            console.error('Failed to refine idea:', error);
            // TODO: Show error dialog
        } finally {
            this._isLoading = false;
            this.notifyPropertyChange('isLoading', false);
        }
    }

    onLikeSuggestion(args: any) {
        const index = args.index;
        this._suggestions[index].liked = !this._suggestions[index].liked;
        this.notifyPropertyChange('suggestions', this._suggestions);
    }

    onViewArtist(args: any) {
        const artist = this._recommendedArtists[args.index];
        navigationService.navigate('views/client/artists/artist-profile-page', { artistId: artist.id });
    }

    // Getters and setters
    get prompt(): string {
        return this._prompt;
    }
    set prompt(value: string) {
        if (this._prompt !== value) {
            this._prompt = value;
            this.notifyPropertyChange('prompt', value);
        }
    }

    get refinementFeedback(): string {
        return this._refinementFeedback;
    }
    set refinementFeedback(value: string) {
        if (this._refinementFeedback !== value) {
            this._refinementFeedback = value;
            this.notifyPropertyChange('refinementFeedback', value);
        }
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    get suggestions(): Suggestion[] {
        return this._suggestions;
    }

    get referenceImages(): ReferenceImage[] {
        return this._referenceImages;
    }

    get recommendedArtists(): RecommendedArtist[] {
        return this._recommendedArtists;
    }
}