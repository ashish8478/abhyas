import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanchadashiShivgadComponent } from './panchadashi-shivgad/panchadashi-shivgad.component';
import { PanchadashiUsaComponent } from './panchadashi-usa/panchadashi-usa.component';


const routes: Routes = [
  { path: 'panchadashi-usa', component: PanchadashiUsaComponent },
  { path: 'panchadashi-shivgad', component: PanchadashiShivgadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
