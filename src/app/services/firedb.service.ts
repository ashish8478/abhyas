import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { AbhyasVarga } from './firedb.model';

@Injectable({
  providedIn: 'root'
})
export class FiredbService {

  private panchadashiUsaObservable: Observable<any[]>;
  private panchadashiAbhyasReceived = new Subject<{ abhyas: AbhyasVarga[]}>();
  private viveksindhuAbhyasReceived = new Subject<{ abhyas: AbhyasVarga[]}>();
  private viveksindhuObservable: Observable<unknown[]>;
  panchadashiUsa: AbhyasVarga[] = [];
  viveksindhu: AbhyasVarga[] = [];

  constructor(private db: AngularFireDatabase) { 
    this.panchadashiUsaObservable = db.list('panchadashi-usa').valueChanges();
    this.viveksindhuObservable = db.list('viveksindhu').valueChanges();
  }

  getAbhyaas(vargaSubject: AbhyasVargaSubject) {
    if (vargaSubject === AbhyasVargaSubject.PanchadashiUsa) {
      this.panchadashiUsaObservable.subscribe(items => {
        this.panchadashiUsa = [];
        items.forEach(item => {
          this.panchadashiUsa.push({
            acharya: item['acharya'],
            asset: item['asset'],
            date: item['date'],
            description: item['description'],
            title: item['title'],
            details: item['details'].map(entry => {
              return {
                answerLink: entry['answer-link'],
                answerText: entry['answer-text'],
                questionText: entry['question']
              };
            })
          });
        });
  
        console.log(this.panchadashiUsa);
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
                answerLink: entry['answer-link'],
                answerText: entry['answer-text'],
                questionText: entry['question']
              };
            })
          });
        });
  
        console.log(this.viveksindhu);
        this.viveksindhuAbhyasReceived.next({ abhyas: [...this.viveksindhu] });
      }, error => {
        console.log(error);
      });
    }
  }

  getAbhyaasListener(vargaSubject: AbhyasVargaSubject) {
    if (vargaSubject === AbhyasVargaSubject.PanchadashiUsa) {
      return this.panchadashiAbhyasReceived.asObservable();
    } else if (vargaSubject === AbhyasVargaSubject.Viveksindhu) {
      return this.viveksindhuAbhyasReceived.asObservable();
    }
  }
}

export enum AbhyasVargaSubject {
  Viveksindhu,
  PanchadashiUsa,
  PanchadashiShivgad,
}