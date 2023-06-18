import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { organizationOfficeService } from 'src/app/services/organizationOfficeService';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-organization-office',
  templateUrl: './organization-office.component.html',
  styleUrls: ['./organization-office.component.css']
})
export class OrganizationOfficeComponent implements OnInit {

  orgOfficeForm:any =  FormGroup;
  orgOfficeList: any;
  loadData: any;
  index: any = 9999999;
  orgId: any;
  navData: any;
  
  constructor(private fb: FormBuilder,private service: organizationOfficeService,
    private http: HttpClient){

  }
  
  ngOnInit(): void {
    //console.log("office call")
    this.service.getData(localStorage.getItem("currentUserId")).subscribe(data=>{
      this.orgOfficeList = data;
      this.orgId = data.organizationId;
      //console.log("orgOfficeList"+JSON.stringify(data));
      //console.log("orgId>>"+JSON.stringify(data.organizationId));
      this.orgOfficeForm.get('organizationId')?.setValue(data.organizationId);
    })

    this.orgOfficeForm = this.fb.group({
      organizationId: ['',Validators.required],
      officeName: ['',Validators.required],
      officeShortName: ['',Validators.required],
    })

    this.loadOrgOfficeData(this.orgId);
  }

  loadOrgOfficeData(val: any){
    this.service.getAll(val).subscribe(data=>{
      this.loadData = data;
      
    })
  }

  onSubmit(){
    //console.log("done")
    //console.log(this.orgOfficeForm.value)
    this.orgOfficeForm.value['parichayId']=localStorage.getItem('currentUserId');
    if(this.orgOfficeForm.valid){
      this.service.onSubmit(this.orgOfficeForm.value).subscribe(data=>{
        //alert("done")
        this.orgOfficeForm.reset();
        this.loadOrgOfficeData(data.organizationId);
      })
    }
  }

  getNavigationData() {
    //console.log("getNavigationData  is called")
    let val = localStorage.getItem("parichayUserId");
    //console.log('navigation   getdata called');
    return this.http.get('http://localhost:8080/api/v1/navigation/' + val).subscribe(data => {
      this.navData = data;
      //this.passData.emit(this.navData);
      //console.log("navdata data--" + JSON.stringify(data))
    })
  }

}
