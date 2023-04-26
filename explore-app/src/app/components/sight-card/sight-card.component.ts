import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Place, Sight } from "src/app/shared/models/place";
import { UserPreferences, UserPreferencesService } from "src/app/shared/services/user-preferences.service";

@Component({
  selector: 'app-sight-card',
  templateUrl: './sight-card.component.html',
  styleUrls: ['./sight-card.component.scss']
})
export class SightCard implements OnInit {
  @Input() sight: Sight;
  @Output() hover: EventEmitter<boolean> = new EventEmitter<boolean>();

  photo: string;
  title: string;
  preferences: UserPreferences;

  constructor(private preferencesService: UserPreferencesService) {

  }

  ngOnInit(): void {
    this.photo = this.sight.image;
    this.title = this.sight.name;
    this.preferences = this.preferencesService.currentPreferences;
  }

  openPlaceUrl() {
    window.open(this.sight.place.url, "_blank");
  }

  enterPlace() {
    this.hover.emit(true);
  }

  leavePlace() {
    this.hover.emit(false);
  }
}