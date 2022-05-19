import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddInventoryPageRoutingModule } from './add-inventory-routing.module';

import { AddInventoryPage } from './add-inventory.page';

@NgModule({
  imports: [
    //BrowserModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AddInventoryPageRoutingModule
  ],
  declarations: [AddInventoryPage]
})
export class AddInventoryPageModule {}
