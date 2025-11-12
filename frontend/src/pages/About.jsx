import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';

export default function About() {
    const members = [
        { name: 'Tran Minh Hai', role: 'Role 1', img: ''},
        { name: 'Le Mai Chi', role: 'Role 2', img: ''},
        { name: 'Nguyen Nhat Lam', role: 'Role 3', img: ''},
        { name: 'Nguyen Duc Nam', role: 'Role 4', img: ''},
        { name: 'Nguyen Huyen Minh Nhat', role: 'Role 5', img: './images/bibi.jpg' },
    ];

    return (
        <Container
            sx = {{ 
                textAlign: 'center',
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: '#2C325B',
             }}
            
            >
            {/* Our Mission */}
            <Typography variant="h3" gutterBottom
                sx = {{
                    fontWeight: 'bold',
                    mb: 2,
                    color: '#D6B585',
                }}
            > Our Mission </Typography>
            <Typography variant="body1" sx = {{
                mb: 4,
                fontSize: '1.2rem',
                color: '#ffffffff', 
                //  #3d2824 test color bruh bruh
            }}>Digi Capitale is a project team aiming for 
            the development of the D' Capitale residential area.</Typography>
        
            <Box sx={{ 
                my: 4,
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                color: '#D6B585',
                }}>
                {/* Confluence */}
                <Button 
                    variant = "contained" 
                    href = "https://cos20031-nguyenducnam.atlassian.net/wiki/spaces/COS20031/pages/98773/Digi+Capitale+Home+Page"
                    color = "#D6B585"
                > See Our Journey </Button>
       
                {/* Github */}
                <Button 
                    variant = "contained"
                    href = "https://github.com/MaiChiLe113/digi-capitale/tree/main/frontend"
                    color = "#D6B585"
                > See Our Production </Button>
            </Box>


            {/* Members */}
            <Typography variant = "h4" gutterBottom sx={{
                fontWeight: 'bold',
                mb: 2,
                color: '#D6B585',
            }}>Meet Our Team</Typography>
                
                <Grid 
                    container spacing = { 2 } 
                    justifyContent = "center"
                    alignItems = "stretch">
                    {members.map((member, index) => (
                        <Grid item xs={12} sm={6} md={2} key={index} sx={{display: "flex"}}>
                            <Card sx={{
                                width: 220,
                                height: 280,
                                textAlign: 'center', 
                                boxShadow: 4,
                                borderRadius: 2,
                                transition: 
                                    'transform 0.3s',
                                    '&:hover': { 
                                        transform: 'scale(1.05)',
                                        boxShadow: 10,
                                    },
                                }}>

                                <CardMedia
                                    component = "img"
                                    image = { member.img }
                                    alt = { member.name }
                                    sx = {{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 10,
                                        mx: 'auto',
                                        mt: 2,
                                    }}
                                />

                                
                                <CardContent>
                                    <Typography 
                                        variant = "h6" 
                                        sx = {{ 
                                            fontWeight: "bold",
                                            color: '#2C325B',
                                        }}> {member.name} </Typography>

                                    <Typography 
                                        variant = "subtitle1" 
                                        color = "text.secondary"
                                        > {member.role} </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
        </Container>
    );

    

}
