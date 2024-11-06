import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';
import PrivateRoute from './PrivateRoute';

function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route
                    path='/home'
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route path='*' element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;
