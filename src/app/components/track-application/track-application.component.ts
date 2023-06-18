
import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthserviceService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';

export interface Task {
  name: string;
  subtasks?: Task[];
  
}
@Component({
  selector: 'app-track-application',
  templateUrl: './track-application.component.html',
  styleUrls: ['./track-application.component.css']
})
export class TrackApplicationComponent implements OnInit {

  form: any= FormGroup;
  result:any;
  result2:any;
  nodalpdf = false;
  approvingpdf = false;
  isShowDiv = false;
  isShowDiv2 = false;
  isShowSpan = false;
  cityNames: any;
  isDisabled = false;
  
  
  subtasks = [
    {'name': 'Nodalpdf', value: 'nodalpdf'},
    {'name': 'Approvingpdf', value: 'approvingpdf'}
  ]

  constructor(
    private fb:FormBuilder,
    private auth: AuthserviceService,
    private http: HttpClient
  ){}



  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['',Validators.required],
      pdf: [],
    }); 

    

    
  }

  checkValue(e:any){
    if(e.source.value=='nodalpdf' && e.checked==true){
      this.nodalpdf = true
      
    }else{
      this.nodalpdf = false;
    }

    if(e.source.value=='approvingpdf' && e.checked==true){
      this.approvingpdf = true
      
    }else{
      this.approvingpdf = false;
    }
  }

  onSubmit() {
     if(this.nodalpdf==true && this.approvingpdf==true && this.form.valid==true){
        // see both
      // show nodal pdf
      this.isShowDiv = true; 
      this.isShowDiv2 = true; 
      //console.log('nodalpdf',this.nodalpdf)
      this.http.get('http://localhost:3002/api/v1/onboarding/'+parseInt(this.form.get('name').value), {
        params: { fields: 'nodalpdf,approvingpdf' },
      }).subscribe(data=>{
      this.result = data;
      this.form.reset();
      
      
    })
     }else if(this.nodalpdf==true && this.approvingpdf==false && this.form.valid==true){
      // show nodal pdf
      this.isShowDiv = true; 
      //console.log('nodalpdf',this.nodalpdf)
      this.http.get('http://localhost:3002/api/v1/onboarding/'+parseInt(this.form.get('name').value), {
        params: { fields: 'nodalpdf' },
      }).subscribe(data=>{
      this.result = data;
      this.form.reset();
      //console.log('nodalresult>>'+this.result.file)
      
    })
      
    }else if(this.nodalpdf==false && this.approvingpdf==true && this.form.valid==true){
      // show approving pdf
      this.isShowDiv2 = true; 
      //console.log('approvingpdf',this.approvingpdf)
      this.http.get('http://localhost:3002/api/v1/onboarding/'+parseInt(this.form.get('name').value), {
        params: { fields: 'approvingpdf' },
      }).subscribe(data=>{
      this.result2 = data;
      this.form.reset();
      //console.log('approvingresult>>'+this.result2.approvingfile)
      
    })
      //console.log('approveresult>>'+this.result)
    }else if(this.form.valid == true){
    
      this.isShowSpan = true;
      this.http.get('http://localhost:3002/api/v1/onboarding/'+parseInt(this.form.get('name').value)).subscribe(data=>{
      this.result = data;
      //console.log('allresult>>'+this.result.firstname)
      this.isDisabled = true;
      this.form.reset();
    })
    }
  }

  

  async numberOnly(event: any) {
    //console.log(this.form.get('name').value)
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else return true;
  }

  downloadPdf(base64String: any, fileName: any) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`
    link.click();
  }
  downloadPdf2(base64String: any, fileName: any) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`
    link.click();
  }
  onClickDownloadPdf(){
    this.downloadPdf(this.result.file,"NodalOfficer");
  }
  onClickDownloadPdf2(){
    this.downloadPdf2(this.result2.approvingfile,"ApprovingAuthority");
  }


}  

