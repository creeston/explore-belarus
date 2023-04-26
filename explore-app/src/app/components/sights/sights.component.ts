import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import $ from 'jquery';
import { SelectItem } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { Place, Sight } from 'src/app/shared/models/place';
import { SightsService } from 'src/app/shared/services/sights.service';
import { UserPreferences, UserPreferencesService } from 'src/app/shared/services/user-preferences.service';

@Component({
    selector: 'app-sights',
    templateUrl: './sights.component.html',
    styleUrls: ['./sights.component.scss']
})
export class SightsComponent implements OnInit {
    places: Place[];
    allPlaces: Place[];
    allPlacesFiltered: Place[];

    sights: Sight[];
    allSights: Sight[];

    preferences: UserPreferences;

    @ViewChild('mapContainer') mapContainer : ElementRef;

    height = 335;
    width = 387;

    long1 = 23.11; //23.177973;
    lat1 = 51.25; // 51.262152;
    long2 = 32.80; //32.776439;
    lat2 = 56.182; //56.171905;

    screenWidth: number;
    screenHeight: number;

    selectedRegions: string[];
    selectedRatings: number[];
    searchValue: string;
    activeIndex: number;
    rangeValue: number;
    showOnlyNonVisited: boolean;
    viewSelector: string;

    innerWidth: any;

    batchSize = 50;

    get highlightedPlaces() {
        return this.places.filter(p => this.preferences.isPlaceBookmarked(p.id));
    }

    get visitedPlaces() {
        return this.places.filter(p => this.preferences.isPlaceVisited(p.id));
    }

    get nonVisitedPlaces() {
        return this.places.filter(p => !this.preferences.isPlaceVisited(p.id));
    }

    regions: SelectItem[] = [
        { label: 'Минская область', value: 'Минская' },
        { label: 'Брестская область', value: 'Брестская' },
        { label: 'Гродненская область', value: 'Гродненская' },
        { label: 'Гомельская область', value: 'Гомельская' },
        { label: 'Витебская область', value: 'Витебская' }
    ]

    ratings: SelectItem[] = [
        { label: 'Увидеть обязательно', value: 1 },
        { label: 'Увидеть интересно', value: 2 },
        { label: 'Норм', value: 3 },
        { label: 'Посмотреть по дороге', value: 4 },
    ]

    constructor(
        private sightsService: SightsService,
        private scroller: ViewportScroller,
        private preferencesService: UserPreferencesService
    ) {
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = window.innerWidth;
        this.resizeMap();
    }

    async ngOnInit() {
        this.rangeValue = 500;
        this.activeIndex = 0;
        this.showOnlyNonVisited = false;
        this.viewSelector = 'places';
        this.innerWidth = window.innerWidth;
        console.log(this.innerWidth);

        this.preferences = await lastValueFrom(this.preferencesService.getUserPreferences());
        this.preferencesService.currentPreferences$.subscribe(p => {
            this.preferences = p;
        })
        
        this.sightsService.listPlaces().subscribe(data => {
            data = data
                    .filter(p => p.sights.filter(s => s.image).length > 0)
                    .map(p => {
                        const location = p.location;
                        const parts = location.split(',').map(p => p.trim());
                        p.location = parts.slice(-2).join(', ');
                        return p;
                    })
                    .sort((a, b) => a.rating - b.rating);;
            this.allPlaces = data;
            this.allPlacesFiltered = data;
            this.places = this.allPlacesFiltered.slice(0, this.batchSize);
        })

        this.sightsService.listSights().subscribe(data => {
            this.allSights = data.filter(sight => sight.image && sight.rate !== null).sort((a, b) => a.rate  - b.rate);
            this.sights = this.allSights.slice(0, this.batchSize);
        });

        this.resizeMap();
    }

    resizeMap() {
        const originalHeight = 1342;
        const originalWidth = 1548;
        const mapContainerWidth = this.mapContainer.nativeElement.offsetWidth;
        this.width = mapContainerWidth;
        this.height = Math.floor(mapContainerWidth * originalHeight / originalWidth);
    }

