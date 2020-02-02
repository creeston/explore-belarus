import { Component, OnInit } from '@angular/core';
import { Masonry } from 'ng-masonry-grid';
import $ from "jquery";

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {

  ngOnInit() {
  }

  routes: Route[] = [];
  sights: Route[];
  screenWidth: number;
  screenHeight: number;
  gridLoading: boolean = false;

  _masonry: Masonry;
 
onNgMasonryInit($event: Masonry) {
  this._masonry = $event;
  this.fetchRoutes()
}

  constructor() {
  }
  
  enterRoute(eventIndex) {
    let first = this.generatePoint();
    let second = this.generatePoint();
    let third = this.generatePoint();

    this.drawLine('line1', first, second);
    this.drawLine('line2', second, third);
  }

  drawLine(id, first, second) {
    var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
    newLine.setAttribute('id', id);
    newLine.setAttribute('x1', first[0].toString());
    newLine.setAttribute('y1', first[1].toString());
    newLine.setAttribute('x2', second[0].toString());
    newLine.setAttribute('y2', second[1].toString());
    newLine.setAttribute("stroke", "white")
    $("svg").append(newLine);
  }

  generatePoint() {
    let firstX = 2 * (Math.floor(Math.random() * 40) + 30);
    let firstY = 2 * (Math.floor(Math.random() * 40) + 30);
    return [firstX, firstY]
  }

  leaveRoute(eventIndex) {
    $("#line2").remove();
    $("#line1").remove();
  }

  generateRoutes(num: number) {
    let fetchedRoutes = []
    for (let i = 0; i < 100; i++) {
      let classNum = Math.floor(Math.random() * 3) + 1;
      fetchedRoutes.push(new Route(classNum));
    }
    return fetchedRoutes;
  }

  async fetchRoutes(){
    this._masonry.removeAllItems();
    let fetchedRoutes = this.generateRoutes(100);

    let state = [0, 0, 0, 0, 0, 0, 0, 0]
    while (fetchedRoutes.length > 0) {
      let j = 0;
      let length = 0;
      let min = Math.min(...state);
      for (let i = 0; i < state.length; i++) {
        if (state[i] == min) {
          j = i;
          while (state[i] == min && i < state.length) {
            length++;
            i++;
          }
          break;
        }
      }

      let event: Route;
      if (length == 1) {
        for (let k = 0; k < fetchedRoutes.length; k++) {
          if (fetchedRoutes[k].size == 1) {
            event = fetchedRoutes[k];
            fetchedRoutes.splice(k, 1);
            break;
          }
        }
      } else if (length == 2) {
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
    if (this._masonry) {
        this._masonry.reOrderItems();
    }
  }

}

class Route {
  constructor(public size: number) {
  }
}