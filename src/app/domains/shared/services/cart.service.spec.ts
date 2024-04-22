import { generateCartItems } from "@shared/models/cart.mock";
import { CartService } from "./cart.service"
import { TestBed } from "@angular/core/testing";
import { generateOneProduct } from "@shared/models/product.mock";

fdescribe('Test for  Cartservice', () => {
    let cartService: jasmine.SpyObj<CartService>;

    beforeEach(() => {
        const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart', 'removeFromCart', 'clearCart', 'items', 'subtotal', 'count'])
        TestBed.configureTestingModule({
            providers: [
                { provide: CartService, useVlue: cartServiceSpy }
            ]
        });
        cartService =  TestBed.inject(CartService) as jasmine.SpyObj<CartService>;

        const mockCartItemt = generateOneProduct();

        cartService.addToCart(mockCartItemt);
    
    });

    it('Should create Cartservice and signals should be defined', () => {
        expect(cartService).toBeDefined();
        expect(cartService.cart()).toBeDefined();
        expect(cartService.items()).toBeDefined();
        expect(cartService.count()).toBeDefined();
        expect(cartService.subtotal()).toBeDefined();
    })
    
    // describe('Test for items in CartService', () => {

    // it('Test for items should return an aray of CartItems', () => {
    //     const mockCartItem = generateOneProduct();
    //     const mockCartItems = generateCartItems();
    //     cartService.addToCart(mockCartItem);

    //     cartService.items.and.returnValue(mockCartItems)

    //     expect(cartService.items).toBeDefined();
    //     expect(cartService.items).toEqual(mockCartItems)
    //     // expect(cartService.count).toBeDefined();
    //     // expect(cartService.subtotal).toBeDefined();
    //     });
    // });




});