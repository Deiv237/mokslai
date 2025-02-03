import ThemeContext from "../ThemeContext";
import { useContext } from "react";
import {FaMoon} from 'react-icons/fa';
import {IoMdSunny} from 'react-icons/io';

function Profile() {
    const {theme, setTheme} = useContext(ThemeContext);
    const changeTheme = (theme) =>setTheme(theme);
    return (
     <div className="profile">
       <p>User Profile</p>
       <p>Theme: {theme}</p>
       {theme !== `dark` ? <FaMoon onClick={() => changeTheme('dark')}/> : <IoMdSunny onClick={() => changeTheme('light')}/>}
        </div>
   );
 }
 
 export default Profile;