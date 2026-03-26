import { Card, CardContent, Typography, Box } from '@mui/material';

// Visar en recension med användare, datum, betyg och text
function Rating({ rating }) {
    return (
        <Card sx={{ marginBottom: 2, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        {rating.userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {new Date(rating.createdAt).toLocaleDateString('sv-SE')}
                    </Typography>
                </Box>
                <Typography variant="h6" color="primary" marginBottom={1}>
                    {'⭐'.repeat(Math.round(rating.rating))} {rating.rating}/5
                </Typography>
                <Typography variant="body1">
                    {rating.body}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Rating;