import { FormLogin } from "../components/form_login/FormLogin";
import easyParkLogo from "../assets/imgs/easyParkLogo.svg";

export function Login(){
    return(
        <div className='container'>
                <div className='navbar'>
            <div className="img-header">
                <img className='imgBoschEP' src={easyParkLogo} alt="easyParkLogo" />
            </div>
        </div>
               <FormLogin/>
        </div>
    )
}