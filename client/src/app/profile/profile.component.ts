import { Component } from '@angular/core'
import { AuthenticationService , UserDetails } from '../authentication.service'
import { Router } from '@angular/router';

@Component({
    templateUrl :'./profile.component.html'
   
   })
   export class ProfileComponent {

    details:UserDetails | undefined

constructor(private auth:AuthenticationService ){}

ngOnInit(){
this.auth.profile().subscribe(
user =>{
    this.details=user
},
    (err: any) =>{

    console.error(err)

}

)

}

   }