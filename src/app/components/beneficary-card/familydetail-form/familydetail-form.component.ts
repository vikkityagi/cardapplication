import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BeneficaryCardComponent } from '../beneficary-card.component';
import { AuthserviceService } from 'src/app/services/auth.service';
import { AbhaData } from "src/app/models/AbhaData";
import { BeneficiaryFormComponent } from '../beneficiary-form/beneficiary-form.component';
import { BenFormService } from 'src/app/services/ben-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BenRegistrationApplication } from '../BenRegistrationApplication';
import { PrimaryBeneficiary } from '../PrimaryBeneficiary';
import { catchError } from 'rxjs';

interface primaryBeneficiaryData {
  id: number
}

interface FamilyMember {
  phoneNumber: string;
  id: number;
  primaryBeneficiaryId: number;
  familyId: number;
  benId: string;
  isPrimary: boolean;
  gender: number;
  relationCode: string;
  relationName: string;
  bloodGroupName: string;
  bloodGroupCode: string;
  dateOfBirth: Date;
  photoUrl: string;
  isDisabled: string;
  mobile: number;
  email: number;
  englishname: string;
  hindiname: string;
  otp_verify: boolean;
}

@Component({
  selector: 'app-familydetail-form',
  templateUrl: './familydetail-form.component.html',
  styleUrls: ['./familydetail-form.component.css']
})
export class FamilydetailFormComponent implements OnInit {

  // @ViewChild(BeneficiaryFormComponent) benform: { primaryBeneficiaryId: { id: string; }; } | undefined;

  familydetailform: any = FormGroup;
  abhaform: any = FormGroup;
  otpform: any = FormGroup;
  verifyabha = true;
  verifyotp = false;
  otp200response = "false";
  txnoabha: any;
  otp = true;
  ministryList: any;
  ministryStateCode: any;
  deptCode: any;
  currenttime: any;

  verify = true;
  token: any;
  abhaData: any;
  primaryBenid: any;
  gendervalue: any;
  index = 100;
  routeData: any;
  indexId: any;
  applicationId: any = '';
  familyId: any;
  message: any;

  @Input() familyData: FamilyMember[] = [];
  @Input() benRegistrationData!: BenRegistrationApplication;
  @Input() primaryBeneficiaryData!: PrimaryBeneficiary;


