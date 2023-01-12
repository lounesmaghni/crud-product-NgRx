import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Product} from "../models/products.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private host=environment.host;
 // host=Math.random()>0.2?environment.host:environment.unreachableHost;

  constructor( private http:HttpClient) { }

  public getAllProducts():Observable<Product[]>{
   // let
    return this.http.get<Product[]>(this.host+"/products");
  }
  public getSelectedProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"/products?selected=true");
  }
  public getAvailableProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"/products?available=true");
  }
  public searchProducts(Keyword:string):Observable<Product[]>{
    return this.http.get<Product[]>(this.host+"/products?name_like="+Keyword);
  }
  public selectProduct(product:Product):Observable<Product>{
  /*  product.selected=!product.selected;*/
    return this.http.put<Product>(this.host+"/products/"+product.id,{...product,selected:!product.selected});
  }
  public deleteProduct(id:number):Observable<void>{
    return this.http.delete<void>(this.host+"/products/"+id);
  }
  public saveProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(this.host+"/products",product);
  }
  public getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(this.host+"/products/"+id);
  }
  public updateProduct(product:Product):Observable<Product>{
    return this.http.put<Product>(this.host+"/products/"+product.id,product);
  }
}
