import Header from "../../components/header";
import '../../App.css'
import Shop from "../../assets/pin_12.jpg";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Footer from "../../components/footer";

function Home(){
    return(
        <>
        <Header></Header>
        <div className="container-landing">
            <div className="h1">
                <h1 className="mb-4">Miles de productos de excelente calidad para ti. ¡Compra ahora!</h1>
                <div className="align-button">
                <Button style={{background: '#6f63d2', borderColor: '#6f63d2'}} as={Link} to="/register">¡Registrate ahora!</Button>
                </div>
            </div>
            <img src={Shop} className="image-landing" alt="shop"/>
        </div>
        <Footer></Footer>
        </>
    )
}

export default Home;