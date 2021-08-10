import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFullName: string;

  storage: Storage = sessionStorage;
  
  constructor(private oktaAuthService: OktaAuthService) {}

  ngOnInit(): void {
    // subscibe to the authenticateion state
    this.oktaAuthService.$authenticationState.subscribe(
    (result) => {
      this.isAuthenticated = result;
      this.getUserDetails();
      }
      );
  }
  getUserDetails() {
    if (this.isAuthenticated) {
      // fetch the logged in user details ( user's claims)

      // user full name is exposed as a property

      this.oktaAuthService.getUser().then(
      (res) => {
        this.userFullName = res.name!;

        // retrive the user's email for authentication purpose
        const theEmail = res.email!;

        // stor the email in browser storage
        this.storage.setItem('userEmail', JSON.stringify(theEmail));

       console.log(theEmail);
       
      });
    }
  }

  logout() {
    //  terminates the session with okta and removes current tokens
    this.oktaAuthService.signOut();
  }
}
