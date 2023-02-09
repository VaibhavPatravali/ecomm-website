import { Component, OnInit } from '@angular/core';
import { cart, login, product, signUp } from '../data-type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
  isLoggedIn : boolean = false;
  authError:string="";

  constructor(private userService : UserService, private productService: ProductService ) { }

  ngOnInit(): void {
    this.userService.userAuthReload();
  }

  signup(data:signUp){
    this.userService.userSignUp(data);
  }

  login(data:login){
   this.userService.userLogin(data);
   this.userService.invalidUserAuth.subscribe((res) => {
      if(res){
        this.authError="User Not found";
      } else{
        this.localCartToRemoteCart();
      }
   })
  }

  localCartToRemoteCart(){
  let data = localStorage.getItem('localCart');
  let user = localStorage.getItem('user');
  let userId = user && JSON.parse(user).id;
   if(data){
    let cartDataList : product[] = JSON.parse(data);
    cartDataList.forEach((product:product, index) => {
      let cartData:cart = {
        ...product,
        productId : product.id,
        userId
      }
      delete cartData.id;
      setTimeout(()=>{
        this.productService.addToCart(cartData).subscribe((result)=>{
          if(result){
            console.log('Data Stored in DB');
          }
        })
      },500);
      if(cartDataList.length ===index+1){
        localStorage.removeItem('localCart');
      }
    })
   }
   setTimeout(()=>{
    this.productService.getCartList(userId);
   },2000);
  }
}
