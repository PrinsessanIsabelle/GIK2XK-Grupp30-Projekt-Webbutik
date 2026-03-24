import {TextField, Button, Box } from "@mui/material";
import { useState } from "react";
function CategoryField({ onSave }) {  
    const [categoryString, setCategoryString] = useState('');
return (
    <Box sx={{ display: 'flex', }}>
        <Box sx={{ width: '100%', display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
                value={categoryString}
                onChange={(e) => setCategoryString(e.target.value)}
                label="Kategorier (ange flera separerade med kommatecken)"
                name="categories"
                fullWidth
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    border: '1px solid #060505',
                }}
            />
            <Button
                onClick={() => onSave(categoryString)}
                sx={{
                    backgroundColor: '#b2ff59',
                    color: '#000',
                    fontWeight: 'bold',

                    
                    '&:hover': { backgroundColor: '#9cef5d' }
                }}
            >
                Lägg till kategori(er)
            </Button>
        </Box>
    </Box>
);
}

export default CategoryField;   