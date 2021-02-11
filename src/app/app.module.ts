import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanchadashiUsaComponent } from './panchadashi-usa/panchadashi-usa.component';
import { PanchadashiShivgadComponent } from './panchadashi-shivgad/panchadashi-shivgad.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatSidenavModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { environment } from 'src/environments/environment';
import { SafeHtmlPipe } from './shared/safehtml.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PanchadashiUsaComponent,
    PanchadashiShivgadComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
