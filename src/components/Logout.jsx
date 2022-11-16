import React from 'react';
import { auth } from '../firebase'

const Logout = () => {
    return (
        <div>
            <i class="fa-solid fa-right-from-bracket" style={{"font-size": "26px", "margin-left": "10px", "cursor": "pointer"}} onClick={()=> auth.signOut()}></i>
        </div>
    );
}

export default Logout;