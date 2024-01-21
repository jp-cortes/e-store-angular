import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { CartAction, CartItemType, CartState } from '../models/cart.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  cart = signal<Product[]>([]);
  total = computed(() => {
    const cart = this.cart();
    return cart.reduce((total, product) => total + Number(product.price), 0);
  });

  // addToCart(product: Product) {
  //   this.cart.update(state => [...state, product])
  //   }

  private cartItemsSubject: BehaviorSubject<CartState> = new BehaviorSubject<CartState>({});
  public cartItems$: Observable<CartState> = this.cartItemsSubject.asObservable();

  constructor() {}

  private get getCartItems(): CartState {
    return this.cartItemsSubject.getValue();
  }

  private set setCartItems(items: CartState) {
    this.cartItemsSubject.next(items);
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

  removeFromCart(item: CartItemType): void {
    const { [item.id]: _, ...updatedItems } = this.getCartItems;
    this.setCartItems = updatedItems;
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

    useShoppingCart() {
      const itemsById = this.getCartItems
      const items = Object.values(itemsById);
      const count = items.reduce(this.getShoppingCartCount, 0);
      const subTotal = items.reduce(this.getShoppingCartSubTotal, 0);

      return {
        items,
        itemsById,
        count,
        subTotal,
      }
    }




}
