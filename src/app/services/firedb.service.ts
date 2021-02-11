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
  panchadashiUsa: AbhyasVarga[] = [];

  constructor(private db: AngularFireDatabase) { 
    this.panchadashiUsaObservable = db.list('panchadashi-usa').valueChanges();
  }

  getPanchadashiUsaAbhyaas() {
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
  }

  getPanchadashiUsaAbhyaasListener() {
    return this.panchadashiAbhyasReceived.asObservable();
  }
}
