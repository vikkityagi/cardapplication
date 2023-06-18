import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ben-draft-list',
  templateUrl: './ben-draft-list.component.html',
  styleUrls: ['./ben-draft-list.component.css']
})
export class BenDraftListComponent {

  userId: any;
  applicationType: any;
  checkDraft = false;
  draftList: any = []
  constructor(private route: ActivatedRoute,
    private authService: AuthserviceService){

  } 
  ngOnInit(){

    // console.log("draft list called")

    this.userId = this.route.snapshot.params['userId'];
    this.applicationType = 'BenRegistration';

    this.authService.draftlist(this.applicationType).subscribe(draftData=>{

      this.draftList = draftData

    },(err)=>{

    })

}
}
