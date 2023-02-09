import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login, signUp } from '../data-type';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {

  isSignedIn : boolean = false;
  hasError = '';

  constructor(private seller : SellerService, private route :Router) { }

  ngOnInit(): void {
    this.seller.reloadSelller();
  }

  signUp(val:signUp) : void{
    this.seller.userSignUp(val);
  }

  login(val:login): void{
    this.hasError = '';
      this.seller.userLogin(val);
      this.seller.isLoggedIn.subscribe((isError)=>{
        if(isError){
            this.hasError = 'Incorrect Email or Password'
        }
      })
  }
}
