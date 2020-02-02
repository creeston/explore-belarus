import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesComponent } from './routes/routes.component';
import { RouteComponent } from './route/route.component';


const routes: Routes = [ 
  {path: '', component: RoutesComponent},
  {path: 'route/:id', component: RouteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
