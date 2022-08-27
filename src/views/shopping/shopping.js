import React, {useEffect, useState} from 'react';
import Header from "../../components/header";
import { useParams } from "react-router-dom";
import {Card, Spinner} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import '../../App.css';
import Footer from '../../components/footer';

function Shopping(){
    const {id} = useParams();
    const [arrProduct] = useState([]);
    const [shoppingList, setShoppingList] = useState([]);
    const [temp, setTemp] = useState(false);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const getData = (id) =>{
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
            let productId = myJson.products.filter(products => products.id === Number(id))[0];
            let arrShopping = [];
            if(localStorage.getItem('shoppingCart') !== null){
                arrShopping = JSON.parse(localStorage.getItem("shoppingCart"));
                console.log(arrShopping);
            }
            if(arrProduct.length === 0){
                if(localStorage.getItem('shoppingCart') === null){
                    arrProduct.push(productId)
                    localStorage.setItem("shoppingCart", JSON.stringify(arrProduct));
                    shoppingList.push(productId);
                    setShoppingList(shoppingList);
                    getTotal();
                    setLoading(false);
                }
                let duplicateValues = arrShopping.filter(element => element.id === productId.id);
                if(duplicateValues.length > 0){
                    if(localStorage.getItem('shoppingCart') !== null){
                        arrShopping = JSON.parse(localStorage.getItem("shoppingCart"));
                        shoppingList.splice(0,arrShopping.length,...arrShopping)
                        setShoppingList(shoppingList);
                        getTotal();
                        setLoading(false);
                    }else{
                        setTemp(true);
                    }
                }else{
                    arrProduct.push(productId)
                    arrShopping = [...arrShopping, productId]
                    shoppingList.splice(0,arrShopping.length,...arrShopping)
                    localStorage.setItem("shoppingCart", JSON.stringify(shoppingList));
                    setShoppingList(shoppingList);
                    getTotal();
                    setLoading(false);
                }
            }
        });
    };

    useEffect(()=>{
        getData(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    function handleIncrement(id) {
        let Temp = shoppingList.map((element) => {
            if(element.id === id){
                element.quantity = element.quantity + 1;
            }
            return element;
        })

        setShoppingList(Temp);
        getTotal();
    }

    const handleDecrement = (id) => {
        let tempDec = shoppingList.map((element) => {
            if(element.id === id){
                if(element.quantity > 0){
                    element.quantity = element.quantity - 1;
                }
            }
            return element;
        })
        setShoppingList(tempDec);
        getTotal();
    }

    const handleDelete = (id) => {
        let tempItem = shoppingList.filter(element => element.id !== id);
        console.log('tempItem', tempItem)
        shoppingList.splice(0, tempItem.length + 1, ...tempItem)
        setShoppingList(shoppingList);
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingList));
        if(shoppingList.length === 0){
            setTemp(true)
        }
        getTotal();
    }

    const getTotal = () => {
        let tempTotal = 0;
        console.log(shoppingList)
        const sumTotal = shoppingList.reduce(
            (previousValue, currentValue) => previousValue + (currentValue.price * currentValue.quantity),
            tempTotal
        );
        console.log('total', sumTotal)
        setTotal(sumTotal)
    }



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
        <Container>
            {
                (temp === true) ?  <>
                <div style={{height: '90vh', textAlign: 'center'}}>
                    <h1>Debe agregar productos al carrito</h1>
                    <Link to="/"> Regresar </Link>
                </div>
                </> : <>
                <Row xs={1} md={12} lg={12}>
                        {
                            shoppingList.map( (item, i) => (
                                <Col key={i}>
                                    <Card style={{ width: 'auto', display: 'flex', flexDirection:'inherit' }}>
                                    <Card.Img style={{height: '200px', width: '40%'}} variant="top" src={item.images[0]} />
                                    <Card.Body>
                                        <div style={{position: 'absolute', right: '30px'}}>
                                            <button className="icon-x" onClick={() => handleDelete(item.id)}>X</button>
                                        </div>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>
                                        {item.description}
                                        <br/>
                                        precio: {item.price}
                                        <br/>
                                        total: {item.price * item.quantity}
                                        </Card.Text>
                                        <div style={{display: 'flex'}}>
                                            <button className="icon-menos" onClick={() => handleDecrement(item.id)}> - </button>
                                            <div className='quantity'>{item.quantity}</div>
                                            <button className="icon-mas" onClick={() => handleIncrement(item.id)}> + </button>
                                        </div>
                                    </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                        <Col>
                            <Card style={{textAlign:'center'}}>
                                <h3>Resumen de la compra</h3>
                                <div className="mt-2 mb-2" style={{fontSize: '21px'}}>
                                    total: {total}
                                </div>
                            </Card>
                        </Col>
                </Row>
                <div className="mt-5 mb-5" style={{display: 'flex', justifyContent: 'center'}}>
                    <Link className='button-link' to="/">Seguir agregando productos</Link>
                </div>
                </>
            }
        </Container>
        </>
        }
        <Footer></Footer>
        </>
    )
}

export default Shopping;