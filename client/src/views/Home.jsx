import ProductList from '../components/ProductList';
import { Grid } from '@mui/material';

function Home() {
    return (
    <>  
    <h2>Get fucked up - Drinks CO</h2>
    <Grid container spacing={2}>
        <Grid item xs={200} md={100}>          
            <ProductList />
        </Grid>
    </Grid>
    </>
 );
}

export default Home;