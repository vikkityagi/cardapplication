
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cghs-user',
  templateUrl: './cghs-user.component.html',
  styleUrls: ['./cghs-user.component.css']
})
export class CghsUserComponent implements OnInit {
  cghsUserForm: any = FormGroup;
  ministryList: any;
  departmentList: any;
  orgList: any;
  cghscitylist: any;
  officeList: any;
  userList: any;
  cityListId: any = [];
  constructor(private fb:FormBuilder,
    private service: ProfileService,
    private http:HttpClient,
    private router: Router){

  }

  ngOnInit(): void {
    alert('yhj')
    localStorage.setItem("cghsUserId",'5')
    this.cghsUserForm = this.fb.group({
      name: ['',Validators.required],
      designation: ['',Validators.required],
      email: ['',Validators.required],
      mobile: ['',Validators.required],
      ministry: ['',Validators.required],
      department: ['',Validators.required],
      organization: ['',Validators.required],
      cghscity: ['',Validators.required],
      organizationOfficeId: ['',Validators.required]

    })

    this.getministry();
    this.getCghsCity();
    this.fillForm(localStorage.getItem("parichayUserId"));
    
      this.onLoadDetail();
  }

  fillForm(data: any){
    this.service.fillcghs_userForm(data).subscribe(data=>{
      console.log('profileData'+JSON.stringify(data))
      console.log('profileData'+JSON.stringify(data.adCity))
      this.cghsUserForm.get("name")?.setValue(data.userName);
      this.cghsUserForm.get("designation")?.setValue(data.designation);
      this.cghsUserForm.get("email")?.setValue(data.email);
      this.cghsUserForm.get("mobile")?.setValue(data.mobile);
      this.cityListId = data.adCity;
      this.cghsUserForm.get('cghscity')?.setValue(this.cityListId)
    })
  }

  getOffices(event: any){
    //console.log("get Office call");
    this.http
      .get("http://localhost:3002/api/v1/OrganizationOffices",{
        params: { organizationId: event.value },
      })
      .subscribe((data) => {
        this.officeList = data;
        //console.log("officeList", this.officeList);
      });
  }
  getministry() {

    this.service.getMinistry()
      .subscribe((data) => {
        this.ministryList = data;
        //console.log("ministryList", this.ministryList);
      });
  }

  getdepartment(ministryCode: any) {
    //console.log("ministry code" + ministryCode);
    this.service.getDepartment(ministryCode)
      .subscribe((data) => {
        this.departmentList = data;
        //console.log("departmentList", this.departmentList);
      });
  }

  getorganization(deptCode: any) {
    //console.log("dep code" + deptCode);
    this.service.getOrganization(deptCode).subscribe((data) => {
      this.orgList = data;
      //console.log("orgList", this.orgList);
    });
  }

  // city comes here
  getCghsCity(){
    this.service.getCghsCity().subscribe(data=>{
      this.cghscitylist = data;
      //alert("city"+data);
    })
  
  
    
  }

  onSubmit(){
    console.log(this.cghsUserForm.value);
    this.cghsUserForm.value['parichayUserId'] = localStorage.getItem('currentUserId');
    if(this.cghsUserForm.valid){
      this.service.onSubmitCghsUser(this.cghsUserForm.value).subscribe(data=>{
        this.cghsUserForm.reset();
        this.router.navigate(['/cghsUserView/'+data.id])
      },(error)=>{
        console.log(error.error)
        if(error.status === 400){
          if('name' in error.error){
            this.cghsUserForm.get("name").
            setErrors({serverError: error.error.name,});
          }
          if('designation' in error.error){
            this.cghsUserForm.get("designation").
            setErrors({serverError: error.error.designation,});
          }
          if('email' in error.error){
            this.cghsUserForm.get("email").
            setErrors({serverError: error.error.email,});
          }
          if('mobile' in error.error){
            this.cghsUserForm.get("mobile").
            setErrors({serverError: error.error.mobile,});
          }
        }
        
      })
    }
  }

  onLoadDetail(){
    return this.http.get('http://localhost:3002/api/v1/cghsinchargeapplications').subscribe(data=>{
      this.userList = data;
    },(error)=>{
      //console.log(error)
    })
  }

}
