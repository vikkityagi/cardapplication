import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CghsUserService } from "src/app/services/cghs-user.service";

@Component({
  selector: "app-cghs-user-view",
  templateUrl: "./cghs-user-view.component.html",
  styleUrls: ["./cghs-user-view.component.css"],
})
export class CghsUserViewComponent implements OnInit {
  userId: any;
  userData: any;
  esignForm: any = FormGroup;
  eSignRequestObject: any;
  showUser = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private service: CghsUserService
  ) {
    this.userId = activatedRoute.snapshot.paramMap.get("id");
    console.log(this.userId);
  }

  ngOnInit(): void {
    this.esignForm = this.fb.group({
      xml: [],
      username: [],
      clientrequestURL: [],
    });

    // getting the cghsIncharge Data
    this.service.getCghsUserData(this.userId).subscribe(
      (data) => {
        this.userData = data;
        this.showUser = true;

        // esign here
        this.service.eSignCghsUser(this.userId).subscribe(
          (data) => {
            this.eSignRequestObject = data;
          },
          (error) => {
            console.log("ESign Error>>" + error);
          }
        );
      },
      (error) => {
        console.log("Fetch Error>>" + error);
      }
    );


    // ng end
  }

  ngAfterViewInit() {}

  eSignApplication(applicationId: any, event: any): void {
    this.esignForm.get("xml")?.setValue(this.eSignRequestObject.xml);
    this.esignForm.get("username")?.setValue(this.eSignRequestObject.username);
    this.esignForm
      .get("clientrequestURL")
      ?.setValue(this.eSignRequestObject.responseUrl);
    
    console.log("eSignApplication called " + applicationId);
    console.log(this.esignForm.value);
    let myheaders = new HttpHeaders();
    myheaders.append("Content-Type", "application/json");
    myheaders.append("aceept", "application/json");

    


    //console.log(this.esignForm.value);
    event.target.submit();
  }
}
