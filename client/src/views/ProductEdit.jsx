import { Button } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { create, getOne, remove, update } from "../services/ProductService";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Chip } from "@mui/material"
import CategoyField from "../components/CategoryField";

/* Komponent för att redigera en produkt */
function ProductEdit() {
    const emptyProduct = {id: 0, productName: '', price: '', imageUrl: '', description: '', categories: [], userId: 1}
    const [product, setProduct] = useState(emptyProduct);
    const { id } = useParams();
    const navigate = useNavigate();

    
    useEffect(() => {
        if (id) {
            getOne(id).then((product) => setProduct(product));
        }
        else {
            setProduct(emptyProduct)
        }
      }, [id]);
    
    function onChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        const newProduct = {...product, [name]: value }
        setProduct(newProduct);
    }

    function onSave() 
    {
        if (product.id === 0) 
        {
            create(product).then((response) => 
            {
                navigate('/', { replace: true, state: response })
            }); 
        }    else 
            {
                update(product).then((response) => 
            navigate(`/products/${product.id}`, { replace: true, state: response }));
            }
     }
    
     function onDelete() {
        remove(product.id).then(response => navigate('/', { replace: true, state: response }));
     }

     function onCategoryAdd(categoryString) {
        //splitta arrayen vid kommatecken
        const categoryArray = categoryString.split(",");
        //trimma whitespace runt taggar
        const uniqueAndTrimmedCategories = categoryArray.map((category) => category.trim())
        .filter(category => !product.categories.includes(category));

        //slå samman befintlig category-array med de nya, unika kategorierna
        const mergedArray = [...product.categories, ...uniqueAndTrimmedCategories];

        //spara befintlig produkt med nya kategoriarrayen till state
        setProduct({...product, categories: mergedArray});
     }

     function onCategoryDelete(categoryToDelete) {
        const newCategories = product.categories.filter((category) => category !== categoryToDelete);
        setProduct({...product, categories: newCategories});
     }

    return ( 
        <form
         style={{
    display: 'grid',
    gap: '20px',
    padding: '20px'
  }}>

            <div> 
                <TextField onChange={onChange} value={product.productName} name="productName" id="productName" label="ProduktNamn" sx={{backgroundColor: 'white', borderRadius: '4px', width: '100%', border: '1px solid #060505',}}  />
            </div>
            <div>
                <TextField onChange={onChange} value={product.price} name="price" id="price" label="Pris" sx={{backgroundColor: 'white', borderRadius: '4px', width: '100%', border: '1px solid #060505',}}/>
            </div>  
            <div>  
                <TextField onChange={onChange} value={product.description}t multiline minRows={5} name="description" id="description" label="Beskrivning" sx={{backgroundColor: 'white', borderRadius: '4px', width: '100%', border: '1px solid #060505',}}/>
            </div>
            <div>
                <TextField onChange={onChange} name="imageUrl" id="imageUrl" label="BildUrl" sx={{backgroundColor: 'white', borderRadius: '4px', width: '100%', border: '1px solid #060505',}}/>
            </div>
            <div>
                {product?.categories?.length > 0 &&
                    product.categories.map((category) => <Chip onDelete={() => onCategoryDelete(category)} key={category} label={category}  />)}
            </div>
            <div>
                <CategoyField onSave={onCategoryAdd} />
            </div>
            <div>
                <Button variant='contained' onClick={() => navigate(-1)}>Tillbaka</Button>  
                {id && (
                    <Button onClick={onDelete} variant="contained" color="error">
                        Ta bort
                        </Button>
                    )}
                <Button onClick={onSave} variant='contained' color="success">Spara</Button>
            </div>  
        </form>            
     );
}

export default ProductEdit;