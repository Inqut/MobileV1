import { EventData, Page } from '@nativescript/core';
import { IdeaGeneratorViewModel } from './idea-generator-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new IdeaGeneratorViewModel();
}