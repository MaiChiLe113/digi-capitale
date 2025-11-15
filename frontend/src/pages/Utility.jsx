import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, Avatar, Chip, Divider } from '@mui/material';
import { Pool, SportsBasketball, SportsTennis, SportsSoccer, LocalBar, OutdoorGrill, MeetingRoom, SportsKabaddi } from '@mui/icons-material';   

export default function Utility() {
    //utilities hardcoded for now
    const utilities = [
        {
            section: 'Health & Well-being',
            items: [
                { name: 'Swimming Pool', icon: <Pool />, status: 'Available', color: 'success' },
                { name: 'Basketball Court', icon: <SportsBasketball />, status: 'Maintenance', color: 'success' },
                { name: 'Tennis Court', icon: <SportsTennis />, status: 'Available', color: 'success' },
                { name: 'Badminton Court', icon: <SportsKabaddi />, status: 'Available', color: 'success' },
                { name: 'Soccer Field', icon: <SportsSoccer />, status: 'Available', color: 'success' },
            ]
        },

        {
            section: 'Community',
            items: [
                { name: 'Sky Bar', icon: <LocalBar />, status: 'Available', color: 'success' },
                { name: 'BBQ Garden', icon: <OutdoorGrill />, status: 'Full', color: 'error' },
                { name: 'Common Room', icon: <MeetingRoom />, status: 'Full', color: 'error' },
            ]
        }
    ]

    //reservations hardcoded for now
    const reservations = {
        today: [
            { name: 'C4 Swimming Pool', time: 'Today - 15:30', img: '', action: 'Cancel' },
        ],

        upcoming: [
            { name: 'C4 Swimming Pool', time: 'Today - 15:30', img: '', action: 'Cancel' },
            { name: 'BBQ Garden', time: '23/11/2025 - 20:15', img: '', action: 'Cancel' },
            { name: 'Basketball Court', time: '24/11/2025 - 09:45', img: '', action: 'Cancel' },
        ],

        past: [
            { name: 'C4 Swimming Pool', time: '12/08/2025 - 15:30', img: '', action: 'Book Again' },
            { name: 'BBQ Garden', time: '23/11/2025 - 20:15', img: '', action: 'Book Again' },
            { name: 'Basketball Court', time: '24/11/2025 - 09:45', img: '', action: 'Book Again' },
        ]
    };

    return (
        <Container sx={{ py: 4 }}>
            {/* Header */}
            <Box sx = {{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4,
            }}> 
                <Typography variant = "h4" color = 'secondary.main'> Utilities </Typography>
                <Button variant = "contained" color = 'primary'> Report Incidents </Button>
            </Box>

            {/* Utilities Section */}
            {utilities.map((section, index) => (
                <Box key={index} sx={{ mb: 6 }}>
                    <Typography variant="h5" sx={{ mb: 2, color: 'text.primary' }}>{section.section}</Typography>
                    <Grid container spacing={2}>
                        {section.items.map((item, i) => (
                        <Grid item xs={12} sm={6} md={4} key={i}>
                            <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar sx={{ bgcolor: 'primary.light' }}>{item.icon}</Avatar>
                                    <Typography variant="subtitle1">{item.name}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Chip label={item.status} color={item.color} variant="filled" />
                                    <Button variant="contained" color="primary">Book</Button>
                                </Box>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}

            <Divider sx={{ my: 4 }} />

            {/* Reservations Section */}
            <Typography variant="h5" sx={{ mb: 2}}> My Reservations </Typography>

            {/* Today */}
            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}> Today </Typography>
            {reservations.today.map(( res, index) => 
                <Card key={index} sx={{ mb: 2, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>  
                        <Avatar src={res.img} variant='rounded' sx={{ height: 64, width: 64}} />

                        <Box>
                            <Typography variant='subtitle1' color='text.primary'> {res.name} </Typography>
                            <Typography variant='body2' color='text.primary'> {res.time} </Typography>
                        </Box>                  
                    </Box>
                    <Button variant='contained' color='primary'> {res.action} </Button>
                </Card>
            )}

            
            {/* Upcoming */}
            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Upcoming</Typography>
            {reservations.upcoming.map((res, index) => (
                <Card key={index} sx={{ mb: 2, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={res.img} variant="rounded" sx={{ width: 64, height: 64 }} />
                        <Box>
                            <Typography variant="subtitle1">{res.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{res.time}</Typography>
                        </Box>
                    </Box>
                    <Button variant="outlined" color="primary">{res.action}</Button>
                </Card>
            ))}

            {/* Past */}
            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Past</Typography>
            {reservations.past.map((res, index) => (
                <Card key={index} sx={{ mb: 2, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={res.img} variant="rounded" sx={{ width: 64, height: 64 }} />
                        <Box>
                            <Typography variant="subtitle1">{res.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{res.time}</Typography>
                        </Box>
                    </Box>
                    <Button variant="outlined" color="primary">{res.action}</Button>
                </Card>
            ))}

        </Container>
    )
}
