import { EventData, Page } from '@nativescript/core';
import { ArtistDashboardViewModel } from './artist-dashboard-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new ArtistDashboardViewModel();
}