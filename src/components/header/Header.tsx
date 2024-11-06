
import easyParkLogo from '../../assets/imgs/easyParkLogo.svg'
import './StylesHeader.css'
import { useNavigate } from "react-router-dom";
import { logout } from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';


export function Header(){
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout(); 
            navigate("/");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };
    
    return(
        <div className='navbar'>
            <div className="img-header">
                <img className='imgBoschEP' src={easyParkLogo} alt="easyParkLogo" />
            </div>
            <div className="container-logout">
                <button className='btn-logout' onClick={handleLogout}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className='icon-logout'/>
                    <span className="nav-text">Logout</span>
                </button>
            </div>
        </div>
    );
}