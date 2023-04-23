import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { SelectItem } from 'primeng/api';
import { Place, Sight } from 'src/app/shared/models/place';
import { SightsService } from 'src/app/shared/services/sights.service';

@Component({
    selector: 'app-sights',
    templateUrl: './sights.component.html',
    styleUrls: ['./sights.component.scss']
})
export class SightsComponent implements OnInit {
    places: Place[];
    allPlaces: Place[];

    height = 335;
    width = 387;

    long1 = 23.11; //23.177973;
    lat1 = 51.25; // 51.262152;
    long2 = 32.80; //32.776439;
    lat2 = 56.182; //56.171905;

    screenWidth: number;
    screenHeight: number;

    selectedRegion: SelectItem;

    regions: SelectItem[] = [
        { label: 'Минская область', value: 'Минская' },
        { label: 'Брестская область', value: 'Брестская' },
        { label: 'Гродненская область', value: 'Гродненская' },
        { label: 'Гомельская область', value: 'Гомельская' },
        { label: 'Витебская область', value: 'Витебская' }
    ]

    ngOnInit() {
        this.sightsService.listPlaces().subscribe(data => {
            this.allPlaces = data.filter(p => p.sights.filter(s => s.image).length > 0);
            this.places = this.allPlaces.slice(0, 50);
            this.drawPoints();
        });
    }


    onScroll(): void {
        const chunk = this.allPlaces.slice(this.places.length, this.places.length + 50);
        chunk.forEach((place) => {
            this.drawPlaceCoord(place);
        });
        this.places.push(...chunk);
      }

    constructor(private sightsService: SightsService) {
    }

    drawPoints() {
        this.places.forEach((place, index) => {
            // setTimeout(() => this.drawSightCoord(sight), index % 500);
            // this.drawSightCoord(sight);
            this.drawPlaceCoord(place);
        });
    }

    drawPlaceCoord(place: Place) {
        const id = '#place' + place.id;
        $(id).remove();

        if (!place.coords) {
            return;
        }
        const [lat, long] = place.coords;

        const coord = this.transformCoordinates(+lat, +long);
        this.drawPoint(coord, 1, id);
    }

    enterPlace(i) {
        const place = this.places[i];
        this.drawPlaceSelectedCoord(place);
    }

    leavePlace(i) {
        const place = this.places[i];
        $('#selected' + place.id).remove();
    }

    drawPlaceSelectedCoord(place: Place) {
        const id = 'selected' + place.id;
        if (!place.coords) {
            return;
        }

        const [lat, long] = place.coords;
        const coord = this.transformCoordinates(+lat, +long);
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

        circle.addEventListener('mouseover', function (event) {
            const target = event.target as SVGCircleElement;
            if (target.tagName === 'circle') {
                console.log('Hovered over circle with id:', target.id);
            }
        });
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

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    setSightStyle(sight: Sight) {
        if (sight.image === null) {
            return {};
        }

        if (sight.rate === 2) {
            return {
                'background-image': 'linear-gradient(rgba(174, 183, 179, .4), rgba(174, 183, 179, .4)), url(' + sight.image + ')',
                'background-repeat': 'cover',
                'background-size': 'cover'
            };
        }

        if (sight.rate === 1 || sight.rate === 3) {
            return {
                'background-image': 'linear-gradient(rgba(243, 217, 145, .4), rgba(243, 217, 145, .4)), url(' + sight.image + ')',
                'background-repeat': 'cover',
                'background-size': 'cover'
            };
        }
        return {};
    }
}
