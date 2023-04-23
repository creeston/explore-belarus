import { Component, OnInit } from '@angular/core';
import { Masonry } from 'ng-masonry-grid';
import $ from 'jquery';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {
  routes: Route[] = [];
  sights: Route[];
  screenWidth: number;
  screenHeight: number;
  gridLoading = false;
  masonry: Masonry;
  ngOnInit() {
  }



onNgMasonryInit($event: Masonry) {
  this.masonry = $event;
  this.fetchRoutes();
}

  constructor() {
  }

  enterRoute(eventIndex) {
    const first = this.generatePoint();
    const second = this.generatePoint();
    const third = this.generatePoint();

    this.drawLine('line1', first, second);
    this.drawLine('line2', second, third);
  }

  drawLine(id, first, second) {
    const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    newLine.setAttribute('id', id);
    newLine.setAttribute('x1', first[0].toString());
    newLine.setAttribute('y1', first[1].toString());
    newLine.setAttribute('x2', second[0].toString());
    newLine.setAttribute('y2', second[1].toString());
    newLine.setAttribute('stroke', 'white');
    $('svg').append(newLine);
  }

  generatePoint() {
    const firstX = 2 * (Math.floor(Math.random() * 40) + 30);
    const firstY = 2 * (Math.floor(Math.random() * 40) + 30);
    return [firstX, firstY];
  }

  leaveRoute(eventIndex) {
    $('#line2').remove();
    $('#line1').remove();
  }

  generateRoutes(num: number) {
    const fetchedRoutes = [];
    for (let i = 0; i <= 30; i++) {
      const classNum = Math.floor(Math.random() * 3) + 1;
      fetchedRoutes.push(new Route(classNum, i + 1 + '.jpg'));
    }
    return fetchedRoutes;
  }

  async fetchRoutes() {
    this.masonry.removeAllItems();
    const fetchedRoutes = this.generateRoutes(100).reverse();

    const state = [0, 0, 0, 0, 0, 0, 0, 0];
    while (fetchedRoutes.length > 0) {
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

      let event: Route;
      if (length === 1) {
        for (let k = 0; k < fetchedRoutes.length; k++) {
          if (fetchedRoutes[k].size === 1) {
            event = fetchedRoutes[k];
            fetchedRoutes.splice(k, 1);
            break;
          }
        }
      } else if (length === 2) {
        for (let k = 0; k < fetchedRoutes.length; k++) {
          if (fetchedRoutes[k].size <= 2) {
            event = fetchedRoutes[k];
            fetchedRoutes.splice(k, 1);
            break;
          }
        }
      } else {
        event = fetchedRoutes.pop();
      }

      this.routes.push(event);
      for (let k = 0; k < event.size; k++) {
        state[j + k] += event.size;
      }
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  reorderItems() {
    if (this.masonry) {
        this.masonry.reOrderItems();
    }
  }

  setRouteStyle(route: Route) {
    if (route.imageName === null) {
      return {};
    }

    if (route.size === 2) {
      return {
        'background-image': 'linear-gradient(rgba(174, 183, 179, .4), rgba(174, 183, 179, .4)), url(assets/routes/' + route.imageName + ')',
        'background-repeat': 'cover'
      };
    }

    if (route.size === 1 || route.size === 3) {
      return{
        'background-image': 'linear-gradient(rgba(243, 217, 145, .4), rgba(243, 217, 145, .4)), url(assets/routes/' + route.imageName + ')',
        'background-repeat': 'cover'
      };
    }
    return {};
  }
}

class Route {
  constructor(public size: number, public imageName: string) {
  }
}
