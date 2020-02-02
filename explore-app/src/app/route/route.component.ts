import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { faClock, faCalendar, faMoneyBill, faBus, faTrain, faShoePrints } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {
  fullRoute: FullRoute;
  faClock = faClock;
  faCalendar = faCalendar;
  faMoneyBill = faMoneyBill;
  faBus = faBus;
  faTrain = faTrain;
  faShoePrints = faShoePrints;

  constructor(route: ActivatedRoute, http: HttpClient) { 
    route.params.subscribe(p => {
      let id = p['id'];
      http.get("assets/routes.json").subscribe(r => {
        let fullRoutes = r as FullRoute[];
        this.fullRoute = fullRoutes[id - 1];
        this.fullRoute.titleImage = "assets/" + id + "/" + this.fullRoute.titleImage;
        for (let i = 0; i < this.fullRoute.photos.length; i++) {
          this.fullRoute.photos[i] = "assets/" + id + "/" + this.fullRoute.photos[i];
        }
      });
    });
  }

  ngOnInit() {
  }

}

class FullRoute {
  constructor(
    public id: number, public title: string, public duration: Time,
    public days: number[], public sights: string[], public titleImage: string,
    public shortDescription: string, public route: RoutePart[], 
    public photos: string[], public links: string[]
    ) {
      
    }
}

class RoutePart {

}