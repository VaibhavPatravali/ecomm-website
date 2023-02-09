import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { isEmpty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();

  constructor(private http : HttpClient,) { }

  addProduct(data:product){
   return this.http.post('http://localhost:3000/products', data);
  }

  productList(){
    return this.http.get<product[]>('http://localhost:3000/products');
  }

  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(product:product){
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`, product)
  }

  popularProduct(){
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=3`);
  }

  trendyProducts(){
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=10`);
  }

  searchProduct(query:string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddToCart(data: product) {
    let addMoreToCart :any = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      addMoreToCart = JSON.parse(localCart);
        addMoreToCart.push(data);
      localStorage.setItem('localCart', JSON.stringify(addMoreToCart));
      this.cartData.emit(addMoreToCart);
    }
  }
 
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData : cart){
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: number){
    return this.http.get<product[]>('http://localhost:3000/cart?userId' + userId,{
      observe:'response'
    }).subscribe((result) => {
      if(result && result.body){
        this.cartData.emit(result.body);
      }
    });
  }  

  removeToCart(cartId:number){
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }

  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+ userData.id);
  }

  orderNow(data:order){
    return this.http.post('http://localhost:3000/order',data);
  }

  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId=' + userData.id);
  }

  deleteCartItems(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId).subscribe((result) => {
      this.cartData.emit([]);
    })
  }
}
