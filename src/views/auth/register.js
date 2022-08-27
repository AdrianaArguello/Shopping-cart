import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Header from '../../components/header';
import Button from 'react-bootstrap/Button';
import Footer from '../../components/footer';

export default function Register(){
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users] = useState([]);

    const makeRequest = async () => {
        if(String(name).trim() === ""){
            alert("El nombre esta vacio")
        }else if(String(lastname).trim() === ""){
            alert("El apellido esta vacio")
        }else if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) === false) {
            alert("El email esta vacio")
        }else if(String(password).trim() === "") {
            alert("La contraseña esta vacia")
        }else {
            const jsnRegister = {
                "name": name,
                "lastname": lastname,
                "email": email,
                "password": password
            }
            let validateUsers = users.filter(users => users.email === email)
            console.log(validateUsers)
            if(validateUsers.length > 0){
                alert("este usuario ya esta registrado")
            }else{
                users.push(jsnRegister)
                cancelCourse();
                localStorage.setItem("users", JSON.stringify(users));
            }
        }
    }

    const cancelCourse = () => {
        setName('');
        setLastname('');
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
                <Card className="card-register">
                    <Card.Title className="mb-3 mt-3" style={{textAlign:'center'}}>Registro de usuarios</Card.Title>
                    <Card.Body>
                        <FloatingLabel controlId="name" label="Nombre" className="mb-3">
                            <Form.Control type="text" placeholder="Nombre" required value={name} onChange={(val) => setName(val.target.value)} autoComplete="off"/>
                        </FloatingLabel>
                        <FloatingLabel controlId="lastname" label="Apellido" className="mb-3">
                            <Form.Control type="text" placeholder="Apellido" required value={lastname} onChange={(val) => setLastname(val.target.value)} autoComplete="off"/>
                        </FloatingLabel>
                        <FloatingLabel controlId="email" label="Correo" className="mb-3">
                            <Form.Control type="Email" placeholder="Correo" required value={email} onChange={(val) => setEmail(val.target.value)} autoComplete="off"/>
                        </FloatingLabel>
                        <FloatingLabel controlId="password" label="Contraseña">
                            <Form.Control type="password" placeholder="Contraseña" required value={password} onChange={(val) => setPassword(val.target.value)} autoComplete="off"/>
                        </FloatingLabel>
                        <div className="align-button">
                            <Button className="mt-2" style={{background: '#6f63d2', borderColor: '#6f63d2'}} onClick={() => makeRequest()}>Registrar</Button>
                        </div>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            </Container>
        </div>
        <Footer></Footer>
        </>
    )
}