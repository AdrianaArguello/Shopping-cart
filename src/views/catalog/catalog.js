import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Header from "../../components/header";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import {Row, Spinner}from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import '../../App.css';
import Footer from '../../components/footer';

function Catalog(){

    const [catalog, setCatalog] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = () =>{
        fetch('products.json', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(function(response){
            return response.json();
        })
        .then(function(myJson) {
            setCatalog(myJson.products);
            setLoading(false);
        });
    };

    useEffect(()=>{
        getData()
    },[])

    return(
        <>
        <Header></Header>
        {
        (loading) ? <>
        <div style={{
            position: 'absolute',
            display: 'block',
            top: '50%',
            left: '50%',
            }}>
            <Spinner animation="grow" variant="success" />
            </div>
            </>:
            <>
            <Container className="mb-5">
                <Row xs={1} md={3} lg={4}>
                        {
                            catalog.map( (cat, i) => (
                                <Col key={i}>
                                    <Card style={{ width: 'auto' }}>
                                    <Card.Img variant="top" src={cat.images[0]} />
                                    <Card.Body className="card-body-list">
                                        <Card.Title>{cat.title}</Card.Title>
                                        <Card.Text>
                                        {cat.description}
                                        <br/>
                                        precio: {cat.price}
                                        </Card.Text>
                                        <Link className="button-link" to={`/view/${cat.id}`}>Ver Detalles</Link>
                                        <br/>
                                        <br/>
                                        <Link className="button-link" to={`/shopping/${cat.id}`}>Agregar al carrito</Link>
                                    </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                </Row>
            </Container>
            </>
        }
        <Footer></Footer>
        </>
    )
}

export default Catalog;