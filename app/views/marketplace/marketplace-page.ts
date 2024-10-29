import { EventData, Page } from '@nativescript/core';
import { MarketplaceViewModel } from './marketplace-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new MarketplaceViewModel();
}