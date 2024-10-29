import { EventData, Page } from '@nativescript/core';
import { ClientDashboardViewModel } from './client-dashboard-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new ClientDashboardViewModel();
}