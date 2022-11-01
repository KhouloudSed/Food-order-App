import CartContext from "./cart-context";
import { useReducer } from "react";



//we use useReducer wa9teli nehoubou we manage complicated states
const defaultCartState={
    items:[],
    totalAmount:0
}

const cartReducer =(state, action)=>{
    if(action.type==='ADD'){
       
        const existingCartItemIndex =state.items.findIndex(item=> item.id === action.item.id );
        const existingCartItem =state.items[existingCartItemIndex];
        let updatedItems;

        if(existingCartItem){
            const updatedItem ={
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems=[...state.items]
            updatedItems[existingCartItemIndex]=updatedItem;
        }else{
            updatedItems =state.items.concat(action.item);

        }
       
       
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if(action.type==='REMOVE'){
        const existingCartItemIndex =state.items.findIndex(item=> item.id === action.id );
        
        const existingItem =state.items[existingCartItemIndex]

        const updatedTotalAmount = state.totalAmount - existingItem.price
        let updatedItems;
        if(existingItem.amount ===1){
            // remove the item from list
            updatedItems= state.items.filter(item => item.id !== action.id) 

        }else{
            //dicrease by one the amount of item
            const updatedItem ={...existingItem, amount : existingItem.amount -1}
            updatedItems= [...state.items]
            updatedItems[existingCartItemIndex]= updatedItem;


        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };

        }
   
    
    return defaultCartState;


}

//cart provider manage current context to data and provide context to all component that want access to it
const CartProvider=props =>{
    const [cartstate, dispatchCartAction] =useReducer(cartReducer, defaultCartState)
  
    
    //hne na3mlou initialisation mta3 context w it's functions
    const addItemToCartHandler= item =>{
        dispatchCartAction({
            type:'ADD',
            item: item
        })
    };

    const removeItemFromcartHandler= id=>{
        dispatchCartAction({
            type:'REMOVE',
            id: id
        })
    }


    const cartContext={
        items:cartstate.items,
        totalAmount:cartstate.totalAmount ,
        addItem:addItemToCartHandler,
        removeItem: removeItemFromcartHandler,
    }




    return <CartContext.Provider value={cartContext}>
        {/* ay component ynejem yacedi lel provider eli hiya props.children*/}
        {props.children}
    </CartContext.Provider>

}
export default CartProvider;