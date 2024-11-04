
import iconLogout from '../../assets/imgs/logoutIcon.svg'
import easyParkLogo from '../../assets/imgs/easyParkLogo.svg'
import './StylesHeader.css'
import { useNavigate } from "react-router-dom";
import { logout } from '../../api/api';


export function Header(){
    const navigate = useNavigate();
    const handleLogout = async () => {
        logout();
        navigate("/")
    };
    
    return(
        <div className='navbar'>
            <img className='imgBoschEP' src={easyParkLogo} alt="easyParkLogo" />
            <button className='linkLogout' onClick={handleLogout}>
               <img className='imgLogout' src={iconLogout} alt="iconLogout"/>
               <span className="nav-text">Logout</span>
            </button>
        </div>
    );
}