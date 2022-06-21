import { Empty_Cart,ADD_FOOD,DELETE_FOOD,ADD_TO_CART,REMOVE_FROM_CART } from "../actions/Types";

export const addFood=(food,quantity,price)=>({
    type:ADD_FOOD,
    food:food,
    quantity:quantity,
    totalprice:price
})

export const deleteFood=(food,quantity,price,key)=>({
    type:DELETE_FOOD,
    food:food,
    quantity:quantity,
    totalprice:price,
    key:key
})

export const addFoodtocart=()=>({
    type:ADD_TO_CART,
    //food:food
})
export const deleteFoodfrom=(key)=>({
    type:REMOVE_FROM_CART,
    key:key
})

export const Emptycart=()=>({
    type:Empty_Cart, 
    
})