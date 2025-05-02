export const Reducerfun = (state, action) => {
  const { Product, Cart, Searched, recentSearched } = state;
  switch (action.type) {
    case "FETCH PRODUCT":
      return { ...state, Product: action.payload };

    case "SEARCHED PRODUCTS":
      return {
        ...state,
        Searched: [...action.payload],
        recentSearched: action.payload,
      };

    case "ADD TO CART":
      return {
        ...state,
        Cart: [...state.Cart, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE FROM CART":
      return {
        ...state,
        Cart: state.Cart.filter((cart) => cart.id !== action.payload),
      };
    case "REMOVE ALL":
      return{
        ...state,
        Cart:[]
      }  
    case "Quantity":
      return {
        ...state,
        Cart: state.Cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    default:
      return state;
  }
};
