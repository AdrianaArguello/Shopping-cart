import React, {useState, useContext} from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Header from '../../components/header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { makeLoginData } from '../../api/request';
import {AuthContext} from './../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import Footer from '../../components/footer';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {signIn} = useContext(AuthContext);
    let navigate = useNavigate();


    const logIn = async () => {
        if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) === false) {
            alert("El email esta vacio")
        }else if(String(password).trim() === "") {
            alert("La contraseña esta vacia")
        }else {
            const jsn = {
                'email': email,
                'pass': password
            }
            console.log(email, password)
            cancelCourse();
            var usersRegister = JSON.parse(localStorage.getItem("users"));
            let validateUsers = usersRegister.filter(users => users.email === email);
            console.log('usuarios registrados', usersRegister)
            if(validateUsers[0].email === email && validateUsers[0].password === password){
                const res = await makeLoginData(jsn);
                signIn(res);
                navigate('/');
                console.log('puedes iniciar sesion')
            }else{
                console.log('no puedes iniciar sesion')
            }
        }
    }

    const cancelCourse = () => {
        setEmail('');
        setPassword('');
    }

    return (
    <>
        <Header></Header>
        <div className="container-landing">
        <Container fluid="md">
        <Row>
            <Col>
                <Card className="card-login">
                    <Card.Body>
                        <Card.Title className="mb-4" style={{textAlign: 'center'}}>Inicio sesión</Card.Title>
                        <FloatingLabel controlId="email" label="Correo" className="mb-5">
                            <Form.Control type="text" placeholder="Correo" value={email} onChange={(val) => setEmail(val.target.value)} autoComplete="off"/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Contraseña" className="mb-5">
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(val) => setPassword(val.target.value)} autoComplete="off"/>
                        </FloatingLabel>
                        <div className="align-button">
                        <Button style={{background: '#6f63d2', borderColor: '#6f63d2'}} onClick={() => logIn()}>Iniciar sesión</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </Container>
        </div>
        <Footer></Footer>
    </>
    );
}

export default Login;