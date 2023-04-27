import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Place, Sight } from "../models/place";
import { environment } from "src/environments/environment";

@Injectable()
export class SightsService {
    private apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    listPlaces(): Observable<Place[]> {
        return this.http.get<Place[]>(this.apiUrl + '/places');
    }

    listSights(): Observable<Sight[]> {
        return this.http.get<Sight[]>(this.apiUrl + '/sights');
    }

    getPlace(id: number): Observable<Place> {
        return this.http.get<Place>(this.apiUrl + '/places/' + id);
    }
}
