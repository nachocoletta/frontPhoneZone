import axios from 'axios'



const BACK_URL = `https://phonezoneback-production.up.railway.app/`
const API_URL_2 = `https://phonezoneback-production.up.railway.app/login`
class AuthService{

    Login(data){
      return axios.post(API_URL_2, data);
    };

    Register(data){
      return axios.post(BACK_URL, data);
    };
}

export default new AuthService;