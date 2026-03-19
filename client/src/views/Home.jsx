import ProductList from '../components/ProductList';
import { useParams, useLocation } from 'react-router-dom';


function Home() {
    console.log(useParams(), useLocation());
    const location = useLocation();
    return (
    <>  
        <h2>Get fucked up - Drinks CO</h2>       
        <ProductList /*pathname={location.pathname}*//>
    </>
 );
}

export default Home;