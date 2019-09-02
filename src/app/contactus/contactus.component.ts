import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {FormBuilder,FormGroup,FormControlName, Validators, FormGroupDirective} from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
data: string;
}
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
@ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  public contactusForm: FormGroup;
  public stateslist: any;
  public data: any;
  constructor(public fb: FormBuilder, public http: HttpClient, public dialog: MatDialog) {
    this.getState();

    this.contactusForm = this.fb.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      telephone: ['',Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      country: ['',Validators.required],
      city: ['',Validators.required],
      message: ['',Validators.required],
      state: ['',Validators.required],

    })
   }

  ngOnInit() {
  }
  getState() {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
        })
    };
    var result = this.http.get('assets/data/state.json').subscribe(res =>{
      this.stateslist = res;
      console.log('stateslist');
      console.log(this.stateslist);

    });
    return result;
}
contactusSubmit() {
  let x: any;
  console.log('data');
  for (x in this.contactusForm.controls) {
      this.contactusForm.controls[x].markAsTouched();
  }
  if(this.contactusForm.valid) {
    let link: any;
    link = 'http://192.169.196.208:7061/contactusmail';
    let data: any = this.contactusForm.value;
    this.http.post(link, data).subscribe(response =>{
      let result: any;
      result = response;
      if(result.status == 'success'){
        this.formDirective.resetForm();
        this.dialog.open(successmodal, {
      data: {
        data: 'Successfully submitted'
            }
          });
      }
    })
  }

  console.log(this.contactusForm.value);
}
inputblur(val:any){
  console.log('on blur .....');
  this.contactusForm.controls[val].markAsUntouched();
}

}

@Component({
  selector: 'successmodal',
  templateUrl: 'successmodal.html',
})
export class successmodal {

  constructor(
    public dialogRef: MatDialogRef<successmodal>,
    @Inject(MAT_DIALOG_DATA)
     public data: DialogData
   ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
