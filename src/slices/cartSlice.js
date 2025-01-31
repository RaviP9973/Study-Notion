import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
const initialState = {
    cart:localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],


    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    
    total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,


}

const cartSlice = createSlice({
    name:"cart",
    initialState: initialState,
    reducers :{
        setTotalItems(state,value){
            state.token = value.payload;
        },
        // add to cart
        addToCart(state,action){
            const course = action.payload
            const index = state.cart.findIndex((item) => item._id === course._id)

            if(index >= 0){
                toast.error("Course is already in the cart");
                return
            }

            state.cart.push(course);
            state.totalItems++;
            state.total += course.price

            localStorage.setItem("cart",JSON.stringify(state.cart));

            localStorage.setItem("total",JSON.stringify(state.total));
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));

            toast.success("course added to the cart");
        },

        // remove from cart
        removeFormCart(state,action){
            const courseId = action.payload;
            const index = state.cart.findIndex((item) => item._id === courseId);

            if(index < 0){
                toast.error("This item is not in your cart");
                return 
            }

            state.total -= state.cart[index].price

            state.totalItems--;

            state.cart.splice(index,1);

            localStorage.setItem("cart",JSON.stringify(state.cart))

            localStorage.setItem("total",JSON.stringify(state.total))

            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

            toast.success("Course removed from the course");
        },
        // resetCart
        resetCart(state){
            state.cart = []
            state.total = 0;
            state.totalItems = 0;

            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");
        }
    }
})

export const {setToken,addToCart,removeFormCart,resetCart} = cartSlice.actions;
export default cartSlice.reducer;