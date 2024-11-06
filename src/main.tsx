import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import useUtilsStore from './store/utils';  // Importe o hook

const Main = () => {
  const { setUpTokenExpirationInterceptor } = useUtilsStore();

  // Chama o interceptor assim que o aplicativo é montado
  useEffect(() => {
    setUpTokenExpirationInterceptor();
  }, [setUpTokenExpirationInterceptor]);

  return <App />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);