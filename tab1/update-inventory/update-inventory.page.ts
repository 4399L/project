import { Component, OnInit } from '@angular/core';
import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-update-inventory',
  templateUrl: './update-inventory.page.html',
  styleUrls: ['./update-inventory.page.scss'],
})
export class UpdateInventoryPage implements OnInit {
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
  public type: string
  public tag: string
  public status: string
  public upTime: string
  public downTime: string
  public page:any=1
  public badge = true;
  public update = false; 

  constructor(private inventoryService: InventoryService, public alertController: AlertController, private router: Router, public http: HttpClient, public activatedRoute: ActivatedRoute,public nav: NavController) { }

  inventorys: Inventory[];

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      (data: any) => {
        this.accountId = data.accountId,
          this.supplierName = data.supplierName,
          this.shopName = data.shopName,
          this.styleNumber = data.styleNumber,
          this.photo = data.photo,
          this.quantity = data.quantity,
          this.cost = data.cost,
          this.price = data.price,
          this.name = data.name,
          this.color = data.color,
          this.size = data.size,
          this.type = data.type,
          this.tag = data.tag,
          this.status = data.status,
          this.upTime = data.upTime,
          this.downTime = data.downTime
      }
    )
  }
  
  onSubmit() {
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
      "type": this.type,
      "tag": this.tag,
      "status": this.status,
      "upTime": this.upTime,
      "downTime": this.downTime,
      "photo": this.photo,
    }
    this.inventoryService.updateInventory(RequestBody).subscribe()
    this.back();
  }

  getInventorys() {
    this.inventoryService.getInventorys(this.page).then((response: any) => {
      console.log(response);
      this.inventorys = response.data;
     
    })
  }
  back() {
    this.router.navigate(['/tab1']);
    this.getInventorys();
  }
  edit(){
    document.getElementById("shopName").setAttribute('readOnly','false');
    document.getElementById("quatity").setAttribute('readOnly','false');
    document.getElementById("photo").setAttribute('readOnly','false');
    document.getElementById("cost").setAttribute('readOnly','false');
    document.getElementById("price").setAttribute('readOnly','false');
    document.getElementById("name").setAttribute('readOnly','false');
    document.getElementById("color").setAttribute('readOnly','false');
    document.getElementById("size").setAttribute('readOnly','false');
    document.getElementById("type").setAttribute('readOnly','false');
    document.getElementById("tag").setAttribute('readOnly','false');
    document.getElementById("status").setAttribute('readOnly','false');
    document.getElementById("upTime").setAttribute('readOnly','false');
    document.getElementById("downTime").setAttribute('readOnly','false');
    this.update=true;
  }
  // goBack() {
  //   this.nav.back();
  // }
//   fun1(){
//     this.inventoryService.getInventorys(this.page).then((response: any) => {
//       console.log(response);
//       this.inventorys = response.data;
//   })
// }
}



