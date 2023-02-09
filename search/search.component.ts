import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchResult : undefined | product[];
  constructor(private activeroute: ActivatedRoute, private prodService: ProductService) { }

  ngOnInit(): void {
   let query = this.activeroute.snapshot.paramMap.get('query');
   query && this.prodService.searchProduct(query).subscribe((res)=>{
      if(res.length){
        this.searchResult = res;
      }
    })
  }

}
