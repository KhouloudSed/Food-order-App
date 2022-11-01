import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

import CartIcon from "../Cart/CartIcon";
import styles from './HeaderCartButton.module.css'
const HeaderCartButton = props =>{
    const [btnISHighlighted, setBtnIsHighlighted] =useState(false)
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx

    const numberOfCartITems =items.reduce((curNumber, item)=>{
        return curNumber + item.amount;
    },0)

    const btnClasses =`${styles.button} ${btnISHighlighted? styles.bump : ''}`
   
    useEffect(()=>{
        if(cartCtx.items.length ===0){
            return;
        }
         setBtnIsHighlighted(true)
        const timer= setTimeout(() => {
            setBtnIsHighlighted(false)
        }, 300);
        return ()=>{
            clearTimeout(timer)
        }
    }, [items])
   
   return <button className={btnClasses} onClick={props.onClickCart}>
        <span className={styles.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}> {numberOfCartITems}</span>

    </button>

}
export default HeaderCartButton; 