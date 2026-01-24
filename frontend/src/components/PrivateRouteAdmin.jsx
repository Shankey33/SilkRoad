//React imports
import {useContext} from 'react';
import { Navigate } from 'react-router-dom';

//local imports
import { AuthContext } from '../AuthContext.jsx';
import loading_gif from '../assets/loading.gif';

const PrivateRouteAdmin = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    console.log(user);

    if(loading){
        return <div className=''><img src={loading_gif} alt="loading..." /></div>
    }

    return user?.role === 'seller' ? children : <Navigate to="/" />
}

export default PrivateRouteAdmin;
