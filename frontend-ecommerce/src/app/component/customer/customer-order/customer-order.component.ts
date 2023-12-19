import { Component, NgZone, OnInit } from '@angular/core';
import { Order } from '../../model/order.model';
import { EcommerceService } from 'src/app/ecommerce.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { take } from 'rxjs';
import { CustomerOrderHistoryComponent } from '../customer-order-history/customer-order-history.component';
import { MatDialog } from '@angular/material/dialog';
declare var Razorpay:any;

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css']
})
export class CustomerOrderComponent implements OnInit {
  orderList: Order[]=[];
  selectedOrder: Order | undefined;
  customer: any = {};
  constructor(
    private eservice: EcommerceService,
    private router: Router,
    private datePipe : DatePipe,
    private dialog:MatDialog,
    private ngZone: NgZone
  ) { 
    this.eservice.isCustomerLoginPresent();
  }

  ngOnInit(): void {
    this.getCustomerDetail();
    this.getOrderList();
  }

  getCustomerDetail(): void {
    const cid = this.eservice.getCustomerAuthorization();
    this.eservice.getCustomerById(cid).pipe(take(1)).subscribe(
      (res: any) => {
        console.log("Customer*****", res);
        if (!!res && res?.customerId) {
          this.customer = res;
        }
      }, err => {
        console.log("Err");
      }
    )
  }


  getOrderList():void{
    this.eservice.orderList(this.eservice.getCustomerAuthorization()).pipe(take(1)).subscribe(
      (res: any) => {
       
        if(!!res && Array.isArray(res)){
          this.orderList=res;
         
         
          
        }
        
      }, err => {
        console.log("Error");
      }
    )
  }
  getDate(d:string|undefined):any{
    //return  !!d ? this.datePipe.transform(new Date(d),"" )?.toString(): "";
    //return this.datePipe.transform(d,"").toString();
    let ans :any;
    console.log("DDDDDD",d);
    if(!!d && d!== null){
      ans=this.datePipe.transform(d,"shortDate")||null;
      console.log("@@@@@@@@",ans);
    }
    return ans;
  }
  
  addPayment(order: Order): void {
    // this.router.navigate([`/customer/payment/${order?.orderId}/${order?.totalPrice}`]);
    this.eservice.addPaymentOfOrder(order?.totalPrice).pipe(take(1)).subscribe((res: any) => {
      console.log('>>>>', res);
      if (res && res?.orderId) {
        this.openTransactioModal(res);
        this.selectedOrder = order;
      }
    }, error => {
      console.log("Error => ", error);
    })
  }

  openHistory(order: Order): void {
    console.log('>>>>>>>', order);
    const dialogRef = this.dialog.open(CustomerOrderHistoryComponent, {
      data: order,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '80%',
      width: '80%'
      
    });
  }

  openTransactioModal(response: any) {
    var options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'online ecommerce shop',
      description: 'Payment of online ecommerce shop',
      image: 'https://cdn.pixabay.com/photo/2023/01/22/13/46/swans-7736415_640.jpg',
      handler: (response: any) => {
        console.log('####', response);
        if(response!= null && response.razorpay_payment_id != null) {
          this.processResponse(response);
        } else {
          alert("Payment failed..")
        }
       
      },
      prefill : {
        name:'LPY',
        email: 'LPY@GMAIL.COM',
        contact: '9004380734'
      },
      notes: {
        address: 'Online ecommerce shop'
      },
      theme: {
        color: '#F37254'
      }
    };

    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }

  processResponse(resp: any) {
    // this.orderDetails.transactionId = resp.razorpay_payment_id;
    // this.placeOrder(orderForm);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>',resp);
    if (resp && resp?.razorpay_order_id && resp?.razorpay_payment_id && this.selectedOrder) {
      const body: any = {
        totalPrice: this.selectedOrder?.totalPrice,
        orderId: this.selectedOrder?.orderId,
       
        PaidDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd')?.toString(),
        paidAmount: this.selectedOrder?.totalPrice,
        customer: this.customer
  
  
      };
      console.log("$$$$$$$", body);
      this.eservice.addPayment(body, this.selectedOrder?.orderId, this.customer?.customerId).pipe(take(1)).subscribe(
        (res: any) => {
          console.log("*********", res);
          if (res && res?.paymentId) {
            alert("Payment done sucessfully");
            this.ngZone.run(() => {
              this.getOrderList();
            });
            
          }
        }, err => {
          console.log("error");
        }
      )
    }
  }
}
