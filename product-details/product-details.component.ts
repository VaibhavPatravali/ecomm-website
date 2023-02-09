import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data-type';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity = 1;
  removeCart = false;
  cartData :undefined | product;
  constructor(private activeroute: ActivatedRoute, private prodService: ProductService) { }

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    let productId = this.activeroute.snapshot.paramMap.get('productId');
    productId && this.prodService.getProduct(productId).subscribe((res) => {
    this.productData = res;
    let cartData = localStorage.getItem('localCart')
    if(productId && cartData){
      let items = JSON.parse(cartData);
      items = items.filter((item:product) => productId === item.id.toString());
      if(items.length){
        this. removeCart = true;
      }else {
        this. removeCart = false;
      }
    }
      if(user){
        this.prodService.getCartList(userId);
        this.prodService.cartData.subscribe((res)=>{
          let item = res.filter((item:product)=> productId?.toString() === item.productId?.toString())
          if(item.length){
            this.cartData = item[0];
            this.removeCart = true;
          }
        })
      }

    })

  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }

  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.prodService.localAddToCart(this.productData);
        this. removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartDetails : cart = {
          ...this.productData,
          productId:this.productData.id,
          userId
        }
        delete cartDetails.id;
        this.prodService.addToCart(cartDetails).subscribe((result) => {
          if(result){
           this.prodService.getCartList(userId);
           this.removeCart = true;
          }
        })
      }
      
    }
  }

  removeFromTheCart(prodId:number){
    if(!localStorage.getItem('user')){
      this.prodService.removeItemFromCart(prodId)
          }else{
            console.warn("cartData", this.cartData);
            
            this.cartData && this.prodService.removeToCart(this.cartData.id)
            .subscribe((result)=>{
              let user = localStorage.getItem('user');
              let userId= user && JSON.parse(user).id;
              this.prodService.getCartList(userId)
            })
          }
          this.removeCart=false
  }

}
