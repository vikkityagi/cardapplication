import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-draft-list',
  templateUrl: './draft-list.component.html',
  styleUrls: ['./draft-list.component.css']
})
export class DraftListComponent implements OnInit { 

  userId: any;
  applicationType: string="";
  checkDraft = false;
  draftList: any = []

  constructor(private route: ActivatedRoute,
    private authService: AuthserviceService){
  }
  ngOnInit(){

    //console.log("draft list called")

    this.userId = this.route.snapshot.params['userId'];
    this.applicationType = 'Nodal Registration';

    this.authService.draftlist(this.applicationType).subscribe(draftData=>{

      this.draftList = draftData

    },(err)=>{

    })


    
  }


  

}
