import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';
import PrivateRoute from './PrivateRoute';
import { EntradasSaidas } from '../pages/EntradasSaidas';

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
                <Route 
                    path="/entradas_saidas" 
                    element={
                        <PrivateRoute>
                            <EntradasSaidas />
                        </PrivateRoute>
                    } 
                />
                <Route path='*' element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;
