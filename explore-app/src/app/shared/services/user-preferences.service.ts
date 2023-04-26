import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, map, of } from "rxjs";

export class UserPreferences {
    highlightedPlaces: number[];
    visitedPlaces: number[];
    ignoredPlaces: number[];
    userId: number;
    id: number;
    location: number[];

    constructor() {

    }

    isPlaceBookmarked(placeId: number) {
        return this.highlightedPlaces.indexOf(placeId) >= 0
    }

    bookmarkPlace(placeId: number) {
        this.highlightedPlaces.push(placeId);
    }

    unbookmarkPlace(placeId: number) {
        const index = this.highlightedPlaces.indexOf(placeId);
        if (index > -1) {
            this.highlightedPlaces.splice(index, 1);
        }
    }

    isPlaceVisited(placeId: number) {
        return this.visitedPlaces.indexOf(placeId) >= 0
    }

    visitPlace(placeId: number) {
        this.visitedPlaces.push(placeId);
    }

    unvisitPlace(placeId: number) {
        const index = this.visitedPlaces.indexOf(placeId);
        if (index > -1) {
            this.visitedPlaces.splice(index, 1);
        }
    }
}

@Injectable()
export class UserPreferencesService {
    currentPreferences: UserPreferences;
    userId = 1;

    get currentPreferences$() {
        return this.subject.asObservable();
    }

    subject: Subject<UserPreferences> = new Subject();

    constructor(private httpClient: HttpClient) {
    }

    getUserPreferences(): Observable<UserPreferences> {
        return this.httpClient.get("http://localhost:3000/userPreferences?userId=" + this.userId)
            .pipe(
                map(value => Object.assign(new UserPreferences(), value[0])),
                map(p => { this.currentPreferences = p; return this.currentPreferences; }));
    }

    setToVisit(placeId: number) {
        if (this.currentPreferences.isPlaceBookmarked(placeId)) {
            return;
        }

        return this.updateEntity((preferences) => {
            preferences.bookmarkPlace(placeId);
        })
    }

    removeToVisit(placeId) {
        if (!this.currentPreferences.isPlaceBookmarked(placeId)) {
            return;
        }

        return this.updateEntity((preferences) => {
            preferences.unbookmarkPlace(placeId);
        })
    }

    setAsVisited(placeId: number) {
        if (this.currentPreferences.isPlaceVisited(placeId)) {
            return;
        }

        return this.updateEntity((preferences) => {
            preferences.visitPlace(placeId);
        })
    }

    removeAsVisited(placeId) {
        if (!this.currentPreferences.isPlaceVisited(placeId)) {
            return;
        }

        return this.updateEntity((preferences) => {
            preferences.unvisitPlace(placeId);
        })
    }

    private updateEntity(updator: (UserPreferences) => void) {
        const data = this.currentPreferences;
        updator(data);
        return this.httpClient.patch("http://localhost:3000/userPreferences/" + this.currentPreferences.id, data).subscribe(
            r => {
                this.subject.next(this.currentPreferences);
                return r;
            });
    }
}