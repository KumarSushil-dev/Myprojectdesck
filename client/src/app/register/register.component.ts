import { Component } from '@angular/core'
import { AuthenticationService , TokenPayload } from '../authentication.service'
import { Router } from '@angular/router';

@Component({
    templateUrl :'./register.component.html'
   
   })
   export class RegisterComponent {
    credentials:TokenPayload={
        id:0,
        firstname:'',
        lastname:'',
        email:'',
        password:''



    }
constructor(private auth:AuthenticationService ,private router:Router){}

register(){
this.auth.register(this.credentials).subscribe(
()=>{
this.router.navigateByUrl('/profile')

},
    (err: any) =>{

    console.error(err)

}

)

}

   }