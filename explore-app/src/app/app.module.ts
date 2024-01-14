import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { SightsService } from "./shared/services/sights.service";
import { SightsComponent } from "./components/sights/sights.component";
import { FormsModule } from "@angular/forms";
import { PlaceCard } from "./components/place-card/place-card.component";
import { NgbCarouselModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { DropdownModule } from "primeng/dropdown";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { InputTextModule } from "primeng/inputtext";
import { DividerModule } from "primeng/divider";
import { MultiSelectModule } from "primeng/multiselect";
import { UserPreferencesService } from "./shared/services/user-preferences.service";
import { TabViewModule } from "primeng/tabview";
import { ButtonModule } from "primeng/button";
import { MatTabsModule } from "@angular/material/tabs";
import { SliderModule } from "primeng/slider";
import { CheckboxModule } from "primeng/checkbox";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatIconModule } from "@angular/material/icon";
import { SightCard } from "./components/sight-card/sight-card.component";
import { TabMenuModule } from "primeng/tabmenu";

@NgModule({
  declarations: [AppComponent, SightsComponent, PlaceCard, SightCard],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbCarouselModule,
    NgbModule,
    CommonModule,
    DropdownModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    InputTextModule,
    TabViewModule,
    DividerModule,
    ButtonModule,
    MatTabsModule,
    SliderModule,
    CheckboxModule,
    MatButtonToggleModule,
    MatIconModule,
    TabMenuModule,
  ],
  providers: [SightsService, UserPreferencesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
