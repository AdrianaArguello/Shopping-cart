import Header from "../../components/header";
import Footer from "../../components/footer";
import Container from 'react-bootstrap/Container';
import help from '../../assets/10162.jpg'


function Help(){
    return(
        <>
        <Header></Header>
        <Container style={{height: '90vh',display: 'flex', flexDirection: 'column',justifyContent: 'center'}}>
            <p style={{fontSize:'20px', textAlign: 'center', paddingTop:'47px'}}>
                Hola! si necesitas ayuda manda un correo a esta dirección tuayudanecesitas@gmail.com o puedes marcar a nuestro numero 0500-ayuda00.
            </p>
            <img style={{height:'330px', width: 'auto'}} src={help} alt="tuAyuda" />
        </Container>
        <Footer></Footer>
        </>
    )
}

export default Help;