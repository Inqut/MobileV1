import { EventData, Page } from '@nativescript/core';
import { SocialDashboardViewModel } from './social-dashboard-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new SocialDashboardViewModel();
}