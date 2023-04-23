import { Component, OnInit } from '@angular/core';
import { Masonry } from 'ng-masonry-grid';
import $ from 'jquery';
import { Place, Sight } from 'src/app/shared/models/place';
import { SightsService } from 'src/app/shared/services/sights.service';

@Component({
    selector: 'app-sights',
    templateUrl: './sights.component.html',
    styleUrls: ['./sights.component.scss']
})
export class SightsComponent implements OnInit {
    places: Place[];
    sights: Sight[];
    allSights: Sight[];

    long1 = 23.11; //23.177973;
    lat1 = 51.25; // 51.262152;
    long2 = 32.80; //32.776439;
    lat2 = 56.182; //56.171905;

    screenWidth: number;
    screenHeight: number;

    gridLoading = false;
    masonry: Masonry;

    ngOnInit() {
        this.sightsService.listPlaces().subscribe(data => {this.places = data.filter(p => p.sights.filter(s => s.image).length > 0).slice(0, 50);});
    }

    onNgMasonryInit($event: Masonry) {
        this.masonry = $event;
        this.sightsService.listSights().subscribe(data => {
            this.allSights = data;
            this.drawPoints();

            data = data.slice(0, 50).map(sight => {sight.rate = 5 - sight.rate; return sight; });
            this.processSights(data);
        })
    }

    constructor(private sightsService: SightsService) {
    }

    drawPoints() {
        this.allSights.forEach(sight => {
            this.drawSightCoord(sight);
        });
    }

    drawSightCoord(sight) {
        $('#point' + sight.id).remove();

        if (!sight.place.coords) {
            return;
        }
        const [lat, long] = sight.place.coords;

        const coord = this.transformCoordinates(+lat, +long, 774, 671);
        this.drawPoint(coord, sight.id);
    }

    enterSight(i) {
        const sight = this.sights[i];
        this.drawSightCoord(sight);
    }

    drawPoint(point, i) {
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttributeNS(null, 'cx', point[0]);
        circle.setAttributeNS(null, 'cy', point[1]);
        circle.setAttributeNS(null, 'r', '1');
        circle.setAttributeNS(null, 'style', 'fill: none; stroke: blue; stroke-width: 1px;' );
        circle.setAttributeNS(null, 'id', 'point' + i);
        $('svg').append(circle);

        circle.addEventListener('mouseover', function(event) {
            const target = event.target as SVGCircleElement;
            if (target.tagName === 'circle') {
              console.log('Hovered over circle with id:', target.id);
            }
          });
    }

    transformCoordinates(realLat: number, realLong: number, width: number, height: number) {
        // Determine the x scale
        const xScale = width / (this.long2 - this.long1);
      
        // Determine the y scale
        const yScale = height / (this.lat2 - this.lat1);
      
        // Determine the x offset
        const xOffset = this.long1;
      
        // Determine the y offset
        const yOffset = this.lat1;
      
        // Transform the real coordinates into SVG coordinates
        const x = (realLong - xOffset) * xScale;
        const y = (realLat - yOffset) * yScale;
      
        return [x, height - y];
      }
      

    leaveSight(eventIndex) {
        $('#point' + eventIndex).remove();
    }

    processSights(data: Sight[]) {
        this.masonry.removeAllItems();
        this.sights = [];

        const state = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        while (data.length > 0) {
            let j = 0;
            let length = 0;
            const min = Math.min(...state);
            for (let i = 0; i < state.length; i++) {
                if (state[i] === min) {
                    j = i;
                    while (state[i] === min && i < state.length) {
                        length++;
                        i++;
                    }
                    break;
                }
            }

            let sight: Sight;
            if (length === 1) {
                for (let k = 0; k < data.length; k++) {
                    if (data[k].rate === 1) {
                        sight = data[k];
                        data.splice(k, 1);
                        break;
                    }
                }
            } else if (length === 2) {
                for (let k = 0; k < data.length; k++) {
                    if (data[k].rate <= 2) {
                        sight = data[k];
                        data.splice(k, 1);
                        break;
                    }
                }
            } else if (length === 3) {
                for (let k = 0; k < data.length; k++) {
                    if (data[k].rate <= 3) {
                        sight = data[k];
                        data.splice(k, 1);
                        break;
                    }
                }
            } else {
                sight = data.pop();
            }

            if (!sight) {
                sight = data.pop();
            }

            this.sights.push(sight);
            for (let k = 0; k < sight.rate; k++) {
                state[j + k] += sight.rate;
            }
        }
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    reorderItems() {
        if (this.masonry) {
            this.masonry.reOrderItems();
        }
    }

    setSightStyle(sight: Sight) {
        if (sight.image === null) {
            return {};
        }

        if (sight.rate === 2) {
            return {
                'background-image': 'linear-gradient(rgba(174, 183, 179, .4), rgba(174, 183, 179, .4)), url(' + sight.image + ')',
                'background-repeat': 'cover'
            };
        }

        if (sight.rate === 1 || sight.rate === 3) {
            return {
                'background-image': 'linear-gradient(rgba(243, 217, 145, .4), rgba(243, 217, 145, .4)), url(' + sight.image + ')',
                'background-repeat': 'cover'
            };
        }
        return {};
    }
}
