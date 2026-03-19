import { Button } from "@mui/material";

function RatingForm() {
    return ( 
        <form>
            <div>
                Rating: <input type="text" />
            </div>
            <div>
             Review: <textarea rows="5"></textarea>
            </div>
            <Button>Skicka rating</Button>
        </form>
     );
}

export default RatingForm;