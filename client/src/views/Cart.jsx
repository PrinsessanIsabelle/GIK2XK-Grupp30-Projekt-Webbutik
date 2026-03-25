import {
    Alert,
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

/* Komponent för att visa kundvagnen */
function Cart() {
    const { cart, isLoading, error, updateAmount, removeFromCart, clearAll, checkout } = useCart();

    const handleAmountChange = async (rowId, rawValue) => {
        const amount = Number(rawValue);
        if (!Number.isFinite(amount) || amount < 0) return;
        await updateAmount(rowId, amount);
    };

    const handleCheckout = async () => {
        const result = await checkout();
        if (result) {
            alert('Köpet genomfördes.');
        }
    };

    return (
        <Box sx={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
            <Typography variant="h4" gutterBottom>
                Kundvagn
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {isLoading ? (
                <Typography>Laddar kundvagn...</Typography>
            ) : cart?.rows?.length ? (
                <>
                {/* Visar varor i kundvagnen */}
                    <List>
                        {cart.rows.map((row) => (
                            <ListItem
                                key={row.id}
                                divider
                                secondaryAction={
                                    <IconButton edge="end" onClick={() => removeFromCart(row.id)}>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={row.product?.productName}
                                    secondary={`${row.product?.price} kr/st - Totalt: ${row.lineTotal} kr`}
                                />
                                <TextField
                                    label="Antal"
                                    type="number"
                                    size="small "
                                    sx={{ 
                                    width: 80,
                                    mr: 5,
                                    backgroundColor: 'white',
                                    borderRadius:'4px',
                                    border: '1px solid #060505'
                                 }}

                                    value={row.amount}
                                    onChange={(event) => handleAmountChange(row.id, event.target.value)}
                                    
                                />
                            </ListItem>
                        ))}
                    </List>

                    {/* Visar totalsumma och antal varor */}
                    <Stack spacing={1} mt={2} >
                        <Typography variant="h6" >Antal varor: {cart.totalAmount}</Typography>
                        <Typography variant="h6">Total: {cart.totalPrice} kr</Typography>
                    </Stack>

                    {/* Visar knappar för att tömma kundvagnen och gå till checkout */}
                    <Stack direction="row" spacing={2} mt={3}>
                        <Button variant="outlined" color="error" onClick={clearAll}
                          sx={{
                             backgroundColor: '#000',
                             color: 'white',
                             fontWeight: 'bold',

                            '&:hover': { backgroundColor: '#333' } }}>
                            Töm kundvagn
                        </Button>
                        <Button variant="contained" onClick={handleCheckout}
                            sx={{
                                 backgroundColor: '#b2ff59',
                                 color: '#000',
                                 fontWeight: 'bold',

                                 '&:hover': { backgroundColor: '#9cef5d' }
                                }}>
                            Checkout
                        </Button>
                    </Stack>
                </>
) : (
    /* Visar meddelande när kundvagnen är tom */
    <Stack spacing={2} mt={2} alignItems="flex-start">
        <Typography>Din kundvagn är tom.</Typography>
        <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{
                backgroundColor: '#b2ff59',
                color: '#000',
                fontWeight: 'bold',

                '&:hover': { backgroundColor: '#9cef5d' }
            }}
        >
            Fortsätt handla
        </Button>
    </Stack>
)}
        </Box>
    );
}

export default Cart;