import { query } from '@angular/animations';
import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private route : Router, private prodservice: ProductService) { }
  menuType = "default";
  sellerName="";
  userName="";
  searchResult : undefined | product[];
  cartItems = 0;

  ngOnInit(): void {
    this.route.events.subscribe((val : any) => {
     if(val.url){
        if(localStorage.getItem('SellerInfo') && val.url.includes('seller')){
          this.menuType = 'seller';
          let sellerStore = localStorage.getItem('SellerInfo');
          let sellerData = sellerStore && JSON.parse(sellerStore);
          this.sellerName = sellerData.name
        } else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.prodservice.getCartList(userData.id);

        }else{
         this.menuType = 'default';
        }
     }
    })
    let cartData = localStorage.getItem('localCart');
      if(cartData){
        this.cartItems = JSON.parse(cartData).length;
      }
      this.prodservice.cartData.subscribe((items)=>{
        this.cartItems = items.length;
      })
  }
  
  searchProducts(eve :any){
    if(eve){
     const ele = eve.target.value;
     this.prodservice.searchProduct(ele).subscribe((result)=> {
      //  if(result.length > 5){
      //   result.length = length;
      //  }
       this.searchResult = result;
     })
    
    }
  }

  sellerLogout(){
    localStorage.removeItem('SellerInfo');
    this.route.navigate(['/']);
  }

  redirectToDetails(id:number){
    this.route.navigate(['details/' + id]);
  }
  
  hideSearch(){
    this.searchResult = undefined;
  }

  submitSearch(val:string){
    this.route.navigate([`search/${val}`]);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['user-auth']);
    this.prodservice.cartData.emit([]);
  }
}
