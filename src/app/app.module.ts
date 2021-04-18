import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanchadashiUsaComponent } from './components/panchadashi-usa/panchadashi-usa.component';
import { PanchadashiShivgadComponent } from './components/panchadashi-shivgad/panchadashi-shivgad.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { environment } from 'src/environments/environment';
import { SafeHtmlPipe } from './shared/safehtml.pipe';
import { AbhyasVargaComponent } from './abhyas-varga/abhyas-varga.component';
import { ViveksindhuComponent } from './components/viveksindhu/viveksindhu.component';
import { AddAbhyasComponent } from './components/add-abhyas/add-abhyas.component';
import { MaterialImportsModule } from './material-imports.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PanchadashiUsaComponent,
    PanchadashiShivgadComponent,
    SafeHtmlPipe,
    AbhyasVargaComponent,
    ViveksindhuComponent,
    AddAbhyasComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    ReactiveFormsModule, 
    MaterialImportsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
