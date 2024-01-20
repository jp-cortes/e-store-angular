import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { CartAction, CartItemType, CartState } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = signal<Product[]>([]);
  total = computed(() => {
    const cart = this.cart();
    return cart.reduce((total, product) => total + Number(product.price), 0);
  })

  constructor() {}

    addToCart(product: Product) {
    this.cart.update(state => [...state, product])
    }


  cartState = signal<CartState>({});
  cartStateType = signal<"add" | "remove" | "clear">("add");
  cartStateItem = signal<Product | {}>({});
  cartStateQuantity = signal<number | undefined>(undefined);
  cartAction = signal({});




  ShoppingCartReducers(
    { item, type, quantity: qtyToAdd = 1 }: CartAction
  ) {

      // const item = this.cartStateItem()
      // const type = this.cartStateType()
      // const quantity = this.cartStateQuantity()
      const state = this.cartState()

      const existingShoppingCartItem = state[item.id];

      switch (type) {
        case "add": {
          if (existingShoppingCartItem !== undefined) {
            const quantity = existingShoppingCartItem.quantity + qtyToAdd;
            return {
              ...state,
              [item.id]: {
                ...existingShoppingCartItem,
                quantity,
              },
            };
          }

          return {
            ...state,
            [item.id]: {
              ...item,
              quantity: qtyToAdd,
            },
          };
        }

        case "remove": {
          if (existingShoppingCartItem === undefined) {
            return state;
          }

          const quantity = existingShoppingCartItem.quantity - 1;
          if (quantity > 0) {
            return {
              ...state,
              [item.id]: {
                ...existingShoppingCartItem,
                quantity,
              },
            };
          }

          const newShoppingCartItems = { ...state };
          delete newShoppingCartItems[item.id];
          return newShoppingCartItems;
        }


         case "clear": { return {}}

        default: {
          throw new Error(`Unhandled action type: ${type}`);
        }
      }
    }


   getShoppingCartSubTotal(sum: number, item: CartItemType){
      sum += item.price * item.quantity;
      return sum;
    };

  getShoppingCartCount(sum: number, item: CartItemType) {
    return sum + item.quantity
  }

    useShoppingCart() {
      const itemsById = this.cartState;
      const items = Object.values(itemsById);
      const count = items.reduce(this.getShoppingCartCount, 0);
      const subTotal = items.reduce(this.getShoppingCartSubTotal, 0);

      return {
        items,
        itemsById,
        count,
        subTotal,
      };
    };


  //  useShoppingCartMutations() {
  //     const dispatch = this.ShoppingCartReducers();

  //     const addToShoppingCart = (product: Product, quantity?: number) =>
  //       dispatch({
  //         type: "add",
  //         item: product,
  //         quantity,
  //       });

  //     const removeFromShoppingCart = (product: Product) =>
  //       dispatch({
  //         type: "remove",
  //         item: product,
  //       });

  //     // const clearShoppingCart = () =>
  //     //   dispatch({ type: "clear"});


  //   };

}
