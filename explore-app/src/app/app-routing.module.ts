import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteComponent } from './components/route/route.component';
import { RoutesComponent } from './components/routes/routes.component';
import { SightsComponent } from './components/sights/sights.component';


const routes: Routes = [ 
  {path: '', component: SightsComponent},
  {path: 'route/:id', component: RouteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
