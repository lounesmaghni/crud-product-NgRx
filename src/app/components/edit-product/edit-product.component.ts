import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {EditProductAction, UpdateProductAction} from "../../ngrx/products.actions";
import {ProductsState, ProductsStateEnum} from "../../ngrx/products.reducer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  productID: number;
  state?: ProductsState;
  productFormGroup!: FormGroup;
  readonly productsStateEnum=ProductsStateEnum;
  formBuilt: boolean=false;
  submitted: boolean=false;

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<any>,
              private fb: FormBuilder,
              private router: Router){
    this.productID=activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void{
    this.store.dispatch(new EditProductAction(this.productID));
    this.store.subscribe(state=>{
      this.state=state.appState;
      if (this.state?.dataState == ProductsStateEnum.LOADED) {
        if (this.state.currentProduct != null) {
          this.productFormGroup=this.fb.group({
            id: [this.state.currentProduct.id],
            name: [this.state.currentProduct.name, Validators.required],
            price: [this.state.currentProduct.price, Validators.required],
            quantity: [this.state.currentProduct.quantity, Validators.required],
            selected: [this.state.currentProduct.selected],
            available: [this.state.currentProduct.available],
          });
          this.formBuilt=true;
        }
      }

    })
  }

  okUpdated(){
    this.router.navigateByUrl("/products");
  }

  onUpdatedProduct(){
    this.submitted=true;
    if (!this.productFormGroup?.valid) return;
    this.store.dispatch(new UpdateProductAction(this.productFormGroup?.value));
    alert("success product updated");
    this.router.navigateByUrl("products");
  }
}
