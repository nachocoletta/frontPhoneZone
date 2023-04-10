import axios from "axios";

export const GET_PHONES = "GET_PHONES";
export const GET_PHONE = "GET_PHONE";
export const GET_DETAIL = "GET_DETAIL";
export const GET_BRANDS = "GET_BRANDS";
export const POST_PHONE = "POST_PHONE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RELEASED = "ORDER_BY_RELEASED";
export const TIDY_PRICE = "TIDY_PRICE";
export const FILTER_BRANDS = "FILTER_BRANDS";

export const GET_COLORES = "GET_COLORES";
export const GET_CAPACITY = "GET_CAPACITY";

export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const CLEAN_PHONES = "CLEAN_PHONES";
export const FILTER_CAPACITY = "FILTER_CAPACITY";
export const POST_USER = "POST_USER";
export const GET_USERS = "GET_USERS";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOG_OUT = "LOGOUT";

const URL_BACK = "https://phonezoneback-production.up.railway.app"

  export function getPhones(){
    return async function (dispatch) {
      let Json = await axios.get(`${URL_BACK}/product`);
      dispatch({
        type: GET_PHONES,
        payload: Json.data,
      });
    }
  }

  export function getPhone(payload){
    return async function(dispatch){
      let json = await axios.get(`${URL_BACK}/product/?name=${payload}`)
      return dispatch({
        type: 'GET_PHONE',
        payload: json.data
      })
    }
  }

  export function GetWishList(id){
    return async function(dispatch){
      return await axios.get(`${URL_BACK}/wishlist/${id}`)
    }
  }

  export function DeleteWishList(idUser, idProduct){
    return async function(){
      return await axios.delete(`${URL_BACK}/wishlist/${idUser}/${idProduct}`);
    }
  }

  export function getDetail(id) {
    return async function(dispatch) {
        const json = await axios(`${URL_BACK}/product/${id}`);
        return dispatch({
            type: GET_DETAIL,
            payload: json.data
        });
    };
  };

  export function getBrands() {
    return async function (dispatch) {
      let json = await axios.get(`${URL_BACK}/brand`);
      dispatch({
        type: GET_BRANDS,
        payload: json.data,
      });
    };
  }

  export function PostPhone(payload) {
    var json = axios.post(`${URL_BACK}/product`, payload);
    return { type: POST_PHONE, payload: json };
  }

  export function getColores() {
    return async function (dispatch) {
      let json = await axios.get(`${URL_BACK}/color`);
  
      dispatch({
        type: GET_COLORES,
        payload: json.data,
      }); 
    };
  }
  
  export function getCapacity() {
    return async function (dispatch) {
      let json = await axios.get(`${URL_BACK}/capacity`);
  
      dispatch({
        type: GET_CAPACITY,
        payload: json.data,
      }); 
    };
  }

  export function TidyAlphabetically(payload) {
    return {
      type: ORDER_BY_NAME,
      payload,
    };
  }

  export function TidyReleased(payload) {
    return {
      type: ORDER_BY_RELEASED,
      payload,
    };
  }

  export function TidyPrice(payload) {
    return {
      type: TIDY_PRICE,
      payload,
    };
  }
  
  export function FilterBrands(payload) {
    return {
      type: FILTER_BRANDS,
      payload,
    };
  }

  export function FilterCapacity(payload) {
    return {
      type: FILTER_CAPACITY,
      payload,
    };
  }

  export function cleanDetail(payload) {
    return {
      type: CLEAN_DETAIL,
      payload: [],
    };
  }

  export function CleanPhones(){

    return{
        type: CLEAN_PHONES,
        payload: [],
    }
}

//rutas user

export function PostUser(payload) {
  return async function(dispatch){
    await axios.post(`${URL_BACK}/user`, payload);
  }
}

export function GetUsers(){
  return async function (dispatch) {
    let Json = await axios.get(`${URL_BACK}/user`);
    dispatch({
      type: GET_USERS,
      payload: Json.data,
    });
  }
}

export function LoginSuccess(data){
  return async function(dispatch){
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    })
  }
}

export function LogOut(){
  return async function(dispatch){
    dispatch({
      type: LOG_OUT,
    })
  }
}