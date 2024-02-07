import { OrderService } from "./order.service";
import { AddItem, CreateOrder, ItemAdded, OrderDetail, OrderResume } from "@shared/models/order.model";
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { environment } from "@environments/environment";
import { generateItemAdded, generateOneOrder, generateOrders } from "@shared/models/order.mock";



describe('Test for OrderService', () => {

    let orderService: OrderService;
    let httpControler: HttpTestingController;
    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ OrderService ]
    });
    orderService = TestBed.inject(OrderService);
    httpControler = TestBed.inject(HttpTestingController);
    });
    
    afterEach(() => {
    httpControler.verify();
    });

    it('should be created', () => {
        expect(orderService).toBeTruthy();
    });

    describe('Test for createOrder', () => {
        it('should return an array of orders', (doneFn) => {
             //Arrange
    const mockOrderData: OrderResume = generateOneOrder();
    const dummyOrder = {
        paid: true,
        status: 'njjnjn',
    }

    // Act
    orderService.createOrder({...dummyOrder}).subscribe((data) => {
      expect(data).toEqual(mockOrderData);
      doneFn();
    });

    //http config
    const url = `${environment.API_URL}/orders`;
    const req = httpControler.expectOne(url);
    req.flush(mockOrderData);
    expect(req.request.body).toEqual(dummyOrder);
    expect(req.request.method).toEqual('POST')
        })
    });
    

    describe('Test for addProduct', () => {
        it('should return a Product added to an order', (doneFn) => {
             //Arrange
    const mockItemData: ItemAdded = generateItemAdded();
    const dummyItem:AddItem  = {
        orderId: 1,
        productId: 1,
        amount: 1
    }

    // Act
    orderService.addProduct({...dummyItem}).subscribe((data) => {
      expect(data).toEqual(mockItemData);
      doneFn();
    });

    //http config
    const url = `${environment.API_URL}/orders/add-item`;
    const req = httpControler.expectOne(url);
    req.flush(mockItemData);
    expect(req.request.body).toEqual(dummyItem);
    expect(req.request.method).toEqual('POST')
        })
    });
});