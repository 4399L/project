import { Component, OnInit } from '@angular/core';
import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.page.html',
  styleUrls: ['./add-inventory.page.scss'],
})
export class AddInventoryPage implements OnInit {

  constructor(private inventoryService: InventoryService, public alertController: AlertController, private router: Router, public http: HttpClient, public nav: NavController) { }
  inventorys: Inventory[];
  public page: any = 1
  public var1: any;

  public accountId: string
  public supplierName: string
  public shopName: string
  public styleNumber: string
  public photo: string
  public quantity: number
  public cost: number
  public price: number
  public name: string
  public color: string
  public size: string
  public category: string
  public tag:string
  public status: boolean
  public upTime: string
  public downTime: string 

  ngOnInit() {
    this.accountId
    this.supplierName
    this.shopName
    this.styleNumber
    this.quantity
    this.cost 
    this.price 
    this.name 
    this.color 
    this.size 
    this.category 
    this.tag 
    this.status 
    this.upTime 
    this.downTime 
    this.photo 
  }



  async onSubmit() {
    const RequestBody = {
      "accountId": this.accountId,
      "supplierName": this.supplierName,
      "shopName": this.shopName,
      "styleNumber": this.styleNumber,
      "quantity": this.quantity,
      "cost": this.cost,
      "price": this.price,
      "name": this.name,
      "color": this.color,
      "size": this.size,
      "category": this.category,
      "tag": this.tag,
      "status": this.status,
      "upTime": this.upTime,
      "downTime": this.downTime,
      "photo": this.photo,
    }
    if (await this.inventoryService.getInventory(this.var1,this.page)==this.styleNumber) {
      this.presentAlertConfirm();
    }
    else {
      this.inventoryService.addInventory(RequestBody).subscribe();
      this.back();
    }
  }


  getInventorys() {
    this.inventoryService.getInventorys(this.page).then((response: any) => {
      console.log(response);
      this.inventorys = response.data;
    })
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '提示!',
      message: '商品重复，新增失败！',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });

    await alert.present();
  }

  back() {
    this.router.navigate(['/tab1']);
    this.getInventorys();
  }
  goBack() {
    this.nav.back();
  }
}


