import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent implements OnInit {

  productMessage="";
  constructor(private productservice: ProductService) { }

  ngOnInit(): void {
   
  }

  submit(data:product, addproduct :NgForm){
    this.productservice.addProduct(data).subscribe((res)=>{
      if(res){
        this.productMessage="Product Added Successfully";
      }
      setTimeout(()=>this.productMessage="",3000);
    })
  }
}
