import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EcommerceService } from 'src/app/ecommerce.service';
import { Cart } from '../../model/cart.model';
import { forkJoin, take } from 'rxjs';
import { Product } from '../../model/product.model';
import * as _ from "lodash";

@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})
export class CustomerCartComponent {

  cartList: Cart[] = [];
  cartListBackup: Cart[] = [];
  grandTotal: number = 0;
  customer: any = {};


  constructor(
    private eservice: EcommerceService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.eservice.isCustomerLoginPresent();
    this.getCartList();
    this.getCustomerDetail();
  }

  ngOnInit(): void {
  }
  getCartList(): void {
    this.eservice.cartList().pipe(take(1)).subscribe(
      (res: any) => {
        console.log("****", res);
        if (!!res && Array.isArray(res)) {
          const customerFilter = res.filter((item: Cart)=> item?.customer?.customerId === parseInt(this.eservice.getCustomerAuthorization()));
          console.log("customer filter::::::",customerFilter);
          this.cartList = customerFilter;
          this.cartListBackup = _.cloneDeep(customerFilter);
          if (this.cartList.length > 0) {
            this.cartList.map((item: Cart) => {
              this.grandTotal += (item?.mrpPrice * item?.quantity);
            })
          }
        }
      }, err => {
        console.log("error");
      }

    );
  }
  getTotal(quantity: number = 0, mrpPrice: number = 0): number {
    return quantity * mrpPrice;
  }
  // placeOrder(): void {
  //   const req:any[]=[];
  //   this.cartList.map((item: Cart) => {
  //     const body: any = {
  //       mrpPrice: item?.mrpPrice,
  //       quantity: item?.quantity,
  //       totalPrice: item?.mrpPrice * item?.quantity,
  //       orderStatus: "success",
  //       paymentStatus: "success",
  //       orderedDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
  //       customer: this.customer,
  //       cart: item,
  //       productname: item?.product?.productname,
  //       image: item?.product?.image
  //     };
     
  //     console.log("add to order", body);
  //     req.push(this.eservice.placeOrder(this.customer?.customerId, item?.cartId, body));
    
  //   });

  //    forkJoin(req).pipe(take(1)).subscribe(
  //       (res: any) => {
  //         console.log("PLaceorder$$$$$$$$",res);
  //         alert("Place order Sucessfully");
  //         this.router.navigate(["/customer/order"])

  //       }, err => {
  //         console.log("Error");
  //       });


  placeOrder(): void {
    let totalPrice: number = 0;
    const deleteCartReq:any[]=[];
    const productItems: Array<Product> = [];
    this.cartList.forEach((item: Cart) => {
      productItems.push(item?.product);
      totalPrice += (item?.mrpPrice * item?.quantity);
      deleteCartReq.push(this.eservice.deleteCart(item?.cartId));
    });
    console.log('>>>>>>>>', totalPrice)
    const body: any = {
      totalPrice: totalPrice,
      orderStatus: "success",
      paymentStatus: "success",
      orderedDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      customer: this.customer,
      productname: 'xxxxx',
      image: 'xxxxx',
      product: productItems
    };
    this.eservice.placeOrderItem(this.customer?.customerId, body).pipe(take(1)).subscribe((res: any) => {
      console.log('>>>>>>>', res);
      forkJoin(deleteCartReq).pipe(take(1)).subscribe();
      alert("Place order Sucessfully");
      this.router.navigate(["/client/order"]);
    })


  }
  getCustomerDetail(): void {
    const cid = this.eservice.getCustomerAuthorization();
    this.eservice.getCustomerById(cid).pipe(take(1)).subscribe(
      (res: any) => {
        console.log("Customer***", res);
        if (!!res && res?.customerId) {
          this.customer = res;
        }
      }, err => {
        console.log("Err");
      }
    )
  }

  deleteCart(cart:Cart, showAlert: boolean = true):void{
    this.eservice.deleteCart(cart?.cartId).pipe(take(1)).subscribe(
      (res: any) => {
        if (showAlert) {
          alert("Product deleted sucessfully");
        }
       
        this.getCartList();
      }, err => {
        console.log("Err");
      }
    )
  }

  onIncreaseQunatity(cart: Cart): void {
    const index = this.cartList.findIndex((item: Cart) => item.cartId === cart?.cartId);
    // const bac = Object.assign(this.cartListBackup);
    const indexBackup = this.cartListBackup.findIndex((item: Cart) => item.cartId === cart?.cartId);
    const qty = cart.quantity + 1;
    console.log( this.cartListBackup[indexBackup].quantity , '>>>>>>' , (cart.product?.quantity ))
    if (qty > (cart.product?.quantity  + this.cartListBackup[indexBackup].quantity) ) {
      alert('Added quantity should not greater than avaiable quantity');
      return;
    }
    this.cartList[index].quantity = qty;
    this.updateGrantTotal();
  }

  onDecreaseQunatity(cart: Cart): void {
    const index = this.cartList.findIndex((item: Cart) => item.cartId === cart?.cartId);
    const qty = cart.quantity - 1;
    if (qty === 0) {
      this.deleteCart(cart, false);
    }
    this.cartList[index].quantity = qty;
    this.updateGrantTotal();
  }

  updateGrantTotal(): void {
    let total = 0;
    this.cartList.map((item: Cart) => {
      total+= (item?.mrpPrice * item?.quantity);
     
    })
    this.grandTotal = total;
  }

}
