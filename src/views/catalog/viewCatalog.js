import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';
import {Card, Spinner} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';


function ViewCatalog(){
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = () =>{
        fetch('../products.json', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(function(response){
            return response.json();
        })
        .then(function(myJson) {
            let product = myJson.products.filter(products => products.id === Number(id));
            setProduct(product[0]);
            setImages(product[0].images);
            setLoading(false);
        });
    };

    useEffect(()=>{
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                </> : <>
                <div className="container-viewdetail">
                <Carousel className="view">
                    {
                    images.map((image, i) => (
                    <Carousel.Item key={i}>
                        <img
                        className="d-block w-100 image"
                        src={image}
                        alt="First slide"
                        />
                    </Carousel.Item>
                    ))
                    }
                </Carousel>
                <Card className="view" style={{ marginTop: '0'}}>
                <Card.Body style={{textAlign: 'center'}}>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text style={{fontSize:'18px'}}>
                    Marca: {product.brand}
                    <br/>
                    Categoria: {product.category}
                    <br/>
                    Descripción: {product.description}
                    <br/>
                    Precio: {product.price}
                    </Card.Text>
                    <Link className="button-link" to={`/shopping/${product.id}`}>Agregar al carrito</Link>
                </Card.Body>
                </Card>
                </div>
                </>
            }
            <Footer></Footer>
        </>
    )
}

export default ViewCatalog;