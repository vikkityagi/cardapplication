import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import * as converter from "number-to-words";
import { AuthserviceService } from "src/app/services/auth.service";
import { Title } from "@angular/platform-browser";
import { MatSelectionList } from "@angular/material/list";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { AbhaData } from "src/app/models/AbhaData";
import { ParichayUser } from "src/app/models/ParichayUser";
import { BeneficaryCardComponent } from "../beneficary-card.component";
import { BenFormService } from "src/app/services/ben-form.service";
import { BenRegistrationApplication } from "../BenRegistrationApplication";
import { PrimaryBeneficiary } from "../PrimaryBeneficiary";
import { cardType } from "../CardTypeResponse";
import { WardEntitlement } from "../WardEntitlementResponse";
import { MatStepper } from "@angular/material/stepper";

@Component({
  selector: "app-beneficiary-form",
  templateUrl: "./beneficiary-form.component.html",
  styleUrls: ["./beneficiary-form.component.css"],
  providers: [],
})
export class BeneficiaryFormComponent implements OnInit {
  beneficaryform: any = FormGroup;

  abhaform: any = FormGroup;
  otpform: any = FormGroup;
  verifyabha = true;
  verifyotp = false;
  currenttime: any;
  id: any;
  state: any;
  ministry: any;
  citylist: any;
  organization: any;
  des: any;
  payscalelist: any;
  checkboxerror: any = false;
  strengthcheck: any = null;
  onboardingdata: any;
  approvingdata: any;
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
  txnoabha: any;
  otp = true;
  verify = true;
  token: any;
  message: any;
  abhaidValidation = false;
  abhaData: AbhaData = <AbhaData>{};
  primaryBeneficiary: any;
  abhadata: any;
  // kycimage = false;
  messageSuccess = null;
  checkbenform = "false";
  cardTypeResponse: any;
  WardEntitlementResponse: any;
  parichayData: ParichayUser = <ParichayUser>{};

  departmentList: any;
  orgList: any;

  isSuccess: boolean = false;
  isFail: boolean = false;
  successMessage: string = "";
  failureMessage: string = "";
  abhaInput: any;
  officeList: any;

  @ViewChild("cities") selectedCityList!: MatSelectionList;
  @ViewChild(MatStepper) stepper: any = MatStepper;

  @Input() applicationId: string;

