import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/inventory', pathMatch: 'full' },
  { path: 'inventory', loadChildren: () => import('@inventory/inventory.module').then(mod => mod.InventoryModule) },
  { path: 'cart', loadChildren: () => import('@cart/cart.module').then(mod => mod.CartModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
