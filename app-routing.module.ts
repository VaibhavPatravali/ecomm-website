import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { SellerAuthComponent } from '../app/seller-auth/seller-auth.component';
import { SellerHomeComponent } from '../app/seller-home/seller-home.component';
import { SellerAddProductComponent } from '../app/seller-add-product/seller-add-product.component';
import { PagenotfoundComponent } from '../app/pagenotfound/pagenotfound.component';
import { AuthguardGuard } from './authguard.guard';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'seller-auth',
    component: SellerAuthComponent,
  },
  {
    path:'seller-home',
    component: SellerHomeComponent,
    canActivate: [AuthguardGuard]
  },
  {
      path:'seller-add-product',
      component: SellerAddProductComponent,
      canActivate: [AuthguardGuard]
  },
  {
    path:'seller-update-product/:id',
    component: SellerUpdateProductComponent,
    canActivate: [AuthguardGuard]
  },
  {
    path:'search/:query',
    component: SearchComponent,
   // canActivate: [AuthguardGuard]
  },
  {
    path:'user-auth',
    component: UserAuthComponent,
   // canActivate: [AuthguardGuard]
  },
  {
    path:'details/:productId',
    component: ProductDetailsComponent,
   // canActivate: [AuthguardGuard]
  },
  {
    path:'cart',
    component : CartPageComponent
  },
  {
    path: 'checkout',
    component : CheckoutComponent
  },
  {
    path: 'my-orders',
    component : MyOrdersComponent
  },
  {
    path : '**',
    component : PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }