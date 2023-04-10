import { useEffect, useState } from "react"
import { DeleteProductLocalStorage, UpdateStockProductLocalStorage } from "../../helpers/Cart";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function Cart(){

  const Phones = useSelector((state) => state.Phones)
  const User = useSelector((state) => state.User)
  const[carrito, setCarrito] = useState({});
  const[Actualizar, setActualizar] = useState(false);
  
  useEffect(() => {

    if(window.localStorage.getItem('carrito-db')){

    }

    if(window.localStorage.getItem('carrito-ls')){
      setCarrito(JSON.parse(window.localStorage.getItem('carrito-ls')));
    }

    else{
      setCarrito({});
    }
    
  }, [Actualizar])

  const DeleteProduct = (id) => {

    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to delete the product?',
      confirmButtonText: 'Delete',
      showDenyButton: true,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed){
        DeleteProductLocalStorage(id);
        setActualizar(!Actualizar);
        console.log(carrito)
        Swal.fire({
          icon: 'success',
          title: 'Congratulations!',
          text: 'The product was deleted',
        })
      }
    })
  }

  const handleStock = (operator, id, stock) => {

    const valor = UpdateStockProductLocalStorage(operator, id, stock);

    if(valor !== undefined){
       Swal.fire({
        icon: valor.icon,
        title: valor.title,
        text: valor.text,
      })
    }

    setActualizar(!Actualizar);
  }

  const GetStockProduct = (id) => {

    for(let i=0; i<Phones.length; i++){
      if(id === Phones[i].id){
        return Phones[i].stock;
      }
    }
  }

  const handleSubmit = () => {

    if(Object.keys(User).length === 0){
      return Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        text: 'You have to have an account to buy',
      })
    }
  }

  const RenderEmptyCart = () => {
    return (
      <section className="flex items-center h-[calc(100vh-6.5rem)] p-16 dark:bg-gray-900 dark:text-gray-100">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
			<h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
				<span className="sr-only">Error</span>😥
			</h2>
			<p className="text-2xl font-semibold md:text-3xl">Sorry, but your cart is empty</p>
			<p className="mt-4 mb-8 dark:text-gray-400">But don't worry, you can add products from the store</p>
		</div>
	</div>
</section>
    )
  }

  return(

    <div className="Cart">

      <Header />

    <div className="dark:bg-slate-900">
      <div class="container mx-auto">

        {
          Object.keys(carrito).length === 0  ? <RenderEmptyCart /> :

        <div class="flex shadow-md py-5">
          <div class="w-3/4 h-[calc(100vh-8.8rem)] px-10 py-4 overflow-auto border dark:bg-gray-900 dark:border-gray-800 text-slate-900 dark:text-slate-100 ">

            <div class="flex justify-between border-b pb-5 dark:border-gray-700">
              <h1 class="font-semibold text-2xl">Shopping Cart</h1>
              <h2 class="font-semibold text-2xl">{carrito?.quantity} Items</h2>
            </div>

            <div class="flex mt-8 mb-5 justify-between dark:text-gray-400">
              <h3 class="font-semibold text-xs uppercase w-2/5 ml-4">Product Details</h3>
              <h3 class="font-semibold text-center text-xs uppercase w-1/5 pr-5">Quantity</h3>
              <h3 class="font-semibold text-center text-xs uppercase w-1/5 pr-3">Stock</h3>
              <h3 class="font-semibold text-center text-xs uppercase w-1/5">Price</h3>
              <h3 class="font-semibold text-center text-xs uppercase w-1/5">Total</h3>
            </div>

            {
             carrito && carrito.productcarts?.map((product) => {
                return (
                <div class="flex items-center py-5 border-b dark:border-gray-700">
                  <div class="flex w-2/5"> 
                    <div class="w-20">
                      <img class="h-24 ml-2" src={product.image} alt="photo" />
                    </div>

                    <div class="flex flex-col justify-between ml-4 flex-grow">
                      <span class="font-bold text-xs uppercase">{product?.name}</span>
                      <span class="text-red-500 text-xs">{product.brand?.name}</span>
                      <a onClick={() => DeleteProduct(product.id)} class="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer">Remove</a>
                    </div>
                </div>

                  <div class="flex justify-center w-1/5">

                    
                    <svg onClick={() => handleStock('-', product.id, GetStockProduct(product.id))} className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>

                    <input className="mx-2 border text-center w-8 dark:bg-gray-600" type="text" value={product?.quantity} />

                    <svg onClick={() => handleStock('+', product.id, GetStockProduct(product.id))} className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32
                        32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                    </svg>

                  </div>
          
                  <span class="text-center w-1/5 font-semibold text-sm">{GetStockProduct(product.id)}</span>
                  <span class="text-center w-1/5 font-semibold text-sm">${product.price}.00</span>
                  <span class="text-center w-1/5 font-semibold text-sm">${product.total}.00</span>
        </div>
                )
              })
            }
      </div>

      <div id="summary" class="w-1/4 px-8 py-4 bg-slate-100">

        <h1 class="font-semibold text-2xl border-b pb-5 mb-4">Order Summary</h1>
       
          <div>
            <label class="font-medium inline-block mb-3 text-sm uppercase">Payment method</label>
              <select class="block p-2 text-gray-600 w-full text-sm">
                <option>MercadoPago</option>
                <option>PayPal</option>
              </select>
          </div>

          <div>
            <label class="font-medium inline-block mb-3 text-sm uppercase mt-8">Address</label>
            <input type="text" className="block p-2 w-full text-sm border border-gray-600 text-gray-600" />
          </div>
        
          <div class="border-t mt-8">
            <div class="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>${carrito.totalValue}.00</span>
            </div>

            <button
              onClick={() => handleSubmit()}
              className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout
            </button>
          </div>
      </div>
    </div>
  }
  </div>
  </div>

            <Footer />
  </div>
  )
}
