import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControlName, Validators} from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { successmodal} from '../contactus/contactus.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.css']
})
export class InfluencersComponent implements OnInit {
  selected = 'option1';
  public influencersForm: FormGroup;
  public stateslist: any;

  constructor(public fb: FormBuilder, public http: HttpClient,  public dialog: MatDialog) {
    this.getState();

    this.influencersForm = this.fb.group({
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      telephone: ['',Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      country: ['',Validators.required],
      city: ['',Validators.required],
      // message: ['',Validators.required],
      state: ['',Validators.required],
      facebook: ['',Validators.required],
      instagram: ['',Validators.required],
      twitter: ['',Validators.required],
      youtube: ['',Validators.required],
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
influencersSubmit() {
  let x: any;
  console.log('data');
  for (x in this.influencersForm.controls) {
      this.influencersForm.controls[x].markAsTouched();
  }
  if(this.influencersForm.valid) {
    let link: any;
    link = 'http://192.169.196.208:7061/influencer';
    let data: any = this.influencersForm.value;
    this.http.post(link, data).subscribe(response =>{
      let result: any;
      result = response;
      if(result.status == 'success'){
        this.dialog.open(successmodal, {
      data: {
        data: 'Successfully submitted'
            }
          });
      }
    })
  }

  console.log(this.influencersForm.value);
}
inputblur(val:any){
  console.log('on blur .....');
  this.influencersForm.controls[val].markAsUntouched();
}


  toTop() {
    document.getElementById("formclsblock").scrollIntoView({behavior: 'smooth'});
  }

}
