import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SightsService } from './shared/services/sights.service';
import { SightsComponent } from './components/sights/sights.component';
import { FormsModule } from '@angular/forms';
import { PlaceCard } from './components/place-card/place-card.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    SightsComponent,
    PlaceCard
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbCarouselModule,
    NgbModule,
    CommonModule,
    DropdownModule,
    BrowserAnimationsModule,
    InfiniteScrollModule 
  ],
  providers: [SightsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
