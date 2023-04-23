import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouteComponent } from './components/route/route.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SightsService } from './shared/services/sights.service';
import { RoutesComponent } from './components/routes/routes.component';
import { SightsComponent } from './components/sights/sights.component';
import { FormsModule } from '@angular/forms';
import { PlaceCard } from './components/place-card/place-card.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    RouteComponent,
    RoutesComponent,
    SightsComponent,
    PlaceCard
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgMasonryGridModule,
    NgxSpinnerModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    NgbCarouselModule,
    NgbModule
  ],
  providers: [SightsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
