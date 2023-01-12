import {Injectable} from "@angular/core";
import {ProductsService} from "../services/products.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {Observable} from "rxjs";
import {
  DeleteProductActionError,
  DeleteProductActionSuccess, EditProductActionError, EditProductActionSuccess,
  GetAllProductsActionError,
  GetAllProductsActionSuccess, GetSelectedProductsActionError,
  GetSelectedProductsActionSuccess, NewProductActionSuccess,
  ProductsActions,
  ProductsActionsTypes, SaveProductActionError, SaveProductActionSuccess,
  SearchProductsActionError,
  SearchProductsActionSuccess, SelectProductActionError,
  SelectProductActionSuccess, UpdateProductActionError, UpdateProductActionSuccess
} from "./products.actions";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class ProductsEffects{
  constructor(private productsService: ProductsService, private effectActions: Actions){
  }

//Get all products Effect
  getAllProductsEffect: Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_ALL_PRODUCTS),
      mergeMap((action: ProductsActions)=>{
        return this.productsService.getAllProducts()
          .pipe(
            map((products)=>new GetAllProductsActionSuccess(products)),
            catchError((err)=>of(new GetAllProductsActionError(err.message)))
          )
      })
    )
  );
  //Get selected products Effect
  getSelectedProductsEffect: Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_SELECTED_PRODUCTS),
      mergeMap((action: ProductsActions)=>{
        return this.productsService.getSelectedProducts()
          .pipe(
            map((products)=>new GetSelectedProductsActionSuccess(products)),
            catchError((err)=>of(new GetSelectedProductsActionError(err.message)))
          )
      })
    )
  );
  //Search products Effect
  searchProductsEffect: Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.SEARCH_PRODUCTS),
      mergeMap((action: ProductsActions)=>{
        return this.productsService.searchProducts(action.payload)
          .pipe(
            map((products)=>new SearchProductsActionSuccess(products)),
            catchError((err)=>of(new SearchProductsActionError(err.message)))
          )
      })
    )
  );

  //Select product Effect
  selectProductEffect: Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.SELECT_PRODUCT),
      mergeMap((action: ProductsActions)=>{
        return this.productsService.selectProduct(action.payload)
          .pipe(
            map((product)=>new SelectProductActionSuccess(product)),
            catchError((err)=>of(new SelectProductActionError(err.message)))
          )
      })
    )
  );

  //Delete product Effect
  deleteProductEffect: Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.DELETE_PRODUCT),
      mergeMap((action: ProductsActions)=>{
        return this.productsService.deleteProduct(action.payload.id)
          .pipe(
            map(()=>new DeleteProductActionSuccess(action.payload)),
            catchError((err)=>of(new DeleteProductActionError(err.message)))
          )
      })
    )
  );

  //New product Effect
  newProductEffect: Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.NEW_PRODUCT),
      map((action: ProductsActions)=>{
        return new NewProductActionSuccess({});
      })
    )
  );

  //Save product Effect
  saveProductEffect: Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.SAVE_PRODUCT),
      mergeMap((action: ProductsActions)=>{
        return this.productsService.saveProduct(action.payload)
          .pipe(
            map((product)=>new SaveProductActionSuccess(product)),
            catchError((err)=>of(new SaveProductActionError(err.message)))
          )
      })
    )
  );

  //Edit product Effect
  EditProductEffect: Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.EDIT_PRODUCT),
      mergeMap((action: ProductsActions)=>{
        return this.productsService.getProductById(action.payload)
          .pipe(
            map((product)=>new EditProductActionSuccess(product)),
            catchError((err)=>of(new EditProductActionError(err.message)))
          )
      })
    )
  );

  //Update product Effect
  UpdateProductEffect: Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.UPDATE_PRODUCT),
      mergeMap((action: ProductsActions)=>{
        return this.productsService.updateProduct(action.payload)
          .pipe(
            map((product)=>new UpdateProductActionSuccess(product)),
            catchError((err)=>of(new UpdateProductActionError(err.message)))
          )
      })
    )
  );
}
