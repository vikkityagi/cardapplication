
import { Component,OnInit, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BenFormService } from 'src/app/services/ben-form.service';
import { MatSelectionList } from "@angular/material/list";
import { MatRadioChange } from '@angular/material/radio';
import { ProfileService } from 'src/app/services/profile.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: any = FormGroup;
  ministryList: any;
  departmentList: any;
  orgList: any;
  cghscitylist: any = [];
  cghsCities: any = [];
  checkboxerror: any = false;
  showAdCity: boolean = false;
  roleList: any;
  index = 9999999
  parichayData: any;
  loadData: any;
  officeList: any;
  message: any;
  profileId: any;
  profileRole: any;
  isdisabled: boolean = false;
  buttonValue: string = 'submit';
  @ViewChild("cities") selectedCityList!: MatSelectionList;

  constructor(private fb: FormBuilder,
    private service: ProfileService,
    private http:HttpClient,
    private router: Router,
    private route: ActivatedRoute){
    
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      id: [""],

      userName: ['',Validators.required],
      designation: ['',Validators.required],
      empCode: ['',Validators.required],

      email: ['',Validators.required],
      mobile: ['',Validators.required],
      
      ministry: ['',Validators.required],
      department: ['',Validators.required],
      organization: ['',Validators.required],
      organizationOfficeId: ['',Validators.required],

      roleId: ['',Validators.required],
      
      adCity: ['']
    }) 
    this.getministry();
    this.getCghsCity();

    
      this.service.getRoles().subscribe(data=>{
        this.roleList = data;
        //console.log('rolelist'+this.roleList)
      })
    
    //console.log('id>>'+localStorage.getItem("parichayId"))
    this.service.getParichayData(localStorage.getItem("parichayId")).subscribe(data=>{
      this.parichayData = data[0];
      //console.log("Data will be come"+JSON.stringify(this.parichayData));
      this.profileForm.get("userName")?.setValue(this.parichayData.fullName);
      this.profileForm.get("email")?.setValue(this.parichayData.userName);
      this.loadProfileDetails();
    })
   

    // end here
  }

  radioChange(event: MatRadioChange){
    
    //console.log('profile'+event.source.name);
    //console.log('profile'+event.value);
    if(event.value==4){
      this.showAdCity = true;
      this.checkboxerror = false;
    }else{
      this.showAdCity= false;
      this.checkboxerror = true;
    }
  }

  onSelectionChange() {
    //console.log("onSelectionChange:called");
    this.cghsCities = this.getSelected();
    //console.log("length", this.cghsCities.length);
    //console.log("type", typeof this.cghsCities);
    if (this.cghsCities.length > 0) {
      this.checkboxerror = true;
    }else{
      this.checkboxerror = false;
    }
  }
  
  getSelected() {
    return this.selectedCityList.selectedOptions.selected.map((s) => s.value);
  }

  getCghsCity(){
    this.service.getCghsCity().subscribe(data=>{
      this.cghscitylist = data;
      //console.log(data);
    })
  }

  getOffices(event: any){
    //console.log("get Office call");
    this.service.getOffices(event).subscribe((data) => {
        this.officeList = data;
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

  loadProfileDetails(): void{
    this.service.loadprofile(this.parichayData==0?1:this.parichayData).subscribe(data=>{
      //console.log("loadProfileDetails data - "+JSON.stringify(data));
      this.loadData = data;
    })
  }

  async patchProfile(id: any,roleId: any){
    console.log(id+" "+roleId)
    this.isdisabled = false;
    await this.service.patchProfile(id,roleId).subscribe(data=>{
      console.log('approvingData>>'+JSON.stringify(data))
      this.profileId = data.id;
      this.profileRole = data.roleId;

      this.profileForm.get('userName')?.setValue(data.userName);
      this.profileForm.get('designation')?.setValue(data.designation);
      this.profileForm.get('roleId')?.setValue(data.roleId);
      this.profileForm.get('empCode')?.setValue(data.empCode);
      this.profileForm.get('email')?.setValue(data.email);
      this.profileForm.get('mobile')?.setValue(data.mobile);
      this.getministry();
      this.profileForm.get('ministry')?.setValue(data.ministry);
      this.getdepartment(data.ministry)
      this.profileForm.get('department')?.setValue(data.department)
      
      
      this.getministry();
      this.getdepartment(data.ministry);
      this.getorganization(data.department);
      this.profileForm.get('organization')?.setValue(data.organization);
      this.getministry();
      this.getdepartment(data.ministry);
      this.getorganization(data.department);
      
      
      this.service.patchOffices(data.organization).subscribe((data) => {
          this.officeList = data;
      },(error)=>{
        console.log(error)
      });
      
      this.profileForm.get('organizationOfficeId')?.setValue(data.organizationOfficeId+"");
      if(data.adCity!=null){
        this.profileForm.get('adCity')?.setValue(data.adCity)
      }

      if(this.profileId!='' && data.roleId!=4){
        this.isdisabled = true;
        this.buttonValue = 'Update';
        this.showAdCity = false;
      }else{
        this.isdisabled = true;
        this.showAdCity = true;
        this.checkboxerror = false;
        this.buttonValue = 'Update';
      }
    },(error)=>{
      console.log(error);
    })
    
  }

  onDelete(id: any){

  }

  
  async onSubmit(){
    
    

    this.profileForm.value['parichayUserId'] = localStorage.getItem('currentUserId');
    console.log(this.profileForm.value);
    if(this.profileId!=null && this.profileForm.valid){
      this.profileForm.value["id"] = this.profileId;
      await this.service.edit(this.profileId,this.profileRole,this.profileForm.value).subscribe(data=>{
        console.log(data);
        this.profileForm.reset();
        window.location.reload();
      },(error)=>{
        if(error.status==400){
          if('userName' in error.error){
            this.profileForm.get('userName').setErrors({ serverError: error.error.userName });
          }
          if('designation' in error.error){
            this.profileForm.get('designation').setErrors({ serverError: error.error.designation });
          }
          if('empCode' in error.error){
            this.profileForm.get('empCode').setErrors({ serverError: error.error.empCode });
          }
          if('mobile' in error.error){
            this.profileForm.get('mobile').setErrors({ serverError: error.error.mobile });
          }
          if('email' in error.error){
            this.profileForm.get('email').setErrors({ serverError: error.error.email });
          }
        }
      })
    }else{
      if(this.profileForm.valid ){
        this.service.onSubmit(this.profileForm.value).subscribe(data=>{
          localStorage.setItem("cghsUserId",data.id)
          this.profileForm.reset();
          window.location.reload();
          this.loadProfileDetails();
        },(error)=>{
          if(error.status==400){
            if('userName' in error.error){
              this.profileForm.get('userName').setErrors({ serverError: error.error.userName });
            }
            if('designation' in error.error){
              this.profileForm.get('designation').setErrors({ serverError: error.error.designation });
            }
            if('empCode' in error.error){
              this.profileForm.get('empCode').setErrors({ serverError: error.error.empCode });
            }
            if('mobile' in error.error){
              this.profileForm.get('mobile').setErrors({ serverError: error.error.mobile });
            }
            if('email' in error.error){
              this.profileForm.get('email').setErrors({ serverError: error.error.email });
            }
          }
        })
        
      }
    }
    
  }

}
