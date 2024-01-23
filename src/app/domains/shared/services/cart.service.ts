import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItemType, CartState } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})

export class CartService {
   private cart = signal<CartState>({});

   // Product in the shoppingCart
   items = computed(() => {
    const cart = this.cart();
    const items = Object.values(cart);
    return items;
  });

  // count the quantity of a product in the shoppingCart
  count = computed(() => {
      const cart = this.cart();
      const items = Object.values(cart);
      return items.reduce((sum:number, product: CartItemType) => sum + Number(product.quantity), 0);
    });

    // total price before taxes of the products
  subtotal = computed(() => {
      const cart = this.cart();
      const items = Object.values(cart);
      return items.reduce((sum:number, product: CartItemType) => sum += Number(product.price) * product.quantity, 0);
    });

  constructor() {}
    // get value of the shoppincart
  private get getCartItems(): CartState {
    return this.cart();
  }
  // modify the shoppingCart
  private set setCartItems(item: any) {
    this.cart.update(state => { return {...state, ...item }} );
  }

  addToCart(item: Product, quantity: number = 1): void {
    const existingItem = this.getCartItems[item.id];

    if (existingItem) {
      // Item already exists, update quantity
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + quantity };
      this.setCartItems = { ...this.getCartItems, [item.id]: updatedItem };
    } else {
      // Item doesn't exist, add to the cart
      const newItem = { ...item, quantity };
      this.setCartItems = { ...this.getCartItems, [item.id]: newItem };
    }
  }

  removeFromCart(item: Product): void {
    const existingItem = this.getCartItems[item.id];
    const quantity = existingItem.quantity - 1;
    const updatedItems = this.getCartItems;

    this.setCartItems = {

      [item.id]: {
      ...existingItem,
      quantity,
    },...updatedItems};
  }


  clearCart(): void {
    this.setCartItems = {};
  }


   getShoppingCartSubTotal(sum: number, item: CartItemType){
      sum += item.price * item.quantity;
      return sum;
    };

  getShoppingCartCount(sum: number, item: CartItemType) {
    return sum + item.quantity
  }








}
