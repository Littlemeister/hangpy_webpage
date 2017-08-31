///////////// MODULE //////////////
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MdButtonModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { RouterModule, Routes } from '@angular/router';

///////////// SERVICES //////////////
import { GetarticleService } from './service/getarticle/getarticle.service';
import { LoggedInService } from './service/loggedin/logged-in.service';

//////////// COMPONENTS /////////////
import { AppComponent } from './app.component';
import { StarEventsComponent } from './star-events/star-events.component';
  import { CreateStarEventComponent } from './star-events/create-star-event/create-star-event.component';
  import { TitleComponent } from './star-events/title/title.component';
  import { StarArticlesComponent } from './star-events/star-articles/star-articles.component';

import { MainArticleComponent } from './main-article/main-article.component';
  import { ArticlesComponent } from './main-article/articles/articles.component';
  import { BrowseComponent } from './main-article/browse/browse.component';
  import { CreateEventComponent } from './main-article/create-event/create-event.component';
    import { EventcreationComponent } from './main-article/create-event/eventcreation/eventcreation.component';
      import { ActivityComponent } from './main-article/create-event/eventcreation/activity/activity.component';
      import { UploadpictureComponent} from './main-article/create-event/eventcreation/uploadpicture/uploadpicture.component';
  import { FilterComponent } from './main-article/filter/filter.component';
  import { SearchMainArticleComponent } from './main-article/search-main-article/search-main-article.component';
  import { TitleMainArticlesComponent } from './main-article/title-main-articles/title-main-articles.component';

import { HeaderComponent } from './header/header.component';
  import { LoginFormComponent } from './header/login-form/login-form.component';
  import { RegisterComponent } from './header/register/register.component';

import { FooterComponent } from './footer/footer.component';
import { GooglemapComponent } from './googlemap/googlemap.component'
import { ProfileComponent } from './profile/profile.component'
  import { PmenuComponent } from './profile/pmenu/pmenu.component'
  import { PcontentComponent } from './profile/pcontent/pcontent.component'

///////// ROUTES //////////
const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'Login', component: LoginFormComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Createevent', component: CreateEventComponent },
  { path: 'Createstarevent', component: CreateStarEventComponent },
  //{ path: '/profile/:username', component: ProfileComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    StarEventsComponent,
      CreateStarEventComponent,
      StarArticlesComponent,
      TitleComponent,
    MainArticleComponent,
      ArticlesComponent,
      BrowseComponent,
      CreateEventComponent,
        EventcreationComponent,
          ActivityComponent,
          UploadpictureComponent,
      FilterComponent,
      SearchMainArticleComponent,
      TitleMainArticlesComponent,
    HeaderComponent,
      LoginFormComponent,
      RegisterComponent,
    FooterComponent,
    GooglemapComponent,
    ProfileComponent,
      PmenuComponent,
      PcontentComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDjr6DpDCFhdA4WtcivHhDgInMPn0BcFuE'
    }),
  RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [GetarticleService, LoggedInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
