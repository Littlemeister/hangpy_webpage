import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StarEventsComponent } from './star-events/star-events.component';
import { MainArticleComponent } from './main-article/main-article.component';
import { SearchMainArticleComponent } from './main-article/search-main-article/search-main-article.component';
import { BrowseComponent } from './main-article/browse/browse.component';
import { FilterComponent } from './main-article/filter/filter.component';
import { CreateEventComponent } from './main-article/create-event/create-event.component';
import { CreateStarEventComponent } from './star-events/create-star-event/create-star-event.component';
import { TitleComponent } from './star-events/title/title.component';
import { TitleMainArticlesComponent } from './main-article/title-main-articles/title-main-articles.component';
import { ArticlesComponent } from './main-article/articles/articles.component';
import { StarArticlesComponent } from './star-events/star-articles/star-articles.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StarEventsComponent,
    MainArticleComponent,
    SearchMainArticleComponent,
    BrowseComponent,
    FilterComponent,
    CreateEventComponent,
    CreateStarEventComponent,
    TitleComponent,
    TitleMainArticlesComponent,
    ArticlesComponent,
    StarArticlesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
