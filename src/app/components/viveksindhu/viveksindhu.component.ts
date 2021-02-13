import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AbhyasVargaComponent } from 'src/app/abhyas-varga/abhyas-varga.component';
import { AbhyasVarga } from 'src/app/services/firedb.model';
import { AbhyasVargaSubject, FiredbService } from 'src/app/services/firedb.service';

@Component({
  selector: 'app-viveksindhu',
  templateUrl: './viveksindhu.component.html',
  styleUrls: ['./viveksindhu.component.scss']
})
export class ViveksindhuComponent implements OnInit, OnDestroy {

  viveksindhuSub: Subscription;
  abhyas: AbhyasVarga[] = [];

  videoHtml = `<audio width="80%" src="%s" controls></audio>`;
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
    this.viveksindhuSub.unsubscribe();
  }

  ngOnInit() {
    this.viveksindhuSub = this.db.getAbhyaasListener(AbhyasVargaSubject.Viveksindhu)
      .subscribe((abhyasVarga: { abhyas: AbhyasVarga[]}) => {
        if (abhyasVarga.abhyas && abhyasVarga.abhyas.length > 0) {
          this.abhyas = abhyasVarga.abhyas;
          this.abhyas.forEach(element => {
            const url = this.videoHtml.replace('%s', element.asset);
            element.asset = url;
            console.log(url);
          });
        }
      });

    this.db.getAbhyaas(AbhyasVargaSubject.Viveksindhu);
  }

}
