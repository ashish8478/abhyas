import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { AbhyasVarga } from './firedb.model';

@Injectable({
  providedIn: 'root'
})
export class FiredbService {

  private panchadashi2Observable: Observable<any[]>;
  private panchadashiAbhyasReceived = new Subject<{ abhyas: AbhyasVarga[]}>();
  private viveksindhuAbhyasReceived = new Subject<{ abhyas: AbhyasVarga[]}>();
  private viveksindhuObservable: Observable<unknown[]>;
  panchadashiUsa: AbhyasVarga[] = [];
  viveksindhu: AbhyasVarga[] = [];

  abhyasVarga = { 
    panchadashi2: 'पंचदशी भावदर्शन', 
    panchadashiShivgad: 'पंचदशी शिवगड',
    viveksindhu: 'विवेकसिंधू',
    dnyaneshwari: 'ज्ञानेश्वरी भावदर्शन',
    kalawatiaai: 'कलावतीआई चरित्र'
  };

  constructor(private db: AngularFireDatabase) { 
    this.panchadashi2Observable = db.list('panchadashi2').valueChanges();
    this.viveksindhuObservable = db.list('viveksindhu').valueChanges();
  }

  getAbhyaas(vargaSubject: AbhyasVargaSubject) {
    if (vargaSubject === AbhyasVargaSubject.PanchadashiBhavdarshan) {
      this.panchadashi2Observable.subscribe(items => {
        this.panchadashiUsa = [];
        items.forEach(item => {

          const details = item['details'] ? item['details'].map(entry => {
            return {
              answerLink: entry['answerLink'],
              answerText: entry['answerText'],
              questionText: entry['question']
            };
          }) : [];

          this.panchadashiUsa.push({
            acharya: item['acharya'],
            asset: item['asset'],
            date: item['date'],
            description: item['description'],
            title: item['title'],
            details: details
          });
        });

        this.panchadashiAbhyasReceived.next({ abhyas: [...this.panchadashiUsa] });
      }, error => {
        console.log(error);
      });
    } else if (vargaSubject === AbhyasVargaSubject.Viveksindhu) {
      this.viveksindhuObservable.subscribe(items => {
        this.viveksindhu = [];
        items.forEach(item => {
          this.viveksindhu.push({
            acharya: item['acharya'],
            asset: item['asset'],
            date: item['date'],
            description: item['description'],
            title: item['title'],
            details: item['details'].map(entry => {
              return {
                answerLink: entry['answerLink'],
                answerText: entry['answerText'],
                questionText: entry['question']
              };
            })
          });
        });
  
        this.viveksindhuAbhyasReceived.next({ abhyas: [...this.viveksindhu] });
      }, error => {
        console.log(error);
      });
    }
  }

  addAbhyas(abhyasVarga: AbhyasVargaSubject, abhyasJson: any) {
    try {
      const abhyasObject = abhyasJson;
      switch (abhyasVarga) {
        case AbhyasVargaSubject.Viveksindhu:
          this.db.list('viveksindhu').push(abhyasObject);
          break;
      
        case AbhyasVargaSubject.PanchadashiBhavdarshan:
          this.db.list('panchadashi2').push(abhyasObject);
          break;

        case AbhyasVargaSubject.PanchadashiShivgad:
          this.db.list('panchadashiShivgad').push(abhyasObject);
          break;
      }

      return null;

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  getAbhyaasListener(vargaSubject: AbhyasVargaSubject) {
    if (vargaSubject === AbhyasVargaSubject.PanchadashiBhavdarshan) {
      return this.panchadashiAbhyasReceived.asObservable();
    } else if (vargaSubject === AbhyasVargaSubject.Viveksindhu) {
      return this.viveksindhuAbhyasReceived.asObservable();
    }
  }
}

export enum AbhyasVargaSubject {
  Viveksindhu,
  PanchadashiBhavdarshan,
  PanchadashiShivgad,
  DnyaneshwariBhavdarshan,
  KalawatiAai
}