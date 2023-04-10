import { PostProductLocalStorage } from "../../helpers/Cart";
import { BsFillHeartFill } from "react-icons/bs"
import WishListService from '../../helpers/WishList'
import Swal from "sweetalert2";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

export default function Card({id, name, price, image, stock, brand}){

    const user = useSelector((state) => state.User)
    const navigate = useNavigate();

    
  const handleClickDetail = (id) => {
    navigate(`/details/${id}`);
  };

    const handleClick = () => {

        const product = {
            id: id,
            name: name,
            price: parseInt(price),
            image: image,
            stock: stock,
            total: parseInt(price),
            brand: brand,
            quantity: 1,
        }

        // TENEMOS QUE COMPROBAR SI EL USUARIO ESTÁ VALIDADO.

        if(window.localStorage.getItem('user-session')){

        }else{
            const res = PostProductLocalStorage(product);
                return Swal.fire({
                    icon: res.icon,
                    title: res.title,
                    text: res.text
            })
        }
    }

    const handleFavorites = (id) => {

        if(Object.keys(user).length === 0){
            return Swal.fire({
                icon: 'error',
                title: 'Something wrong',
                text: "that"
            })
        }

        else {

            const data = {
                idUser: user.data_user.id,
                idProduct: id,
            }


            WishListService.PostProductWishList(data).then((response) => {
                return Swal.fire({
                    icon: 'success',
                    title: 'Congratulations!',
                    text: response.data.message
                })
            }).catch((response) => {
                
                return Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong',
                    text: response.response.data.message
                })
            })

        }
    }
    
    return(
        <div class="w-full max-w-xl bg-white border border-gray-400 rounded-lg dark:bg-gray-900 dark:border-gray-700 transform transition duration-500 hover:scale-105 mt-3 mb-3" onClick={() => handleClickDetail(id)}>

    <a href="#">
        <img class="rounded-t-lg w-full h-[300px] text-center px-20" src={image} alt="product image" />
    </a>

    <div class="px-3 pb-1">

            <div className="flex flex-row justify-between">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mt-2">{name}</h5>
                <BsFillHeartFill onClick={() => handleFavorites(id)} className="w-5 h-5 mt-3 cursor-pointer text-slate-900 dark:text-slate-100" />
            </div>

        <div class="flex items-center mt-2.5 mb-5">
            <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
        </div>

        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 mb-2 dark:text-white">${price}</span>
                <a className="text-white cursor-pointer mb-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                    font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => handleClick()}>Add to cart
                </a>
        </div>
    </div>

</div>
  )
}