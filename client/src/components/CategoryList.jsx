import { useEffect, useState } from 'react';
import { getAll } from '../services/CategoryService';
import { Box, Chip, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function CategoryList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAll().then((response) => setCategories(response || []));
    }, []);

    return (
        <Box>
            {categories?.length > 0 ? (
                <Grid container spacing={2} justifyContent="center">
                    {categories.map((category) => (
                        <Grid item key={category.id}>
                            <Link to={`/categories/${category.name}/products`} style={{ textDecoration: 'none' }}>
                                <Chip
                                    label={category.name}
                                    sx={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        padding: '24px 8px',
                                        backgroundColor: '#b2ff59',
                                        color: '#000',
                                        border: '2px solid #b2ff59',
                                        '&:hover': {
                                            backgroundColor: '#9cef5d',
                                            borderColor: '#9cef5d',
                                            transform: 'scale(1.05)',
                                            transition: 'all 0.3s ease'
                                        }
                                    }}
                                />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Kunde inte hämta kategorier
                </Typography>
            )}
        </Box>
    );
}

export default CategoryList;