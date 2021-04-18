import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { AbhyasVargaSubject, FiredbService } from 'src/app/services/firedb.service';

@Component({
  selector: 'app-add-abhyas',
  templateUrl: './add-abhyas.component.html',
  styleUrls: ['./add-abhyas.component.scss']
})
export class AddAbhyasComponent implements OnInit {

  formGroup: FormGroup;
  post: any;
  titleAlert: string = 'This field is required';

  constructor(private formBuilder: FormBuilder, private dbService: FiredbService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.setChangeValidate()
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      album: [null, [Validators.required]],
      title: [null, Validators.required],
      date: [null],
      acharya: [null, Validators.required],
      asset: [null, [Validators.required]],
      description: [null],
      details: this.formBuilder.array([this.formBuilder.group({
        answerLink: new FormControl(''),
        answerText: new FormControl(''),
        question: [null],
      })]),
      validate: ''
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate === '1') {
          this.formGroup.get('album').setValidators([Validators.required]);
        }
        this.formGroup.get('album').updateValueAndValidity();
      }
    )
  }

  get album() {
    return this.formGroup.get('album') as FormControl;
  }

  get title() {
    return this.formGroup.get('title') as FormControl;
  }

  get acharya() {
    return this.formGroup.get('acharya') as FormControl;
  }

  get asset() {
    return this.formGroup.get('asset') as FormControl;
  }

  get date() {
    return this.formGroup.get('date') as FormControl;
  }

  get description() {
    return this.formGroup.get('description') as FormControl;
  }

  get details() {
    return this.formGroup.get('details') as FormArray;
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  checkInUseEmail(control) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  addDetails() {
    this.details.push(this.formBuilder.group({
      answerLink: new FormControl(''),
      answerText: new FormControl(''),
      question: [null],
    }));
  }

  removeDetail(index: number) {
    this.details.removeAt(index);
  }

  onSubmit(post) {

    debugger
    this.post = this.formGroup.value;

    let album = this.album.value === 'पंचदशी भावदर्शन' ? AbhyasVargaSubject.PanchadashiBhavdarshan 
      : this.album.value === 'पंचदशी शिवगड' ? AbhyasVargaSubject.PanchadashiShivgad 
      : this.album.value === 'विवेकसिंधू' ? AbhyasVargaSubject.Viveksindhu 
      : this.album.value === 'ज्ञानेश्वरी भावदर्शन' ? AbhyasVargaSubject.Viveksindhu 
      : this.album.value === 'कलावतीआई चरित्र' ? AbhyasVargaSubject.Viveksindhu 
      : AbhyasVargaSubject.Viveksindhu;

    let details: any;
    if (this.details && this.details.value) {
      details = this.details.value.map(v => {
        debugger
        return {
          answerLink: 'http://docs.google.com/uc?export=open&id=' + v.answerLink,
          answerText: v.answerText,
          question: v.question
        };
      });
    }

    const date: Date = this.date.value ? this.date.value : new Date();
    const description: string = this.description.value ? this.description.value : '';

    const error = this.dbService.addAbhyas(album, {
      album: this.album.value,
      title: this.title.value,
      date: date.toISOString().split("T")[0],
      acharya: this.acharya.value,
      asset: this.asset.value,
      description: description,
      details: details
    });

    if (error) {
      this.openSnackBar(`Failed: ${error}`);
    } else {
      this.openSnackBar(`Success: Abhyaas saved to DB.`);
      this.acharya.setValue('');
      this.album.setValue('');
      this.title.setValue('');
      this.asset.setValue('');
      this.date.setValue('');
      this.description.setValue('');
      this.details.clear();
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 5000 });
  }
}
