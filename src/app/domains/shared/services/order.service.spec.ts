import { OrderService } from "./order.service";
import { CreateOrder, OrderDetail, OrderResume } from "@shared/models/order.model";
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { environment } from "@environments/environment";
import { generateOneOrder, generateOrders } from "@shared/models/order.mock";



describe('Test for OrderService', () => {

    let orderService: OrderService;
    let httpControler: HttpTestingController;
    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ OrderService ]
    })
    orderService = TestBed.inject(OrderService);
    httpControler = TestBed.inject(HttpTestingController);
    });
    
    afterEach(() => {
    httpControler.verify();
    })

    it('should be created', () => {
        expect(orderService).toBeTruthy();
    })

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
    })
});