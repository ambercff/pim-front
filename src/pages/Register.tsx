import easyParkLogo from "../assets/imgs/easyParkLogo.svg";
import { FormRegister } from "../components/form_register/FormRegister";

export function Register(){
    return(
        <div className='container'>
                <div className='navbar'>
            <div className="img-header">
                <img className='imgBoschEP' src={easyParkLogo} alt="easyParkLogo" />
            </div>
        </div>
               <FormRegister/>
        </div>
    )
}