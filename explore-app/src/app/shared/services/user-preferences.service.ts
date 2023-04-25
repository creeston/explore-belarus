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

    isPlaceSelected(placeId: number) {
        return this.highlightedPlaces.indexOf(placeId) >= 0
    }

    isPlaceVisited(placeId: number) {
        return this.visitedPlaces.indexOf(placeId) >= 0
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
        return this.updateEntity((preferences) => {
            preferences.highlightedPlaces.push(placeId);
        })
    }

    removeToVisit(placeId) {
        if (this.currentPreferences.highlightedPlaces.indexOf(placeId) < 0) {
            return;
        }

        return this.updateEntity((preferences) => {
            const index = preferences.highlightedPlaces.indexOf(placeId);
            if (index > -1) {
                preferences.highlightedPlaces.splice(index, 1);
            }
        })
    }

    setAsVisited(placeId: number) {
        if (this.currentPreferences.visitedPlaces.indexOf(placeId) >= 0) {
            return;
        }

        return this.updateEntity((preferences) => {
            preferences.visitedPlaces.push(placeId);
        })
    }

    removeAsVisited(placeId) {
        if (this.currentPreferences.visitedPlaces.indexOf(placeId) < 0) {
            return;
        }

        return this.updateEntity((preferences) => {
            const index = preferences.visitedPlaces.indexOf(placeId);
            if (index > -1) {
                preferences.visitedPlaces.splice(index, 1);
            }
        })
    }

    setAsNonInteresting(placeId: number) {
        if (this.currentPreferences.ignoredPlaces.indexOf(placeId) >= 0) {
            return;
        }

        return this.updateEntity((preferences) => {
            preferences.ignoredPlaces.push(placeId);
        })
    }

    removeAsNonInteresting(placeId) {
        if (this.currentPreferences.ignoredPlaces.indexOf(placeId) < 0) {
            return;
        }

        return this.updateEntity((preferences) => {
            const index = preferences.ignoredPlaces.indexOf(placeId);
            if (index > -1) {
                preferences.ignoredPlaces.splice(index, 1);
            }
        })
    }

    private updateEntity(updator: (UserPreferences) => void) {
        const data = this.currentPreferences;
        updator(data);
        return this.httpClient.patch("http://localhost:3000/userPreferences/" + this.currentPreferences.id, this.currentPreferences).pipe(
            map(r => {
                this.subject.next(this.currentPreferences);
                return r;
            }));
    }
}