    filterData() {
        this.allPlacesFiltered = [];

        for (let place of this.allPlaces) {
            if (this.selectedRegions && this.selectedRegions.length > 0) {
                const placeLocation = place.location.toLowerCase();
                if (!this.selectedRegions.find(region => placeLocation.indexOf(region.toLowerCase()) >= 0)) {
                    continue;
                }
            }

            if (this.selectedRatings && this.selectedRatings.length > 0) {
                if (!this.selectedRatings.find(rating => place.rating === rating)) {
                    continue;
                }
            }

            if (this.searchValue) {
                const search = this.searchValue.toLowerCase();
                if (place.name.toLowerCase().indexOf(search) < 0) {
                    continue
                }
            }

            if (this.showOnlyNonVisited) {
                if (this.preferences.isPlaceVisited(place.id)) {
                    continue;
                }
            }

            this.allPlacesFiltered.push(place);
        }

        this.places = this.allPlacesFiltered.slice(0, this.batchSize);
        this.scroller.scrollToAnchor("mapContainer");
    }

    resetFilters() {
        this.selectedRatings = [];
        this.selectedRegions = [];
        this.showOnlyNonVisited = false;
        this.searchValue = null;

        this.filterData();
    }

    onScroll(): void {
        const chunk = this.allPlacesFiltered.slice(this.places.length, this.places.length + this.batchSize);
        this.places.push(...chunk);
    }

    onSightsScroll(): void {
        const chunk = this.allSights.slice(this.sights.length, this.sights.length + this.batchSize);
        this.sights.push(...chunk);
    }

    drawPlaceCoord(place: Place) {
        const id = 'place' + place.id;
        $('#' + id).remove();

        if (!place.coords) {
            return;
        }
        const [lat, long] = place.coords;

        const coord = this.transformCoordinates(+lat, +long);
        this.drawPoint(coord, 1, id);
    }

    getPlaceCoordX(place: Place) {
        const [lat, long] = place.coords;
        const coord = this.transformCoordinates(+lat, +long);
        return coord[0];
    }

    getPlaceCoordY(place: Place) {
        const [lat, long] = place.coords;
        const coord = this.transformCoordinates(+lat, +long);
        return coord[1];
    }

    onHover(entered: boolean, place: Place) {
        console.log('on hover ' + entered + ' ' + place.id);
        $('#selected' + place.id).remove();

        if (entered) {
            this.drawPlaceSelectedCoord(place);
        }
    }

    drawPlaceSelectedCoord(place: Place) {
        if (!place.coords) {
            return;
        }

        const [lat, long] = place.coords;
        const coord = this.transformCoordinates(+lat, +long);
        const id = 'selected' + place.id;
        this.drawPoint(coord, 4, id);
    }

    drawPoint(point, radius, id) {
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttributeNS(null, 'cx', point[0]);
        circle.setAttributeNS(null, 'cy', point[1]);
        circle.setAttributeNS(null, 'r', radius);
        circle.setAttributeNS(null, 'style', 'fill: #F3D991; stroke: #F3D991; stroke-width: 1px;');
        circle.setAttributeNS(null, 'id', id);
        $('svg').append(circle);

        // circle.addEventListener('mouseover', function (event) {
        //     const target = event.target as SVGCircleElement;
        //     if (target.tagName === 'circle') {
        //         console.log('Hovered over circle with id:', target.id);
        //     }
        // });
    }

    transformCoordinates(realLat: number, realLong: number) {
        // Determine the x scale
        const xScale = this.width / (this.long2 - this.long1);

        // Determine the y scale
        const yScale = this.height / (this.lat2 - this.lat1);

        // Determine the x offset
        const xOffset = this.long1;

        // Determine the y offset
        const yOffset = this.lat1;

        // Transform the real coordinates into SVG coordinates
        const x = (realLong - xOffset) * xScale;
        const y = (realLat - yOffset) * yScale;

        return [x, this.height - y];
    }
}
