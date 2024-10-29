import { EventData, Page, Frame, Application } from '@nativescript/core';
import { TabsViewModel } from './tabs-view-model';

let viewModel: TabsViewModel | null = null;

export function onNavigatingTo(args: EventData) {
    try {
        const page = <Page>args.object;
        if (!viewModel) {
            viewModel = new TabsViewModel();
        }
        page.bindingContext = viewModel;
    } catch (error) {
        console.error('Error in tabs page navigation:', error);
    }
}

export function onLoaded(args: EventData) {
    try {
        const page = <Page>args.object;
        if (!page.bindingContext) {
            if (!viewModel) {
                viewModel = new TabsViewModel();
            }
            page.bindingContext = viewModel;
        }
    } catch (error) {
        console.error('Error in tabs page load:', error);
    }
}

export function onUnloaded(args: EventData) {
    try {
        // Keep the viewModel instance but clean up any resources
        if (viewModel) {
            viewModel.cleanup();
        }
    } catch (error) {
        console.error('Error in tabs page unload:', error);
    }
}

// Handle back button
Application.android?.on(AndroidApplication.activityBackPressedEvent, (data: any) => {
    if (viewModel && viewModel.selectedIndex !== 0) {
        // If not on home tab, go to home tab
        viewModel.selectedIndex = 0;
        data.cancel = true;
    }
});