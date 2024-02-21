import { generateCartItems } from "@shared/models/cart.mock";
import { CartService } from "./cart.service"
import { TestBed } from "@angular/core/testing";

fdescribe('Test for  Cartservice', () => {
    let cartService: CartService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CartService
            ]
        });
        cartService =  TestBed.inject(CartService);
    });

    it('Should create Cartservice', () => {
        expect(cartService).toBeDefined();
    })
    
    // describe('Test for items in CartService', () => {

    // it('Test for items should return an aray of CartItems', () => {
    //         expect(cartService.items).toBe(generateCartItems());
    //     });
    // });




});