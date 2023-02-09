import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product [];
  productMessage="";

  constructor(private productservice: ProductService) { }

  ngOnInit(): void {
   this.listProduct();
  }

  listProduct(){
    this.productservice.productList().subscribe((res)=>{
      this.productList = res;
    })
  }

  deleteProduct(id:number){
    let productDetails : any;
    this.productservice.deleteProduct(id).subscribe((res)=>{
        if(res){
          productDetails = this.productList?.filter((result)=> result.id == id);
            this.productMessage = `Product ${productDetails[0].name} is deleted`;
        }
        this.listProduct();
    });
    setTimeout(()=> {
      this.productMessage = "";
    }, 3000);
  }
}
