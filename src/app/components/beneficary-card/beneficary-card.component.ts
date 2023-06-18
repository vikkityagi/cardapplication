import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthserviceService } from "src/app/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatStepper } from "@angular/material/stepper";
import { BenRegistrationApplication } from "./BenRegistrationApplication";
import { PrimaryBeneficiary } from "./PrimaryBeneficiary";
import { BenFormService } from "src/app/services/ben-form.service";

@Component({
  selector: "app-beneficary-card",
  templateUrl: "./beneficary-card.component.html",
  styleUrls: ["./beneficary-card.component.css"],
})

export class BeneficaryCardComponent implements OnInit,AfterViewInit {
  submitForm: any = FormGroup;
  beneficaryform: any = FormGroup;
  familydetailform: any = FormGroup;
  esignForm: any = FormGroup;
  // ChooseNodalOfficer: any = FormGroup;
  netresult: any;
  parichayId: any;
  applicationId : any;

  benRegistrationData!: BenRegistrationApplication;
  primaryBeneficiaryData!: PrimaryBeneficiary;
  familyData: any;
  
  family_member: any;
  showBeneficiaryTable = false;
  index = 10;
  // NodalOfficer: any;
  showNodal = false;
  showFinalSubmit = true;
  showSend = false;
  showIndex : number = 0;
  isLinear:boolean = true;
  applicationSubmitted: boolean = false;
  applicationSubmittedMessage : string =  '';
  ministryNameResponse: any;
  departmentNameResponse: any;
  organizationNameResponse: any;
  @ViewChild('stepper') stepper!: MatStepper;
  message: any;
  WardEntitlement: any;
  nodalOfficerList: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authservice: AuthserviceService,
    private router: Router,
    private route: ActivatedRoute,
    private benService: BenFormService
  ) {
    this.parichayId = 1245;
    //console.log(this.parichayId);
    //console.log("beneficary-card render");
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngAfterViewInit(): void {
   // this.showIndex = 2;
  
  }
 
  ngOnInit(): void {
    
    //console.log("ben card ngoninit called");
    this.route.queryParams
    .subscribe(params => {
      //console.log("ben card query params - "+JSON.stringify(params)); 
      this.applicationId = params['applicationId'];
      
      this.message = params['message'];
      //console.log("this.message-"+this.message); 
      //console.log(this.applicationId); 
      this.selectionChange();
    } );
    this.submitForm = this.fb.group({
      // parichay: ["",Validators.required],
      nodalOfficerId: ["", Validators.required],
    });
  }

  selectionChange() {
  
    //console.log('ben card application id>>'+this.applicationId)
     //console.log("run selection change")
      this.authservice.getFamilyMembersByPrimaryBeneficiaryId(this.applicationId)
    .subscribe((familyMemberData: any) => {
      //console.log("familyMemberData-"+familyMemberData);
      this.familyData = familyMemberData;
    });

    this.authservice.getBenRegistratinApplication(this.applicationId).subscribe((data) => {

      //console.log("ben card benRegistrationResponse - " + data);
      this.benRegistrationData = data as BenRegistrationApplication;
      //console.log('ben card this.benRegistrationData.id'+this.benRegistrationData.id);

      this.authservice
        .getPrimaryBeneficiaryByBenRegistrationId(this.benRegistrationData.id)
        .subscribe((primaryBeneficiary:PrimaryBeneficiary[]) => {
         
          this.primaryBeneficiaryData =
              primaryBeneficiary[0];
            console.log('data>>>'+JSON.stringify(this.primaryBeneficiaryData));
           
            this.benService.getMinitryName(this.primaryBeneficiaryData.ministry).subscribe(data=>{
              this.ministryNameResponse = data;
            });
            
            this.benService.getDepartmentName(this.primaryBeneficiaryData.department).subscribe(data=>{
              this.departmentNameResponse = data;
            });

            this.benService.getOrganizationName(this.primaryBeneficiaryData.organization).subscribe(data=>{
              this.organizationNameResponse = data;
            });

            this.benService.getNameofWardEntitlement(this.primaryBeneficiaryData.wardentitlement).subscribe(data=>{
              this.WardEntitlement = data;
              //console.log('wardentitlement>>'+JSON.stringify(this.WardEntitlement))
            })
            this.benService.getNodalOfficerList(this.primaryBeneficiaryData.organization).subscribe(data=>{
              this.nodalOfficerList = data;
              //console.log('nodalOfficerList>>'+JSON.stringify(this.nodalOfficerList))
            })
            

          this.authservice
            .getFamilyMembersByPrimaryBeneficiaryId(this.applicationId)
            .subscribe((familyMemberData: any) => {
              // //console.log('family member - '+familyMemberData.email)
              this.family_member = familyMemberData;
              // for(var i=0;i<100;i++){
              //   counter+=1;
              // }
              this.showBeneficiaryTable = true;
            });
        });
    });
    }
  

  finalSubmit() {
    //console.log('this.applicationId final'+this.applicationId)
    if(this.applicationId!=null){

    this.authservice.getBenRegistratinApplication(this.applicationId).subscribe((data) => {
      this.benRegistrationData = data as BenRegistrationApplication;
      //console.log('this.benRegistrationData.id final>>>'+this.benRegistrationData.id);

      this.authservice
        .finalSubmission(this.benRegistrationData.id)
        .subscribe((updateddata) => {
          this.benRegistrationData = updateddata as BenRegistrationApplication;
          //console.log('this.benRegistrationData.id updated>>>'+this.benRegistrationData.id);

          this.authservice
            .getPrimaryBeneficiaryByBenRegistrationId(this.benRegistrationData.id)
            .subscribe((primaryBeneficiary:PrimaryBeneficiary[]) => {
              if(primaryBeneficiary.length>1)
              this.primaryBeneficiaryData = primaryBeneficiary[0];
              //console.log(
                // "organization>>>" + this.primaryBeneficiaryData.organization
              // );
              let nodalOfficerId = this.submitForm.get('nodalOfficerId').value
              let currentUserId = localStorage.getItem('currentUserId');
              this.http.post<any>('http://localhost:3002/api/v1/movements',
              {'actionType': 1,'fromUserId':currentUserId,'toUserId':nodalOfficerId,'applicationId':this.benRegistrationData.id}).subscribe(movementdata=>{
                //const res = String(data.id);
                //localStorage.setItem("id",res);
                //alert("done");
                this.applicationSubmitted = true;
                this.applicationSubmittedMessage = "Submitted";
              })
              // this.showNodal = true;
              this.showFinalSubmit = false;
              // data send into movement
              // this.showSend = true;
            });
        });
    });
    }else{
      //alert("please check all form")
    }
    
  }

  // submitNodalOfficer(){
  //   //console.log("nodal sobmit>>"+this.ChooseNodalOfficer.nodalid);
  // }
}
