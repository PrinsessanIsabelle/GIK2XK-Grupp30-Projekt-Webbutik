import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { createRating } from "../services/ratingService";

function RatingForm({ productId, onSave }) {
    const [rating, setRating] = useState({ rating: '', body: '' });
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
    try {
        await createRating(productId, rating.rating, rating.body);
        onSave();
        setRating({ rating: '', body: '' });
        setError(null);
    } catch (err) {
        setError(err.message);
    }
};

    return ( 
        <form>
            {error && <Typography color="error">{error}</Typography>}
            <div>
                <TextField 
                    value={rating.rating}
                    onChange={(e) => setRating({ ...rating, rating: e.target.value })}           
                    label="Rating"
                />
            </div>
            <div>
                <TextField 
                    multiline minRows={3}
                    value={rating.body}
                    onChange={(e) => setRating({ ...rating, body: e.target.value })} 
                    label="Review"
                    name="body"
                    id="body"
                />
            </div>
            <Button onClick={handleSubmit}>Skicka rating</Button>
        </form>
    );
}

export default RatingForm;