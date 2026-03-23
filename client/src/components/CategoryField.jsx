import {TextField, Button } from "@mui/material";
import { useState } from "react";
function CategoryField({ onSave }) {  
    const [categoryString, setCategoryString] = useState('');
    return ( 
    <>
        <TextField
        value={categoryString}
        onChange={(e) => setCategoryString(e.target.value)}
        label="Kategorier(ange flera separerade med kommatecken"
        name="categories"
        />
        <Button onClick={() => onSave(categoryString)}>Lägg till kategori(er)</Button>
    </>
    );
}

export default CategoryField;   