import { Typography, Box } from '@mui/material';

// Beräknar och visar sammanfattat snittbetyg för en produkt
function RatingSummary({ ratings }) {
    if (!ratings || ratings.length === 0) {
        return (
            <Typography variant="body2" color="text.secondary">
                Inga recensioner ännu
            </Typography>
        );
    }

    const average = (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1);
    const stars = '⭐'.repeat(Math.round(average));

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body1">{stars}</Typography>
            <Typography variant="body1" fontWeight="bold">{average}/5</Typography>
            <Typography variant="body2" color="text.secondary">({ratings.length} recensioner)</Typography>
        </Box>
    );
}

export default RatingSummary;