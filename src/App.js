import React, {useEffect, useReducer} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './views/auth/login';
import Register from './views/auth/register';

import {AuthContext} from './context/AuthContext';
import Catalog from './views/catalog/catalog';
import ViewCatalog from './views/catalog/viewCatalog';
import Home from './views/home/home';
import Shopping from './views/shopping/shopping';
import {Spinner} from 'react-bootstrap';
import Help from './views/help/help';

export default function App() {
  const initialLoginState = {
    token: null
  }

  const loginReducer = (prevState, action) => {
    // eslint-disable-next-line default-case
    switch(action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          token: action.token
        }
      case 'LOGIN':
        return {
          ...prevState,
          token: action.token
        }
      case 'LOGOUT':
        return {
          ...prevState,
          token: action.token
        }
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        try {
          window.localStorage.setItem("tk", data);
        }
        catch(e) {
          console.log(e)
        }
        dispatch({type: 'LOGIN', token: data});
      },
      signOut: () => {
        window.localStorage.removeItem("tk");
        dispatch({type: 'LOGOUT', token: null});
      }
    }),
    []
  );

  useEffect(() => {
    const checkToken = async () => {
      let userToken;
      try {
        userToken = window.localStorage.getItem("tk");
      }
      catch(e) {
        console.log(e)
      }
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    }
    checkToken();
  }, [])


  return (
    <React.StrictMode>
      {
        (loginState.isLoading) ? <>
        <div style={{
            position: 'absolute',
            display: 'block',
            top: '50%',
            left: '50%',
          }}>
            <Spinner animation="grow" variant="success" />
          </div>
          </> :
          <>
          <AuthContext.Provider value={authContext}>
            <BrowserRouter>
              <Routes>
                {
                  (loginState.token === null) ? <>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </> : <>
                    <Route path="/" element={<Catalog />} />
                    <Route path="/view/:id" element={<ViewCatalog />} />
                    <Route path="/shopping/:id" element={<Shopping />} />
                    <Route path="/help" element={<Help />} />
                  </>
                }
              </Routes>
            </BrowserRouter>
          </AuthContext.Provider>
          </>
      }
    </React.StrictMode>
  );
}