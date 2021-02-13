import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AbhyasVarga } from '../../services/firedb.model';
import { AbhyasVargaSubject, FiredbService } from '../../services/firedb.service';

@Component({
  selector: 'app-panchadashi-usa',
  templateUrl: './panchadashi-usa.component.html',
  styleUrls: ['./panchadashi-usa.component.scss']
})
export class PanchadashiUsaComponent implements OnInit, OnDestroy {

  panchadashiUsaSubscription: Subscription;
  panchadashiAbhyas: AbhyasVarga[] = [];

  videoHtml = `
    <iframe width="%w" height="%h" src="%s" frameborder="0"
    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
  `;
  screenHeight: number;
  screenWidth: number;

  constructor(private db: FiredbService) {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    if (this.screenWidth > 650) {
      this.videoHtml = this.videoHtml.replace('%w', '640');
      this.videoHtml = this.videoHtml.replace('%h', '480');
    } else {
      const width = this.screenWidth * 0.9;
      const height = width * 3 / 4;
      this.videoHtml = this.videoHtml.replace('%w', width.toString());
      this.videoHtml = this.videoHtml.replace('%h', height.toString());
    }
  }

  ngOnDestroy(): void {
    console.log('component destroyed');
    this.panchadashiUsaSubscription.unsubscribe();
  }

  ngOnInit() {
    this.panchadashiUsaSubscription = this.db.getAbhyaasListener(AbhyasVargaSubject.PanchadashiUsa)
      .subscribe((abhyasVarga: { abhyas: AbhyasVarga[]}) => {
        if (abhyasVarga.abhyas && abhyasVarga.abhyas.length > 0) {
          this.panchadashiAbhyas = abhyasVarga.abhyas;
          this.panchadashiAbhyas.forEach(element => {
            const url = this.videoHtml.replace('%s', element.asset);
            element.asset = url;
            console.log(url);
          });
        }
      });

    this.db.getAbhyaas(AbhyasVargaSubject.PanchadashiUsa);
  }

}
