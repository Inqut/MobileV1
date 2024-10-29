import { Observable } from '@nativescript/core';
import { socialService, SocialPost } from '../../services/social.service';
import { navigationService } from '../../services/navigation.service';

export class SocialDashboardViewModel extends Observable {
    private _selectedTabIndex: number = 0;
    private _isLoading: boolean = false;
    private _scheduledPosts: SocialPost[] = [];
    private _publishedPosts: SocialPost[] = [];
    private _topPosts: SocialPost[] = [];
    private _totalLikes: number = 0;
    private _totalComments: number = 0;
    private _totalShares: number = 0;

    constructor() {
        super();
        this.loadPosts();
    }

    async loadPosts() {
        this._isLoading = true;
        this.notifyPropertyChange('isLoading', true);

        try {
            // Load scheduled posts
            this._scheduledPosts = await socialService.getPosts('scheduled');
            this.notifyPropertyChange('scheduledPosts', this._scheduledPosts);

            // Load published posts
            this._publishedPosts = await socialService.getPosts('published');
            this.notifyPropertyChange('publishedPosts', this._publishedPosts);

            // Calculate analytics
            this.calculateAnalytics();
        } catch (error) {
            console.error('Failed to load posts:', error);
            // TODO: Show error dialog
        } finally {
            this._isLoading = false;
            this.notifyPropertyChange('isLoading', false);
        }
    }

    private calculateAnalytics() {
        this._totalLikes = this._publishedPosts.reduce((sum, post) => sum + post.engagement.likes, 0);
        this._totalComments = this._publishedPosts.reduce((sum, post) => sum + post.engagement.comments, 0);
        this._totalShares = this._publishedPosts.reduce((sum, post) => sum + post.engagement.shares, 0);

        // Sort posts by engagement and get top 5
        this._topPosts = [...this._publishedPosts]
            .sort((a, b) => {
                const engagementA = a.engagement.likes + a.engagement.comments + a.engagement.shares;
                const engagementB = b.engagement.likes + b.engagement.comments + b.engagement.shares;
                return engagementB - engagementA;
            })
            .slice(0, 5);

        this.notifyPropertyChange('totalLikes', this._totalLikes);
        this.notifyPropertyChange('totalComments', this._totalComments);
        this.notifyPropertyChange('totalShares', this._totalShares);
        this.notifyPropertyChange('topPosts', this._topPosts);
    }

    onCreatePost() {
        navigationService.navigate('views/social/create-post-page');
    }

    onPostOptions(args: any) {
        const post = this._scheduledPosts[args.index];
        // TODO: Show options dialog (edit, delete, etc.)
        console.log('Post options:', post.id);
    }

    // Getters
    get selectedTabIndex(): number {
        return this._selectedTabIndex;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    get scheduledPosts(): SocialPost[] {
        return this._scheduledPosts;
    }

    get publishedPosts(): SocialPost[] {
        return this._publishedPosts;
    }

    get topPosts(): SocialPost[] {
        return this._topPosts;
    }

    get totalLikes(): number {
        return this._totalLikes;
    }

    get totalComments(): number {
        return this._totalComments;
    }

    get totalShares(): number {
        return this._totalShares;
    }
}