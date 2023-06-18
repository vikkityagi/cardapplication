import { Component, OnInit, AfterContentInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { AuthserviceService } from "src/app/services/auth.service";

@Component({
  selector: "app-approving-officer",
  templateUrl: "./approving-officer.component.html",
  styleUrls: ["./approving-officer.component.css"],
})
export class ApprovingOfficerComponent implements OnInit {
  approvingofficerdata: any;
  isDisabled = false;
  approvingform: any = FormGroup;
  ministryList: any;
  ministryStateCode: any;
  deptCode: any;
  
  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private service: AuthserviceService) {}
 

  ngOnInit(): void {
    this.getapprovingofficers();

    this.approvingform = this.fb.group({
      name: ["",Validators.required],
      email: ["",Validators.required],
      mobileNumber: ["",Validators.required],
      designation: ["",Validators.required],
      ministry: ["",Validators.required],
      department: ["",Validators.required],
      organization: ["",Validators.required],

    })

    this.getministry();
  }

  getministry() {
    this.http
      .get("http://localhost:3002/api/v1/ministry")
      .subscribe((data) => {
        this.ministryList = data;
        // console.log("ministryData", this.ministryList);
      });
  }
 
  getdepartment(e: any) {
    // console.log("ministry call" + e);
    this.http
      .get("http://localhost:3002/api/v1/departments", {
        params: { ministryCode: e.value },
      })
      .subscribe((data) => {
        this.ministryStateCode = data;
        // console.log("deptData", this.ministryStateCode);
      });
  }

  getorganization(e: any) {
    // console.log("dep call");
    this.http
      .get("http://localhost:3002/api/v1/organizations", {
        params: { departmentCode: e.value },
      })
      .subscribe((data) => {
        this.deptCode = data;
        // console.log("orgdata", this.deptCode);
      });
  }


  getapprovingofficers() {
    return this.http
      .get("http://localhost:3002/api/v1/ApprovingAuthorityUsers")
      .subscribe((data) => {
        this.isDisabled = true;
        this.approvingofficerdata = data;
        // console.log(this.approvingofficerdata)
      },
      (error)=>{
        // console.log('error'+error);
      });
  }

  addapprovingofficer(){
    
  }

  async onSubmitApprovingOfficer(){
    // alert('yes')
    console.log(this.approvingform.value)
    this.service.onSubmitApprovingOfficer(this.approvingform.value).subscribe(data=>{
      console.log(data);
    },(error)=>{
      console.log(error.error);
      console.log(error.status);
      if(error.status === 400){
        console.log("run")
        if('name' in error.error){
          this.approvingform.get("name").
          setErrors({serverError: error.error.name,});
        }
        if('mobileNumber' in error.error){
          this.approvingform.get("mobileNumber").
          setErrors({serverError: error.error.mobileNumber,});
        }
        if('email' in error.error){
          this.approvingform.get("email").
          setErrors({serverError: error.error.email,});
        }
        if('designation' in error.error){
          this.approvingform.get("designation").
          setErrors({serverError: error.error.designation,});
        }
      }
    })
  }

  loginapprovingofficer(){
    // console.log('login call')
  }
}
