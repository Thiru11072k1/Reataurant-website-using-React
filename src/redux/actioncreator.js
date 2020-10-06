import * as actiontype from './actiontype'
import { DISHES } from '../shared/dishes';

export const addComment=(dishId ,rating,author,comment)=>({
     type:actiontype.ADD_COMMENT,
     payload:{
          dishId:dishId,
          rating:rating,
          author:author,
          comment:comment
     }
})

export const fetchDishes=()=>(dispatch)=>{
     dispatch(dishesLoading(true));

     setTimeout(()=>{
          dispatch(addDishes(DISHES));
     },2000);
}

export const dishesLoading=()=>({
     type:actiontype.DISHES_LOADING
})
export const dishesFailed=(errmess)=>({
     type:actiontype.DISHES_FAILED,
     payload:errmess
})
export const addDishes=(dishes)=>({
     type:actiontype.ADD_DISHES,
     payload:dishes
})