import { Chip } from "@mui/material";
import { Link } from "react-router-dom";

function Category( {text} ) {
   
    return (
    <Link to={`/categories/${text}/products`}>
      <Chip label={text}></Chip>
    </Link>
  );
    
}

export default Category;