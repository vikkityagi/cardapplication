import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface data{
  url: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: HttpClient
  ){

  }

  ngOnInit(): void {
    //console.log('ng called');
    this.http.get('http://localhost:3002/api/v1/login').subscribe((response: any)=>{
      //console.log("login call")
      //console.log('login-'+(response as data).url);
      //alert((response as data).url)
      window.location.href = (response as data).url;
    })
    
    
  }


  
  


}
