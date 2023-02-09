import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { login, signUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn = new EventEmitter<boolean>(false);
  constructor(private http : HttpClient, private router :Router) { }
  userSignUp(data:signUp){
    return this.http.post('http://localhost:3000/seller', data, {observe:'response'})
    .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('SellerInfo', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
    })
  }

  reloadSelller(){
    if(localStorage.getItem('SellerInfo')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);  
    }

  }

  userLogin(data:login){
     this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, 
     {observe:'response'}
     ).subscribe((result:any) => {
      if(result && result.body && result.body.length){
        localStorage.setItem('SellerInfo', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      } else {
        this.isLoggedIn.emit(true);
      }
     })
  }
}