  @Input() benRegistrationData!: BenRegistrationApplication;
  @Input() primaryBeneficiaryData!: PrimaryBeneficiary;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authservice: AuthserviceService,
    private router: Router,
    private route: ActivatedRoute,
    private benFormService: BenFormService
  ) {
    // console.log("BeneficiaryFormComponent:constructor called ");
    // set time
    this.applicationId = "";
    setInterval(() => {
      this.currenttime = new Date();
    }, 1);

    this.abhaInput = [
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      "-",
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ];
  }

  getpayscale() {
    this.http.get("http://localhost:3002/api/v1/payscale").subscribe((data) => {
      this.payscalelist = data;
      // console.log(this.payscalelist);
    });
  }

  loadFormData(): void {
    // console.log("loadFormData called");
    this.beneficaryform.get("id")?.setValue(this.primaryBeneficiaryData.id);
    this.beneficaryform.get("applicationId")?.setValue(this.applicationId);
    this.beneficaryform
      .get("englishname")
      ?.setValue(this.primaryBeneficiaryData.englishname);
    this.beneficaryform
      .get("hindiname")
      ?.setValue(this.primaryBeneficiaryData.hindiname);
    console.log(
      "this.primaryBeneficiaryData.cardTypeCode - " +
        this.primaryBeneficiaryData.cardTypeCode
    );

    this.beneficaryform
      .get("cardTypeCode")
      ?.setValue(this.primaryBeneficiaryData.cardTypeCode + "");
    this.beneficaryform
      .get("gender")
      ?.setValue(this.primaryBeneficiaryData.gender);
    this.beneficaryform.get("dob")?.setValue(this.primaryBeneficiaryData.dob);
    this.beneficaryform
      .get("dateOfSuperannuation")
      ?.setValue(this.primaryBeneficiaryData.dateOfSuperannuation);
    this.beneficaryform
      .get("dateOfJoining")
      ?.setValue(this.primaryBeneficiaryData.dateOfJoining);
    this.beneficaryform
      .get("cghsCity")
      ?.setValue(this.primaryBeneficiaryData.cghsCity + "");
    this.beneficaryform
      .get("ministry")
      ?.setValue(this.primaryBeneficiaryData.ministry);

    this.benFormService
      .getDepartment(this.primaryBeneficiaryData.ministry)
      .subscribe((data) => {
        this.departmentList = data;
        this.beneficaryform
          .get("department")
          ?.setValue(this.primaryBeneficiaryData.department);
      });

    this.benFormService
      .getOrganization(this.primaryBeneficiaryData.department)
      .subscribe((data) => {
        this.orgList = data;
        this.beneficaryform
          .get("organization")
          ?.setValue(this.primaryBeneficiaryData.organization);
      });

    this.benFormService
      .getOffices(this.primaryBeneficiaryData.organization)
      .subscribe((data) => {
        this.officeList = data;
        // console.log('this.primaryBeneficiaryData.organizationOfficeId-'+this.primaryBeneficiaryData.organizationOfficeId);
        this.beneficaryform
          .get("organizationOfficeId")
          ?.setValue(this.primaryBeneficiaryData.organizationOfficeId + "");
      });

    this.beneficaryform
      .get("payScaleCode")
      ?.setValue(this.primaryBeneficiaryData.payScaleCode);
    this.beneficaryform
      .get("presentPay")
      ?.setValue(this.primaryBeneficiaryData.presentPay);
    // this.beneficaryform.get('presentpayservice')?.setValue(this.primaryBeneficiaryData.lastDrawnPay);
    this.beneficaryform
      .get("wardentitlement")
      ?.setValue(this.primaryBeneficiaryData.wardentitlement);
    this.beneficaryform
      .get("officeaddress")
      ?.setValue(this.primaryBeneficiaryData.officeaddress);
    this.beneficaryform
      .get("officephoneno")
      ?.setValue(this.primaryBeneficiaryData.officephoneno);
    this.beneficaryform
      .get("officeemail")
      ?.setValue(this.primaryBeneficiaryData.officeemail);
    this.beneficaryform
      .get("officepincode")
      ?.setValue(this.primaryBeneficiaryData.officepincode);
    this.beneficaryform
      .get("residentialaddress")
      ?.setValue(this.primaryBeneficiaryData.residentialaddress);
    this.beneficaryform
      .get("residentialplace")
      ?.setValue(this.primaryBeneficiaryData.residentialplace);
    this.beneficaryform
      .get("residentialcity")
      ?.setValue(this.primaryBeneficiaryData.residentialcity);
    this.beneficaryform
      .get("residentialpincode")
      ?.setValue(this.primaryBeneficiaryData.residentialphone);
    this.beneficaryform
      .get("residentialphone")
      ?.setValue(this.primaryBeneficiaryData.residentialphone);
    this.beneficaryform
      .get("residentialmobile")
      ?.setValue(this.primaryBeneficiaryData.residentialmobile);
    this.beneficaryform
      .get("residentialemail")
      ?.setValue(this.primaryBeneficiaryData.residentialemail);
    this.beneficaryform
      .get("residentialretirementdate")
      ?.setValue(this.primaryBeneficiaryData.residentialretirementdate);
    this.beneficaryform
      .get("centraldeputation")
      ?.setValue(this.primaryBeneficiaryData.centraldeputation);
  }

  ngOnInit(): void {
    // console.log("ben form ngoninit called");
    localStorage.setItem("checkbenform", this.checkbenform);
    this.abhaform = this.fb.group({
      abhaid: [""],
    });

    this.otpform = this.fb.group({
      otp: ["", Validators.required],
      abhaid2: [""],
    });
    this.beneficaryform = this.fb.group({
      // parichay: ["",Validators.required],
      id: [""],
      applicationId: [""],
      englishname: ["", Validators.required],
      hindiname: ["", Validators.required],
      cardTypeCode: ["", Validators.required],
      gender: ["", Validators.required],
      dob: ["", Validators.required],
      cghsCity: ["", Validators.required],
      ministry: ["", Validators.required],
      department: ["", Validators.required],
      organization: ["", Validators.required],
      payScaleCode: ["", Validators.required],
      presentPay: ["", Validators.required],

      wardentitlement: ["", Validators.required],
      dateOfSuperannuation: ["", Validators.required],
      dateOfJoining: ["", Validators.required],
      organizationOfficeId: ["", Validators.required],
      officeaddress: ["", Validators.required],
      officephoneno: ["", Validators.required],
      officeemail: ["", Validators.required],
      officepincode: ["", Validators.required],
      residentialaddress: ["", Validators.required],
      residentialplace: ["", Validators.required],
      residentialcity: ["", Validators.required],
      residentialpincode: ["", Validators.required],
      residentialphone: ["", Validators.required],
      residentialmobile: ["", Validators.required],
      //residentialemail: ["", Validators.required],
      centraldeputation: [],
    });
  }

  ngOnChanges(): void {
    this.getpayscale();

    this.getministry();
    this.getCghsCities();

    // get card Type here
    this.benFormService.getCardType().subscribe((data) => {
      this.cardTypeResponse = data as cardType;

      
    });

    // get Ward Entitlement here
    this.benFormService.getWardEntitlement().subscribe((data) => {
      this.WardEntitlementResponse = data as WardEntitlement;

      
    });

    

    this.beneficaryform.get("id")?.setValue(this.primaryBeneficiaryData?.id);
    this.beneficaryform.get("applicationId")?.setValue(this.applicationId);
    this.beneficaryform
      .get("englishname")
      ?.setValue(this.primaryBeneficiaryData.englishname);
    this.beneficaryform
      .get("hindiname")
      ?.setValue(this.primaryBeneficiaryData.hindiname);

    this.beneficaryform.get("id")?.setValue(this.primaryBeneficiaryData.id);
    this.beneficaryform.get("applicationId")?.setValue(this.applicationId);
    this.beneficaryform
      .get("englishname")
      ?.setValue(this.primaryBeneficiaryData.englishname);
    this.beneficaryform
      .get("hindiname")
      ?.setValue(this.primaryBeneficiaryData.hindiname);
    

    this.beneficaryform
      .get("cardTypeCode")
      ?.setValue(this.primaryBeneficiaryData.cardTypeCode + "");
    this.beneficaryform
      .get("gender")
      ?.setValue(this.primaryBeneficiaryData.gender);
    this.beneficaryform.get("dob")?.setValue(this.primaryBeneficiaryData.dob);
    this.beneficaryform
      .get("dateOfSuperannuation")
      ?.setValue(this.primaryBeneficiaryData.dateOfSuperannuation);
    this.beneficaryform
      .get("dateOfJoining")
      ?.setValue(this.primaryBeneficiaryData.dateOfJoining);
    this.beneficaryform
      .get("cghsCity")
      ?.setValue(this.primaryBeneficiaryData.cghsCity + "");
    this.beneficaryform
      .get("ministry")
      ?.setValue(this.primaryBeneficiaryData.ministry);

    this.benFormService
      .getDepartment(this.primaryBeneficiaryData.ministry)
      .subscribe((data) => {
        this.departmentList = data;
        this.beneficaryform
          .get("department")
          ?.setValue(this.primaryBeneficiaryData.department);
      });
    this.benFormService
      .getOrganization(this.primaryBeneficiaryData.department)
      .subscribe((data) => {
        this.orgList = data;
        this.beneficaryform
          .get("organization")
          ?.setValue(this.primaryBeneficiaryData.organization);
      });
    this.benFormService
      .getOffices(this.primaryBeneficiaryData.organization)
      .subscribe((data) => {
        this.officeList = data;
        // console.log('this.primaryBeneficiaryData.organizationOfficeId-'+this.primaryBeneficiaryData.organizationOfficeId);
        this.beneficaryform
          .get("organizationOfficeId")
          ?.setValue(this.primaryBeneficiaryData.organizationOfficeId + "");
      });

    this.beneficaryform
      .get("payScaleCode")
      ?.setValue(this.primaryBeneficiaryData.payScaleCode + "");
    this.beneficaryform
      .get("presentPay")
      ?.setValue(this.primaryBeneficiaryData.presentPay);

    this.beneficaryform
      .get("wardentitlement")
      ?.setValue(this.primaryBeneficiaryData.wardentitlement);
    this.beneficaryform
      .get("officeaddress")
      ?.setValue(this.primaryBeneficiaryData.officeaddress);
    this.beneficaryform
      .get("officephoneno")
      ?.setValue(this.primaryBeneficiaryData.officephoneno);
    this.beneficaryform
      .get("officeemail")
      ?.setValue(this.primaryBeneficiaryData.officeemail);
    this.beneficaryform
      .get("officepincode")
      ?.setValue(this.primaryBeneficiaryData.officepincode);
    this.beneficaryform
      .get("residentialaddress")
      ?.setValue(this.primaryBeneficiaryData.residentialaddress);
    this.beneficaryform
      .get("residentialplace")
      ?.setValue(this.primaryBeneficiaryData.residentialplace);
    this.beneficaryform
      .get("residentialcity")
      ?.setValue(this.primaryBeneficiaryData.residentialcity);
    this.beneficaryform
      .get("residentialpincode")
      ?.setValue(this.primaryBeneficiaryData.residentialphone);
    this.beneficaryform
      .get("residentialphone")
      ?.setValue(this.primaryBeneficiaryData.residentialphone);
    this.beneficaryform
      .get("residentialmobile")
      ?.setValue(this.primaryBeneficiaryData.residentialmobile);
    this.beneficaryform
      .get("residentialemail")
      ?.setValue(this.primaryBeneficiaryData.residentialemail);
    this.beneficaryform
      .get("residentialretirementdate")
      ?.setValue(this.primaryBeneficiaryData.residentialretirementdate);
    this.beneficaryform
      .get("centraldeputation")
      ?.setValue(this.primaryBeneficiaryData.centraldeputation);
  }

  // allow number
  async numberOnly(event: any) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else return true;
  }

  getOffices(event: any) {
    // console.log("get Office call");
    this.benFormService.getOffices(event.value).subscribe((data) => {
      this.officeList = data;
      // console.log("officeList", this.officeList);
    });
  }

  getministry() {
    this.benFormService.getMinistry().subscribe((data) => {
      this.ministryList = data;
      // console.log("ministryList", this.ministryList);
    });
  }

  getCghsCities() {
    this.benFormService.getCghsCities().subscribe((data) => {
      this.cghsCities = data;
      // console.log("CghsCities", this.cghsCities);
    });
  }

  getdepartment(ministryCode: any) {
    // console.log("ministry code" + ministryCode);
    this.benFormService.getDepartment(ministryCode).subscribe((data) => {
      this.departmentList = data;
      // console.log("departmentList", this.departmentList);
    });
  }

  getorganization(deptCode: any) {
    // console.log("dep code" + deptCode);
    this.benFormService.getOrganization(deptCode).subscribe((data) => {
      this.orgList = data;
      // console.log("orgList", this.orgList);
    });
  }

  onSubmitBeneficiary() {
    //alert("beneficiary call here")
    if (localStorage.getItem("parichayId") != null) {
      // let val = this.beneficaryform.get('dob').value;
      // let val1 = this.beneficaryform.get('dateOfJoining').value;
      // let val2 = this.beneficaryform.get('dateOfSuperannuation').value;

      // console.log(this.beneficaryform.value);
      // console.log("beneficiary call here");

      if (true) {
        this.beneficaryform.value["parichayId"] =
          localStorage.getItem("parichayId");
        // console.log(this.beneficaryform.value);
        // console.log(this.beneficaryform.status)
        if (this.beneficaryform.valid) {
          // console.log('form true')
          this.http
            .post<any>(
              "http://localhost:3002/api/v1/primary_beneficiaries",
              this.beneficaryform.value
            )
            .subscribe(
              (data) => {
                // console.log('benform data' + JSON.stringify(data));
                this.isSuccess = true;
                this.isFail = false;
                this.showActivityMessage(true, "Data saved successfully");
                this.primaryBeneficiary = data as PrimaryBeneficiary;
                localStorage.setItem(
                  "benRegistrationApplicationId",
                  this.primaryBeneficiary.benRegistrationApplicationResource.id
                );

                this.router.navigate(["familydetail/:applicationId"], {
                  relativeTo: this.route,
                  queryParams: {
                    applicationId:
                      this.primaryBeneficiary.benRegistrationApplicationResource
                        .id,
                  },
                  queryParamsHandling: "merge",
                  skipLocationChange: false,
                });
              },
              (error) => {
                console.log(error.error);
                if (error.status == 510) {
                  // console.log("error")
                  this.showActivityMessage(
                    false,
                    "Error in saving data. sorry Nodal Office doesn't exist from this organization office Id"
                  );
                }
                if (error.status == 400) {
                  // console.log("error")
                  this.showActivityMessage(false, "Error in saving data.");
                  if ("organizationOfficeId" in error.error) {
                    this.beneficaryform
                      .get("organizationOfficeId")
                      .setErrors({
                        serverError: error.error.organizationOfficeId,
                      });
                  }
                }
              }
            );
        } else {
          this.showActivityMessage(false, "please check all Form Carefully!");
        }
      }
    }
  }

  onSubmitAbhaid() {
    // console.log(this.abhaform.get("abhaid").value);
    if (this.abhaform.value.abhaid != "") {
      //alert(true);
      // console.log(this.abhaform.value);
      this.authservice.beneficaryService(this.abhaform.value).subscribe(
        (data) => {
          // console.log("response"+data.text());
          // console.log("response" + data.txnId);
          this.txnoabha = data.txnId;
          this.otpform
            .get("abhaid2")
            ?.setValue(this.abhaform.get("abhaid").value);
          // this.abhaform.get("abhaid2").value = this.otpform.get("abhaid").value;
          this.verifyabha = false;
          this.verifyotp = true;
        },
        (error: HttpErrorResponse) => {
          // console.log(error.status);
          // console.log(typeof error.status);

          this.abhaform.controls.abhaid.setErrors({ invalidAbhaId: true });
          if (error.status == 422 && error.statusText == "Ok") {
            // console.log("422");
          }
          // console.log(typeof error.statusText);
          // console.log(error.message);
        }
      );
    }
  }

  onSubmitOtp() {
    // console.log(this.otpform.get("otp").value);
    // console.log(this.txnoabha);
    this.beneficaryform.value["abhaId"] = this.otpform.get("abhaid2").value;
    if (this.otpform.value.otp != "") {
      // //alert("verify otp");

      this.authservice
        .otpVerify(this.otpform.get("otp").value, this.txnoabha)
        .subscribe(
          (data) => {
            // console.log("abhareotp-response" + data.token);
            if (data.token != "") {
              this.token = data.token;
              this.otp = false;
              this.verify = false;
              this.authservice
                .getAbhaDatafromToken(this.token)
                .subscribe((data) => {
                  this.abhaData = data as AbhaData;
                  // this.kycimage = true;
                  this.beneficaryform
                    .get("englishname")
                    ?.setValue((data as AbhaData).firstName);
                  this.beneficaryform
                    .get("hindiname")
                    ?.setValue((data as AbhaData).name);
                  this.beneficaryform
                    .get("gender")
                    ?.setValue((data as AbhaData).gender);
                  this.beneficaryform
                    .get("residentialaddress")
                    ?.setValue((data as AbhaData).address);
                  this.beneficaryform
                    .get("residentialcity")
                    ?.setValue((data as AbhaData).city);
                  this.beneficaryform
                    .get("residentialpincode")
                    ?.setValue((data as AbhaData).pincode);
                  // console.log("Token abha data" + this.abhaData.firstName);
                  // console.log("Token abha data" + (data as AbhaData).firstName);
                  // console.log("Token abha data" + (data as AbhaData).pincode);
                  // console.log("Token abha data" + (data as AbhaData).city);
                });
            } else {
              // //alert("sorry otp does not match");
            }
          },
          (error: HttpErrorResponse) => {
            // console.log(error.status);
            // console.log(error.status);
            // console.log(error.error);
            // console.log(error.statusText);
            this.otpform.controls.otp.setErrors({ invalidOTP: true });
          }
        );
    }
  }

  showActivityMessage(activityStatus: boolean, message: string) {
    if (activityStatus) {
      this.isSuccess = activityStatus; // <<<---using ()=> syntax
      this.successMessage = message;
    } else {
      this.isFail = !activityStatus;
      this.failureMessage = message;
    }

    if (this.successMessage == "") {
      return this.failureMessage;
    } else {
      return this.successMessage;
    }
  }
}
