import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inventory } from './inventory';
import { InventoryService } from './inventory.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  formGroup: FormGroup;
  inventorys: Inventory[];
  public shops: [];
  public categorys: [];
  public tags: [];
  public productTypes: number;
  public inventoryTotal: number;
  public totalCost: number;
  public warnNum: number;
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
  public tag: string
  public status: boolean
  public upTime: string
  public downTime: string
  public page = 2;
  public var1;
  public var2: any;
  public var3;
  public hasMore = true;
  public noOne = true;
  public badge;
  searchText: ''

  constructor(private inventoryService: InventoryService, private fb: FormBuilder, public alertController: AlertController, private router: Router, private actRoute: ActivatedRoute, public activatedRoute: ActivatedRoute) { this.status = false; }
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  ngOnInit() {
    this.status = true;
    this.shopName = "兴欣商店";
    this.category = "";
    this.tag = "";
    this.selectInventory(this.shopName, this.status, this.category, this.tag, this.page);
    this.getAllInventory();
    this.getShops();
    this.getCategorys();
    this.getTags();
  }

  getInventorys() {
    var page = 1
    this.inventoryService.getInventorys(page).then((response: any) => {
      console.log(response);
      this.inventorys = response.data;
      if (response.data.length == 0) {
        this.noOne = false;
      }
      for (let i = 0; i < response.data.length; i++) {
        if (this.inventorys[i].quantity < 10) {
          this.inventorys[i].badge = true;
        }
      }
    })
  }
  getShops() {
    this.inventoryService.getShops().then((response: any) => {
      this.shops = response.data;
    })
  }
  getCategorys() {
    this.inventoryService.getCategorys().then((response: any) => {
      this.categorys = response.data;
    })
  }
  getTags() {
    this.inventoryService.getTags().then((response: any) => {
      this.tags = response.data;
    })
  }

  selectInventory(shopName, status, category, tag, page) {
    page = 1;
    this.inventoryService.selectInventory(shopName, status, category, tag, page).then((response: any) => {
      console.log(response);
      this.inventorys = response.data;
      if(response.data == null){
        this.noOne = false;
        this.hasMore = true;
        this.infiniteScroll.disabled = true;
      }
      if (response.data.length <= 10 && response.data.length > 0) {
        this.noOne = true;
        for (let i = 0; i < response.data.length; i++) {
          if (this.inventorys[i].quantity < 10) {
            this.inventorys[i].badge = true;
          }
        }
        this.infiniteScroll.disabled = true;
        this.page = 2;
      } 
      else {
        this.noOne = true
        for (let i = 0; i < response.data.length; i++) {
          if (this.inventorys[i].quantity < 10) {
            this.inventorys[i].badge = true;
          }
        }
      }
    })
  }
  getInventory(var1: any, page: number) {
    this.inventoryService.getInventory(var1, page).then((response: any) => {
      console.log(response);
      this.inventorys = response.data;
      // for (let i = 0; i < this.inventorys.length; i++) {
      //   if (this.inventorys[i].quantity < 10) {
      //     this.inventorys[i].badge = true;
      //   }
      // }
    })
  }
  getInventory1(var1: any, page: number) {
    this.inventoryService.getInventory(var1, page).then((response: any) => {
      console.log(response);
      this.inventorys = response.data;
      for (let i = 0; i < this.inventorys.length; i++) {
        if (this.inventorys[i].quantity < 10) {
          this.inventorys[i].badge = true;
        }
      }
    })
  }

  getAllInventory() {
    this.inventoryService.getAllInventory().then((response: any) => {
      for (var i in response.data) {
        if (i == "productTypes") {
          this.productTypes = response.data[i];
        }
        if (i == "inventoryTotal") {
          this.inventoryTotal = response.data[i];
        }
        if (i == "totalCost") {
          this.totalCost = response.data[i];
        }
        if (i == "warnNum") {
          this.warnNum = response.data[i];
        }
      }
      // for (let i = 0; i < this.inventorys.length; i++) {
      //   if (this.inventorys[i].quantity < 10) {
      //     this.inventorys[i].badge = true;
      //   }
      // }
    })
  }

  deleteInventory(supplierName: string, styleNumber: string) {
    this.inventoryService.deleteInventory(supplierName, styleNumber).subscribe(
      (data) => {
        console.log("Inventory delete: " + data);
        this.getInventorys()
      }
    )
  }
  getItem(ev: any) {
    this.hasMore = true;
    this.var2 = ev.target.value;
    if (this.searchText == null) {
      this.infiniteScroll.disabled = !this.infiniteScroll.disabled
      this.hasMore = false;
    }
  }
  getItem1() {
    this.hasMore = true;
    this.selectInventory(this.shopName, this.status, this.category, this.tag, this.page);
  }
  search() {
    this.getInventory(this.var2, this.page);
  }
  change(event) {
    this.var1 = event.target.value;
    this.status = true;
    this.category = "";
    this.tag = "";
    this.selectInventory(this.var1, this.status, this.category, this.tag, this.page);
  }
  change1(event) {
    this.var1 = event.target.value;
    this.selectInventory(this.shopName, this.status, this.var1, this.tag, this.page);
  }
  change2(event) {
    this.var1 = event.target.value;
    this.selectInventory(this.shopName, this.status, this.category, this.var1, this.page);
  }
  cancel(ev: any) {
    this.status = true;
    this.getInventory(this.status, this.page);
    this.hasMore = false
    this.infiniteScroll.disabled = false
  }
  doRefresh(event) {
    setTimeout(
      () => {
        this.status = true;
        this.category = "";
        this.tag = "";
        this.selectInventory(this.shopName, this.status, this.category, this.tag, this.page);
        event.target.complete()
        this.hasMore = true;
      }, 1000)
    this.infiniteScroll.disabled = false

  }
  loadMore(event) {
    setTimeout(() => {
      this.inventoryService.selectInventory(this.shopName, this.status, this.category, this.tag, this.page).then((response: any) => {
        //console.log(response);
        if (response.data.length < 10) {
          event.target.disabled = true;
          this.hasMore = false;
          this.page = 2;
        } else {
          this.inventorys = this.inventorys.concat(response.data);
          ++this.page;
        }
        event.target.complete();//请求完成数据以后告诉ion-infinite-scroll更新数据
        for (let i = 10; i < this.inventorys.length; i++) {
          if (this.inventorys[i].quantity < 10) {
            this.inventorys[i].badge = true;
          }
        }
      })
    }, 1000);
  }

  async presentAlertConfirm(supplierName, styleNumber) {
    const alert = await this.alertController.create({
      header: "确定要删除商品 " + styleNumber + " 吗?",
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确认',
          cssClass: 'confirm',
          handler: () => {
            this.deleteInventory(supplierName, styleNumber)
          }
        }
      ]
    });
    await alert.present();
  }
}

