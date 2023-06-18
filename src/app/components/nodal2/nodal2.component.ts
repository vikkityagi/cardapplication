import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import * as converter from "number-to-words";
import { AuthserviceService } from "src/app/services/auth.service";
import { Title } from "@angular/platform-browser";
import { MatSelectionList } from "@angular/material/list";
import { Router } from "@angular/router";
import { ParichayUser } from "src/app/models/ParichayUser";
// import { MatSelectionList } from "@angular/material/list";
@Component({
  selector: "app-nodal2",
  templateUrl: "./nodal2.component.html",
  styleUrls: ["./nodal2.component.css"],
})
export class Nodal2Component implements OnInit {
  nodalofficer1: any = FormGroup;
  state: any;
  ministry: any;
  citylist: any;
  organization: any;
  organizationcode: any;
  approvingnamelist: any;
  approvingdetail: any;
  isDisabledApproving = false;
  
  des: any;
  payscalelist: any;
  checkboxerror: any = false;
  strengthcheck: any = null;
  onboardingdata: any;
  // approvingdata: any;
  applicationdata: any;
  file1: any;
  file2: any;
  formFlag = 0;
  dep: any;
  ministryList: any;
  reader: any = {};
  ministryStateCode: any;
  deptCode: any;
  value: any;
  value2: any;
  cghsCities: any = [];
  cghscitylist: any = [];
  routeState: any;
  parichayData: any;
  officeList: any = [];
  // cghs city code
  @ViewChild("cities") selectedCityList!: MatSelectionList;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authservice: AuthserviceService,
    private title: Title,
    private router: Router
  ) {
    // if (this.router.getCurrentNavigation()?.extras.state) {
    //   this.routeState = this.router.getCurrentNavigation()?.extras.state;
    //   //console.log("this.routeState--" + this.routeState);
    //   if (this.routeState) {
        this.parichayData = localStorage.getItem("parichayData");
        

    //     //console.log(
    //       "this.parichayData.firstName-" +
    //         (this.routeState as ParichayUser).firstName
    //     );
    //     //console.log(
    //       "this.parichayData.firstName-" + this.parichayData.firstName
    //     );
    //   }
    // }
  }
  onSelectionChange() {
    //console.log("onSelectionChange:called");
    this.cghsCities = this.getSelected();
    //console.log("length", this.cghsCities.length);
    //console.log("type", typeof this.cghsCities);
    if (this.cghsCities.length > 0) {
      this.checkboxerror = true;
    }
  }
  getSelected() {
    return this.selectedCityList.selectedOptions.selected.map((s) => s.value);
  }
  ngOnInit(): void {
 
    this.http
      .get("http://localhost:3002/api/v1/CghsCities")
      .subscribe(
        (data) => {
        this.cghscitylist = data; },
        (error)=>{
          //console.log('cityError'+error);
        });
    this.nodalofficer1 = this.fb.group({
      title: ["", Validators.required],
      firstname: ["", Validators.required],
      middlename: [],
      lastname: ["", Validators.required],
      designation: [
        "",
        [Validators.required, Validators.pattern("^[A-Za-z0-9-,]*$")],
      ],
      employeeid: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9_.-]*$")],
      ],
      dob: ["", Validators.required],
      superannuation: ["", Validators.required],
      payscaleCode: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "[a-z0-9.a-z0-9]+@(gov|nic|[a-zA-Z]+.gov|[a-zA-Z]+.nic)+.in$"
          ),
        ],
      ],
      phoneno1: ["", [Validators.required, Validators.minLength(10)]],
      phoneno2: ["", [Validators.required, Validators.minLength(12)]],
      ministry: ["", Validators.required],
      department: ["", Validators.required],
      organization: ["", Validators.required],
      organizationOfficeId: ["", Validators.required],
      oaddress: [
        "",
        [Validators.required, Validators.pattern("^[ A-Za-z0-9/,-]*$")],
      ],
      city: ["", Validators.required],
      state: ["", Validators.required],
      district: ["", Validators.required],
      pincode2: ["", [Validators.required, Validators.minLength(6)]],
      file: ["", Validators.required],
      englishname: [
        "",
        Validators.required,
      ],
      approvingdesignation: [
        "",
        [Validators.required, Validators.pattern("^[A-Za-z0-9-,]*$")],
      ],
      approvingemployeeid: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9_.-]*$")],
      ],
      approvingemail: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "[a-z0-9]+@(gov|nic|[a-zA-Z]+.gov|[a-zA-Z]+.nic)+.in$"
          ),
        ],
      ],
      phoneno3: ["", [Validators.required, Validators.minLength(10)]],
      phoneno4: ["", [Validators.required, Validators.minLength(10)]],
      approvingfile: ["", Validators.required],
      cghsCities: [""],
      strength: [
        "",
        [Validators.required, Validators.pattern("^[1-9][0-9]*$")],
      ],
    });

    this.nodalofficer1.valueChanges.subscribe((newValue: any) => {});

    // this.getapprovingname();

    // cghs cities here

    this.getstate();
    this.getpayscale();
    this.getministry();

    
    this.nodalofficer1.get("firstname")?.setValue(this.parichayData.firstName);
    this.nodalofficer1.get("lastname")?.setValue(this.parichayData.lastName);
    this.nodalofficer1
      .get("designation")
      ?.setValue(this.parichayData.designation);
    this.nodalofficer1
      .get("employeeid")
      ?.setValue(this.parichayData.employeeCode);

    this.nodalofficer1.get("email")?.setValue(this.parichayData.email);
    if (
      this.parichayData.mobileNo != undefined &&
      this.parichayData.mobileNo != ""
    )
      this.nodalofficer1
        .get("phoneno2")
        ?.setValue(this.parichayData.mobileNo.substring(1));

    this.nodalofficer1.get("city")?.setValue(this.parichayData.city);
  }

  getministry() {
    this.http
      .get("http://localhost:3002/api/v1/ministry")
      .subscribe((data) => {
        this.ministryList = data;
        //console.log("ministryData", JSON.stringify(this.ministryList));
       
      });
  }
  hello() {
    //console.log("Hello");
  }
  getdepartment(e: any) {
    //console.log("ministry called" + e.value);
    this.http
      .get("http://localhost:3002/api/v1/departments", {
        params: { ministryCode: e.value },
      })
      .subscribe((data) => {
        this.ministryStateCode = data;
        //console.log("deptData",JSON.stringify(this.ministryStateCode));
      });
  }

  getorganization(e: any) {
    //console.log("dep call"+e.value);
    this.http
      .get("http://localhost:3002/api/v1/organizations", {
        params: { departmentCode: e.value },
      })
      .subscribe((data) => {
        this.deptCode = data;
        //console.log("orgdata", JSON.stringify(this.deptCode));
      });
      // alert(this.nodalofficer1.get('organization').value);
  }

  getApprovingAuthorityUsers(e: any){
    this.nodalofficer1.get('approvingdesignation').setValue('');
    this.nodalofficer1.get('approvingemployeeid').setValue('');
    this.nodalofficer1.get('approvingemail').setValue('');
    this.nodalofficer1.get('phoneno3').setValue('');
    this.nodalofficer1.get('phoneno4').setValue('');
    
    //console.log("organizationcode>>"+e.value)
    this.http.get('http://localhost:3002/api/v1/ApprovingAuthorityUsers',{
        params: { organizationId: e.value },
      })
      .subscribe((data) => {
        this.approvingnamelist = data;
        //console.log("approvingnamelist", this.approvingnamelist);
      });
  }

  getapprovingdetail(e: any){
    //console.log('approving detail call');
    this.http.get('http://localhost:3002/api/v1/ApprovingAuthorityUser/'+parseInt(e.value))
      .subscribe((data) => {
        alert("approving officer detail show now")
        this.approvingdetail = data;
        //console.log(JSON.stringify('this.approvingdetail-'+this.approvingdetail));
        this.nodalofficer1.get("approvingdesignation")?.setValue(this.approvingdetail.designation);
        this.nodalofficer1.get("approvingemail")?.setValue(this.approvingdetail.email);
        this.nodalofficer1.get("phoneno4")?.setValue(this.approvingdetail.mobileNo);
        //console.log("approvingdetail", this.approvingdetail);
      });
  }

  getOffices(event: any) {
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
 
  // number allow
  async numberOnly(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else return true;
  }

  // here uploadd the pdf file
  onFileChange(fileInputEvent: any) {
    //console.log("pdf1", fileInputEvent.target.files[0]);
    this.file1 = fileInputEvent.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file1);

    reader.onload = () => {
      //console.log("pdf1", (<string>reader.result).split(",")[1]);
      this.reader["file1"] = (<string>reader.result).split(",")[1];
      // //console.log(typeof reader.result)
    };
  }

  onFileChange2(fileInputEvent: any) {
    // //console.log(fileInputEvent.target.files[0]);
    // this.file2 = fileInputEvent.target.files[0];
    this.file2 = fileInputEvent.target.files[0];
    const reader1 = new FileReader();
    reader1.readAsDataURL(this.file2);
    reader1.onload = () => {
      //console.log((<string>reader1.result).split(",")[1]);
      this.reader["file2"] = (<string>reader1.result).split(",")[1];
    };
  }

  //drop down data

  onChangeMinistry(event: any) {
    //console.log("ministery", event.target.value);
  }

  getstate() {
    this.http.get("http://localhost:3002/api/v1/state").subscribe((data) => {
      this.state = data;
      //console.log(this.state);
    });
  }

  getpayscale() {
    this.http
      .get("http://localhost:3002/api/v1/payscale")
      .subscribe((data) => {
        this.payscalelist = data;
        //console.log(this.payscalelist);
      });
  }

  onSubmitNodalOfficer() {
    //console.log("onSubmitNodalOfficer called");
    // const formData = new FormData(this.nodalofficer1)
    Object.entries(this.reader).map((item) => {
      // destruct the file
      const [key, file] = item;
      // append it to our data object
      this.nodalofficer1.value[key] = file;
    });

    this.nodalofficer1.value["formFlag"] = 1;
    this.nodalofficer1.value["cghsCities"] = this.cghsCities;

    // this.nodalofficer1.value["parichayId"] = this.parichayData.parichayId;
    this.nodalofficer1.value["parichayId"] = localStorage.getItem("parichayId");

    // //console.log('run')
    // this.nodaldata = this.authservice.onSubmitNodalOfficer(this.nodalofficer1.value);
    // this.approvingdata = this.authservice.onSubmitApproving(this.nodalofficer1.value);
    // this.applicationdata = this.authservice.onSubmitApplicantion(this.nodalofficer1.value);
    // //console.log('form check',typeof this.nodalofficer1.valid)
    //console.log("form check", this.nodalofficer1.value);

    if (this.checkboxerror == false) {
      //console.log("in if block")
      //  alert("choose one");
    } else {
      //console.log("in else block")
      //console.log("this.nodalofficer1.valid-"+this.nodalofficer1.valid);
      //console.log(this.checkboxerror);
      for (let el in this.nodalofficer1.controls) {
        if (this.nodalofficer1.controls[el].errors) {
          //console.log(el)
        }
      }          

      // if(true){
      if (this.checkboxerror != false && this.nodalofficer1.valid) {
        //console.log("run again");
        this.onboardingdata = this.authservice.onSubmitOnboarding(
          this.nodalofficer1.value
        );
      }
    }
  }
}
