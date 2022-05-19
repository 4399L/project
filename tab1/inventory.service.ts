import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Inventory } from './inventory';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  private getUrl = 'http://109.244.159.129:30000/inventory-service/v1/selectAllInventory';
  private getOneUrl = 'http://109.244.159.129:30000/inventory-service/v1/selectGlobalInventory';
  private deleteUrl = 'http://109.244.159.129:30000/inventory-service/v1/removeInventory';
  private addUrl = 'http://109.244.159.129:30000/inventory-service/v1/addInventory';
  private updateUrl = 'http://109.244.159.129:30000/inventory-service/v1/updateInventory';
  private getAllUrl = 'http://109.244.159.129:30000/inventory-service/v1/getInventoryInfo';
  private addphotoUrl = 'http://109.244.159.129:30000/cloud-service/v1/is/productAdd';
  private getAllshop = 'http://109.244.159.129:30000/shop-service/v1/findAllshop';
  private selectUrl = 'http://109.244.159.129:30000/inventory-service/v1/selectInventory';
  private getAllcategory = 'http://109.244.159.129:30000/config-service/v1/selectCategoryAll';
  private getAlltag = 'http://109.244.159.129:30000/config-service/v1/selectTagAll';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getInventorys(page) {
    return new Promise((resolve, reject) => {
      return this.http.get<any>(this.getUrl + '?pageNum=' + page).subscribe((response) => {
        resolve(response)
      }, (err) => {
        reject(err);
      })
    })
  }

  selectInventory(shopName,status,category,tag,page) {
    return new Promise((resolve, reject) => {
      return this.http.get<any>(this.selectUrl + '?shopName=' + shopName + '&status=' + status + '&category=' + category + '&tag=' + tag + '&pageNum=' + page).subscribe((response) => {
        resolve(response)
      }, (err) => {
        reject(err);
      })
    })
  }
  getShops() {
    return new Promise((resolve, reject) => {
      return this.http.get<any>(this.getAllshop).subscribe((response) => {
        resolve(response)
      }, (err) => {
        reject(err);
      })
    })
  }
  getCategorys() {
    return new Promise((resolve, reject) => {
      return this.http.get<any>(this.getAllcategory).subscribe((response) => {
        resolve(response)
      }, (err) => {
        reject(err);
      })
    })
  }
  getTags() {
    return new Promise((resolve, reject) => {
      return this.http.get<any>(this.getAlltag).subscribe((response) => {
        resolve(response)
      }, (err) => {
        reject(err);
      })
    })
  }

  getAllInventory() {
    return new Promise((resolve, reject) => {
      this.http.get(this.getAllUrl).subscribe((response) => {
        resolve(response)
      }, (err) => {
        reject(err);
      })
    })
  }
  getInventory(var1: any,page:number) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getOneUrl + '?searchKey=' + var1 + '&pageNum' + page).subscribe((response) => {
        resolve(response)
      }, (err) => {
        reject(err);
      })
    })
  }

  addInventory(RequestBody:any): Observable<Inventory> {
    return this.http.post<Inventory>(this.addUrl,RequestBody)
      .pipe(tap(() => console.log(`添加inventory成功`)),
         catchError(this.handleError<Inventory>('addInventory'))
      )
  }

  // addphoto(): Observable<Inventory> {
  //   return this.http.post<Inventory>(this.addphotoUrl)
  //     .pipe(tap(() => console.log(`添加inventory成功`))
  //     )
  // }

  updateInventory(RequestBody:any):Observable<Inventory> {
    return this.http.post<Inventory>(this.updateUrl,RequestBody)
      .pipe(
        tap(_ => console.log(`修改成功`))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  deleteInventory(supplierName:Inventory | string ,styleNumber:Inventory | string) {
    const name = typeof supplierName === 'string' ? supplierName : supplierName.supplierName;
    const number = typeof styleNumber === 'string' ? styleNumber : styleNumber.styleNumber;
    const deleteUrl = `${this.deleteUrl}?supplierName=${name}&styleNumber=${number}`;
    

    return this.http.post<Inventory>(deleteUrl, this.httpOptions).pipe(
      tap(_ => console.log(`删除 inventory supplierName=${name},删除 inventory styleNumber=${number}`)),
    )
  }

}