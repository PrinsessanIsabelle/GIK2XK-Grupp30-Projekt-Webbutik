import { Chip } from "@mui/material";
import { Link } from "react-router-dom";

function Category( {text} ) {
   
    return (
    <Link to={`/categories/${text}/products`}>
<Chip
  label={text}
  sx={{
    backgroundColor: '#b2ff59',
    color: '#000',
    border: '2px solid #b2ff59',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#9cef5d',
      borderColor: '#9cef5d'
    }
  }}
/>
    </Link>
  );
    
}

export default Category;