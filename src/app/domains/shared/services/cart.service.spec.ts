import { CartService } from "./cart.service"
import { generateOneProduct } from "@shared/models/product.mock";
import { CartItemType } from "@shared/models/cart.model";

describe('Test for  Cartservice', () => {
    let cartService: CartService;

    beforeEach(() => {
     cartService = new CartService();
    });

    it('Should create Cartservice should be defined', () => {
        expect(cartService).toBeDefined();
        expect(cartService).toBeInstanceOf(CartService);
    });
    

    it('Test for items should return an array of CartItems', () => {
        const mockProduct = generateOneProduct();
        const mockCartItem: CartItemType =  { ...mockProduct, quantity: 1, price: mockProduct.price };
        
        cartService.addToCart(mockProduct);

        expect(cartService.items()).toBeDefined();
        expect(cartService.items()[0]).toEqual(mockCartItem);
        });

    it('Test for items should count the CartItems', () => {
            const mockProduct = generateOneProduct();
            const mockProductQTY = 2;
            
            cartService.addToCart(mockProduct, mockProductQTY);
    
            expect(cartService.count()).toBeDefined();
            expect(cartService.count()).toEqual(mockProductQTY);
        });

    it('Test for items should count the subtotal of the CartItems', () => {
            const mockProduct = generateOneProduct();
            const mockProductQTY = 2;
            const mockSubtotal = mockProduct.price * mockProductQTY;

            cartService.addToCart(mockProduct, mockProductQTY);
    
            expect(cartService.subtotal()).toBeDefined();
            expect(cartService.subtotal()).toEqual(mockSubtotal);
        });

    it('Test for removeFromCart method should remove one item from cart', () => {
            const mockProduct = generateOneProduct();
            const mockProductQTY = 2;
            const mockSubtotal = mockProduct.price * mockProductQTY;
            const SubtotalMinusOne = mockSubtotal - mockProduct.price;
            const mockCount = 1;

            // Add 2 products
            cartService.addToCart(mockProduct, mockProductQTY);
            // remove one
            cartService.removeFromCart(mockProduct);

            expect(cartService.count()).toEqual(mockCount);
            expect(cartService.subtotal()).toEqual(SubtotalMinusOne);
        });

});