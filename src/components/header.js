import React, {useEffect, useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import icon from '../assets/shop-2.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const [exist, setExist] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
    const checkToken = async () => {
        let userToken;
        try {
        userToken = window.localStorage.getItem("tk");
        if(userToken !== null){
            setExist(true)
        }else{
            setExist(false)
        }
        }
        catch(e) {
        console.log(e)
        }
    }
    checkToken();
    }, [])

    const logout = () => {
        localStorage.removeItem('tk');
        localStorage.removeItem('shoppingCart');
        setExist(false);
        navigate('/login');
        window.location.reload(false);
    };

    return (<>
        <Navbar variant="dark" expand="lg" style={{backgroundColor: '#6f63d2'}}>
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img style={{height: '36px', marginRight: '4px'}} src={icon} alt="shopping-icon" />
                    WePurchase
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {
                        (exist === true) ? <>
                        <Nav.Link as={Link} to="/">Articulos</Nav.Link>
                        <Nav.Link as={Link} to="/help">Ayuda</Nav.Link>
                        <Nav.Link onClick={() => logout()}>Cerrar sesión</Nav.Link>
                        </> : <>
                        <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
                        <Nav.Link as={Link} to="/register">Registro</Nav.Link>
                        </>
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>)
}