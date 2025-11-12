import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
// import Carousel from 'react-material-ui-carousel';

export default function About() {
    const members = [
        { name: 'Tran Minh Hai', role: 'Role 1'},
        { name: 'Le Mai Chi', role: 'Role 2'},
        { name: 'Nguyen Nhat Lam', role: 'Role 3'},
        { name: 'Nguyen Duc Nam', role: 'Role 4'},
        { name: 'Nguyen Huyen Minh Nhat', role: 'Role 5'},
    ];

    return (
        <Container>
            {/* Our Mission */}
            <Typography variant="h3" gutterBottom> Our Mission: </Typography>
            <Typography variant="body1">Digi Capitale is a project team aiming for 
            the development of the D' Capitale residential area.</Typography>
        

            <Box sx={{ my: 4 }}>
                {/* Confluence */}
                <Button href="https://cos20031-nguyenducnam.atlassian.net/wiki/spaces/COS20031/pages/98773/Digi+Capitale+Home+Page">
                    See Our Journey
                </Button>

                {/* Github */}
                <Button href="https://github.com/MaiChiLe113/digi-capitale/tree/main/frontend">
                    See Our Production
                </Button>

                {/* Members */}
                <Typography variant="h4" >
                    Meet Our Team
                </Typography>
{/* 
                <Carousel>
                    {members.map((member, index) => (
                        <Box 
                            key = {index}
                            sx={{
                                p: 3,
                                border: '1px solid #ccc',
                            }}>
                            <Typography variant="h5">{member.name}</Typography>
                            <Typography variant="subtitle1">{member.role}</Typography>
                        </Box>
                    ))}
                </Carousel> */}
            </Box>
        </Container>
    );

    
}