import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Inventory } from '../inventory';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
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
  public badge: boolean
  public update=false;
  public page:any=1
  inventorys: Inventory[];

  constructor(private inventoryService: InventoryService, public router: Router,
    public activatedRoute: ActivatedRoute) { }
    edit1(){
      document.getElementById("shopName").setAttribute('readonly','false');
      document.getElementById("quantity").setAttribute('readonly','false');
      document.getElementById("photo").setAttribute('readonly','false');
      document.getElementById("cost").setAttribute('readonly','false');
      document.getElementById("price").setAttribute('readonly','false');
      document.getElementById("name").setAttribute('readonly','false');
      document.getElementById("color").setAttribute('readonly','false');
      document.getElementById("size").setAttribute('disabled','false');
      document.getElementById("category").setAttribute('readonly','false');
      document.getElementById("tag").setAttribute('readonly','false');
      document.getElementById("status").setAttribute('disabled','false');
      document.getElementById("upTime").setAttribute('readonly','false');
      document.getElementById("downTime").setAttribute('readonly','false');
      this.update=true;
      this.badge=false;
    }
    edit2(){
      document.getElementById("shopName").setAttribute('readonly','true');
      document.getElementById("quantity").setAttribute('readonly','true');
      document.getElementById("photo").setAttribute('readonly','true');
      document.getElementById("cost").setAttribute('readonly','true');
      document.getElementById("price").setAttribute('readonly','true');
      document.getElementById("name").setAttribute('readonly','true');
      document.getElementById("color").setAttribute('readonly','true');
      document.getElementById("size").setAttribute('disabled','true');
      document.getElementById("category").setAttribute('readonly','true');
      document.getElementById("tag").setAttribute('readonly','true');
      document.getElementById("status").setAttribute('disabled','true');
      document.getElementById("upTime").setAttribute('readonly','true');
      document.getElementById("downTime").setAttribute('readonly','true');
      this.update=false;
      this.badge=true;
    }
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
          this.category = data.category,
          this.tag = data.tag,
          this.status = data.status,
          this.upTime = data.upTime,
          this.downTime = data.downTime
          this.badge = data.badge
    } )
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
        "category": this.category,
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
}
