import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent implements OnInit {
  productData : undefined | product;
  productMessage : undefined | string;

  constructor(private route: ActivatedRoute, private prodService: ProductService, private routerLink :Router) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    this.getProductDetails(productId);
  }

  getProductDetails(id:any){
    this.prodService.getProduct(id).subscribe((result)=>{
        this.productData = result;
    })
  }

  submit(data:any){
     if(this.productData){
        data.id = this.productData.id;
     }
     this.prodService.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage = "Product Has been Updated Successfully";
      }
     })
     setTimeout(()=>{
      this.productMessage="";
      this.routerLink.navigate(['/seller-home'])
     },3000)
  }

}
