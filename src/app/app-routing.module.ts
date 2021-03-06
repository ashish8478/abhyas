import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAbhyasComponent } from './components/add-abhyas/add-abhyas.component';
import { PanchadashiShivgadComponent } from './components/panchadashi-shivgad/panchadashi-shivgad.component';
import { PanchadashiUsaComponent } from './components/panchadashi-usa/panchadashi-usa.component';
import { ViveksindhuComponent } from './components/viveksindhu/viveksindhu.component';


const routes: Routes = [
  { path: 'viveksindhu', component: ViveksindhuComponent },
  { path: 'panchadashi-usa', component: PanchadashiUsaComponent },
  { path: 'panchadashi-shivgad', component: PanchadashiShivgadComponent },
  { path: 'add-abhyas', component: AddAbhyasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