  isSuccess: boolean = false;
  isFail: boolean = false;
  failureMessage: string = '';
  successMessage: string = '';
  memberId: any;
  abhaInput: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authservice: AuthserviceService,
    private router: Router,
    private route: ActivatedRoute,
    private benService: BenFormService
  ) {
    setInterval(() => {
      this.currenttime = new Date();
    }, 1);

    this.abhaInput = [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  }
  editFamilyMember(memberId: any): void {
    //console.log("editFamilyMember-" + memberId);
    if (memberId) {
      this.memberId = memberId;
      //console.log('call');
      this.benService.getFamilyByMemberId(this.applicationId, memberId).subscribe(familyMemberData => {
        //console.log(JSON.stringify(familyMemberData))
        //console.log('(familyMemberData as FamilyMember).id-' + (familyMemberData as FamilyMember).id);
        this.familydetailform.get('id')?.setValue((familyMemberData as FamilyMember).id);
        this.familydetailform.get('englishname')?.setValue((familyMemberData as FamilyMember).englishname);
        this.familydetailform.get('hindiname')?.setValue((familyMemberData as FamilyMember).hindiname);
        this.familydetailform.get('dateOfBirth')?.setValue((familyMemberData as FamilyMember).dateOfBirth);
        this.familydetailform.get('gender')?.setValue((familyMemberData as FamilyMember).gender);
        this.familydetailform.get('bloodGroupCode')?.setValue((familyMemberData as FamilyMember).bloodGroupCode + '');
        this.familydetailform.get('relationCode')?.setValue((familyMemberData as FamilyMember).relationCode + '');
        this.familydetailform.get('mobile')?.setValue((familyMemberData as FamilyMember).mobile);
      })
    }

  }
  onDelete(memberId: any): void {
    //console.log('delete call')
    if (memberId) {
      //console.log('call');
      this.benService.deleteFamilyByMemberId(this.applicationId, memberId).subscribe(familyMemberData => {
        this.showActivityMessage(true, "Record deleted successfully")
        this.loadFamilyDetails();
      }, (error) => {
        this.showActivityMessage(false, "Error in deleting the record, please try again")
      })
    }

  }
  deleteFamilyMember(memberId: any): void {
    this.benService.deleteFamilyByMemberId(this.applicationId, memberId).subscribe((data) => {
      //console.log(data);
      this.loadFamilyDetails();
    }, (error) => {
      //console.log(error);
    })


  }

  loadFamilyDetails(): void {
    if (this.applicationId != null) {
      this.authservice.getFamilyMembersByPrimaryBeneficiaryId(this.applicationId)
        .subscribe((familyMemberData: any) => {
          //console.log("familyMemberData-" + familyMemberData);
          this.familyData = familyMemberData;
        });
    }



  }
  ngOnInit(): void {
    //console.log("family form ngOnInit called");
    this.route.queryParams
      .subscribe(params => {
        //console.log(params); // { orderby: "price" }
        this.applicationId = params['applicationId'];
        //console.log("this.applicationId>>" + this.applicationId);
      });

    this.route.params
      .subscribe(params => {
        //console.log(params); // { orderby: "price" }
        this.familyId = params['familyId'];
        //console.log("this.familyId>>" + this.familyId + "this.applicationId>>" + this.applicationId);

      });

    this.loadFamilyDetails();
    //console.log("loadFamilyDetails done");

    this.abhaform = this.fb.group({
      abhaid: [""],
    });

    this.otpform = this.fb.group({
      otp: [""],
      abhaid2: [""]
    });

    // this.familydetailform = this.fb.group({
    //   // applicationId:["",Validators.required],
    //   id: [""],
    //   englishname: [""],
    //   hindiname: [""],
    //   dateOfBirth: [""],
    //   gender: [""],
    //   bloodGroupCode: [""],
    //   relationCode: [""],
    //   mobile: [""]

    // });
    this.familydetailform = this.fb.group({
      // applicationId:["",Validators.required],
      id: [""],
      englishname: ["",Validators.required],
      hindiname: ["",Validators.required],
      dateOfBirth: ["",Validators.required],
      gender: ["",Validators.required],
      bloodGroupCode: ["",Validators.required],
      relationCode: ["",Validators.required],
      mobile: ["",Validators.required]

    });

    this.getministry();
    //console.log("init done");
    // this.getFamilyDetail();
  }

  getministry() {
    this.http
      .get("http://localhost:3002/api/v1/ministry")
      .subscribe((data) => {
        this.ministryList = data;
        //console.log("ministryData", this.ministryList);
      });
  }

  getdepartment(e: any) {
    //console.log("ministry call" + e);
    this.http
      .get("http://localhost:3002/api/v1/departments", {
        params: { ministryCode: e.value },
      })
      .subscribe((data) => {
        this.ministryStateCode = data;
        //console.log("deptData", this.ministryStateCode);
      });
  }

  getorganization(e: any) {
    //console.log("dep call");
    this.http
      .get("http://localhost:3002/api/v1/organizations", {
        params: { departmentCode: e.value },
      })
      .subscribe((data) => {
        this.deptCode = data;
        //console.log("orgdata", this.deptCode);
      });
  }

  onSubmitAbhaid() {
    //alert("call abha")
    //console.log(this.abhaform.value);

    if (this.abhaform.value.abhaid != "") {
      //alert(true);
      //console.log(this.abhaform.value);
      this.authservice.beneficaryService(this.abhaform.value).subscribe(data => {
        //console.log("response" + data);
        //console.log("response" + data.txnId);
        this.txnoabha = data.txnId
        this.otpform.get("abhaid2")?.setValue(this.abhaform.get('abhaid').value);
        localStorage.setItem("familyform", this.familydetailform)
        // this.abhaform.get("abhaid2").value = this.otpform.get("abhaid").value;
        this.verifyabha = false;
        this.verifyotp = true;

      }, (error: HttpErrorResponse) => {
        //console.log(error.status);
        //console.log(typeof error.status);

        this.abhaform.controls.abhaid.setErrors({ invalidAbhaId: true })
        if (error.status == 422) {
          //console.log("422")
        }
        //console.log(error.statusText);
        //console.log(error.message);

      })

    }


  }

  onSubmitOtp() {
    //alert("call otp")
    //console.log(this.otpform.value);

    if (this.otpform.value.otp != "") {
      //alert("verify otp");

      this.authservice.otpVerify(this.otpform.get('otp').value, this.txnoabha).subscribe(data => {



        //console.log("abhareotp-response" + data.token);
        if (data.token != "") {
          this.token = data.token;
          this.otp = false;
          this.verify = false;
          this.authservice.getAbhaDatafromToken(this.token).subscribe(data => {
            this.abhaData = data as AbhaData;
            this.otp200response = "true";
            //console.log("Token abha data" + this.abhaData.firstName);
            //console.log("Token abha data" + (data as AbhaData).firstName);
            //console.log("Token abha data" + (data as AbhaData).pincode);
            //console.log("Token abha data" + (data as AbhaData).city);


          })




        } else {
          //alert('sorry otp does not match')
        }

        // this.beneficaryform.get("abhaid3")?.setValue(this.abhaform.get('abhaid2').value);

      }, (error: HttpErrorResponse) => {
        //console.log(error.status);
        //console.log(error.status);
        //console.log(error.error);
        //console.log(error.statusText);
        this.otpform.controls.otp.setErrors({ invalidOTP: true })

      })
    }
  }

  onsubmitfamilydetail() {



    //console.log("family detail call");

    //console.log("this.applicationId>>" + this.applicationId);

    //console.log("localStorage.getItem(parichayId)"+localStorage.getItem("parichayId"));

    
    

//    this.applicationId = 3;

    this.familydetailform.value["otpverify"] = this.otp200response;
    this.familydetailform.value["parichayId"] = localStorage.getItem("parichayId");
    // this.familydetailform.value["id"] = this.familyId;


    //console.log(this.familydetailform.value)
    //console.log(this.familydetailform.valid)
    //console.log('this.familydetailform.value["id"]>>'+this.familydetailform.value["id"])
    //console.log('application'+this.applicationId)
    if(this.familydetailform.valid){

//      this.applicationId = 1;

      this.http.post<any>('http://localhost:3002/api/v1/ben_registration_application/'+this.applicationId+ '/family_members',this.familydetailform.value).subscribe((data)=>{

      //console.log("res>>"+data);
      this.familydetailform.reset();

        //console.log("this.familydetailform.reset() called");
        this.loadFamilyDetails();

      }, (error) => {

        //console.log("api>>>" + JSON.stringify(error));
        //console.log("api>>>" + JSON.stringify(error.HttpErrorResponse));
        //console.log("api>>>" + JSON.stringify(error.error));

        if ('englishName' in error.error){
          this.familydetailform.controls['englishname'].setErrors({ 'incorrect': true })
          this.message = error.error.englishName;
        }

        if ('hindiName' in error.error){
          this.familydetailform.controls['hindiname'].setErrors({'incorrect':true})
          this.message = error.error.hindiName;
        }

        if ('dateOfBirth' in error.error){
          this.familydetailform.controls['dateOfBirth'].setErrors({'incorrect':true})
          this.message = error.error.dateOfBirth;
        }


        if ('gender' in error.error){
          this.familydetailform.controls['gender'].setErrors({'incorrect':true})
          this.message = error.error.gender;
        }

        if ('mobile' in error.error){
          this.familydetailform.controls['mobile'].setErrors({'incorrect':true})
          this.message = error.error.mobile;
          //console.log("message mobile"+this.message)
        }

        

        
    })


      //this.router.navigate(['beneficiaryCard/'+this.applicationId], { queryParams: { showIndex: "2"}});

    }

  }


  showActivityMessage(activityStatus: boolean, message: string) {

    if (activityStatus) {
      this.isSuccess = true;                          // <<<---using ()=> syntax
      this.successMessage = message;
    } else {
      this.isFail = false;
      this.failureMessage = message;
    }
    return this.successMessage;

  }





}
