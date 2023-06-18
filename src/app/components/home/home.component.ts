import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ParichayUser } from "../../models/ParichayUser";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthserviceService } from "../../services/auth.service";
import { CookieService } from "ngx-cookie-service";
import { AppComponent } from "src/app/app.component";
import { AuthGuardServiceService } from "src/app/auth-guard-service.service";

interface parichayController {
  id: number;
}
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  homeform: any = FormGroup;
  string1: string;
  userData: ParichayUser = <ParichayUser>{};
  parichayUserId: any;
  parichayId: any;
  roleList: any;
  roleName: any;
  appComponent: any = String;
// utput() userVerifiedEvent = new EventEmitter<void>();


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private authservice: AuthserviceService,
    private cookie: CookieService,
    private authGuardService: AuthGuardServiceService
  ) {
    this.string1 = "";
    // this.userData = "";
  }
  ngOnInit() {

    //without login get the body content
    
    localStorage.setItem("parichayId",'vikram.singh85');
    localStorage.setItem("parichayUserId",'1');
    localStorage.setItem("currentUserId",'1');
    

    this.authservice
      .getRoleList(localStorage.getItem("parichayUserId"))
      .subscribe((data) => {
        
        this.roleList = data;

        // here we give the navigation service
        this.authGuardService.login();
        
        this.appComponent = localStorage.getItem("appComponent");
        this.appComponent = "true";
        localStorage.setItem("appComponent", this.appComponent);
        //console.log("parichayId"+localStorage.getItem("parichayId"))
      });

    this.homeform = this.fb.group({
      option: [],
    });
    
      

  
    
  };

  submithomeform(){
    this.router.navigate([this.homeform.get('option').value])
  }
}