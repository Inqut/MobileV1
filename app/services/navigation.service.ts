import { Frame } from '@nativescript/core';

class NavigationService {
    private static instance: NavigationService;

    private constructor() {}

    static getInstance(): NavigationService {
        if (!NavigationService.instance) {
            NavigationService.instance = new NavigationService();
        }
        return NavigationService.instance;
    }

    navigate(page: string, context?: any) {
        const frame = Frame.topmost();
        frame.navigate({
            moduleName: page,
            context: context,
            clearHistory: true
        });
    }

    goBack() {
        const frame = Frame.topmost();
        frame.goBack();
    }
}

export const navigationService = NavigationService.getInstance();