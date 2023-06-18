
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface data{
  url: string;
}

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{
  
  constructor(private http: HttpClient){

  }
  ngOnInit(): void {
          this.http.get('http://localhost:3002/api/v1/logout').subscribe((response: any)=>{
      //console.log('login-'+(response as data).url);
      window.location.href = (response as data).url;
    })

  }
}
