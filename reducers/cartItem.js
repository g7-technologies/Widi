import {
  ADD_FOOD,
  DELETE_FOOD,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  Empty_Cart
} from "../actions/Types";

const initialState = {
  foodList: [],
  Item_Quantity: 0,
  price: 0,
  cartitem: 1,
  Food_Names: [],
};

const cartItem = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FOOD:
  
      // alert(action.totalprice)
      var matched = false;
      for (var i = 0; i < state.foodList.length; i++) {
        if (state.foodList[i].name.id == action.food.id) {
          matched = true;
          state.foodList[i].Item_Quantity = state.Item_Quantity + action.quantity;
          state.foodList[i].price = action.totalprice*(state.Item_Quantity + action.quantity);
  
          return {
              ...state,
                
              
            };
          
          
          
         
        }
      }
     

      if (matched == false) {
        return {
          ...state,
          foodList: state.foodList.concat({
            key: action.food.id,
            name: action.food,
            Item_Quantity: state.Item_Quantity + action.quantity,
            price: action.totalprice
          }),
        };
      }

      break;
    case DELETE_FOOD:
      
      // alert(action.totalprice)
      var matched = false;
      for (var i = 0; i < state.foodList.length; i++) {
        if (state.foodList[i].name.id == action.food.id) {
          matched = true;
          state.foodList[i].Item_Quantity = state.Item_Quantity + action.quantity;
          state.foodList[i].price = action.totalprice*(state.Item_Quantity + action.quantity);
  
          return {
              ...state,
                
              
            };
          
          
          
         
        }
      }
     

      if (matched == false) {
        return {
          ...state,
          foodList: state.foodList.concat({
            key: action.food.id,
            name: action.food,
            Item_Quantity: state.Item_Quantity + action.quantity,
            price: action.totalprice
          }),
        };
      }

      
      break;

  
    case REMOVE_FROM_CART:
      return {
        ...state,
        foodList: state.foodList.filter(function (e) {
          for (var i = 0; i < state.foodList.length; i++) {
            if (state.foodList[i].name.id == action.key) {             
              state.foodList[i].Item_Quantity =0
            }
          }
          return (
          e.key !== action.key
           
          )
        }),
      };
      break;
      case Empty_Cart:
        return {
          ...state,
          foodList: [],
        };
  }
  return state;
};
export default cartItem;