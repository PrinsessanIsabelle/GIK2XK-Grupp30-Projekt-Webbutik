import { Button, TextField } from "@mui/material";
import { useState } from "react";

function RatingForm({ onSave }) {

    const [rating, setRating] = useState({ rating: '', body: '', userId: 1});

    return ( 
        <form>
            <div>
                <TextField 
                value={rating.rating}
                onChange={(e) => setRating({ ...rating, rating: e.target.value })}           
                label="Rating"
                name=""
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
            <Button onClick={() => onSave(rating)} >Skicka rating</Button>
        </form>
     );
}

export default RatingForm;