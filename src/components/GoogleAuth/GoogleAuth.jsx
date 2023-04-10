import {BsGoogle} from 'react-icons/bs'

export default function Auth() {
    
    const BACK_URL = "https://phonezoneback-production.up.railway.app"
    const handleClick =  () => {
        window.open(`${BACK_URL}/auth/google`, '_self');
    }

    return (
        <div className="w-full h-5 text-gray-400 text-center">
            <button  className="w-5 h-8" onClick={() => handleClick()}>
                <BsGoogle size={30} style={{margin: '0px 7px'}}/>
            </button>
        </div>
    )
}