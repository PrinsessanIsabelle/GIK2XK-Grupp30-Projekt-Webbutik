import { useEffect, useState } from 'react';
import Category from './Category';
import { getAll } from '../services/CategoryService';

function CategoryList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAll().then((response) => setCategories(response || []));
    }, []);

    return ( 
        <ul>
            {categories?.length > 0 ? (
                categories.map((category) => (
                    <li key={category.id}>
                        <Category text={category.name} />
                    </li>
                ))
            ) : (
                <h3>Kunde inte hämta kategorier</h3>
            )}
        </ul>
    );
}
export default CategoryList;