import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Paper,
} from "@mui/material";
import theme from "../theme";

export default function About() {
  const members = [
    {
      name: "Tran Minh Hai",
      role: "Role 1",
      img: "https://i.pinimg.com/1200x/cf/c8/21/cfc8215362bd6524be3bb231adbfe77c.jpg",
    },
    {
      name: "Le Mai Chi",
      role: "Role 2",
      img: "https://i.pinimg.com/736x/67/a5/08/67a508692a8bdb1e648d020f28237ef4.jpg",
    },
    {
      name: "Nguyen Nhat Lam",
      role: "Role 3",
      img: "https://i.pinimg.com/1200x/c4/38/f1/c438f1c4c951607ccc5b25264b3d0bb6.jpg",
    },
    {
      name: "Nguyen Duc Nam",
      role: "Role 4",
      img: "https://i.pinimg.com/736x/60/11/32/601132a3f13ddc885f63a6f0bcd067f8.jpg",
    },
    {
      name: "Nguyen Huyen Minh Nhat",
      role: "Role 5",
      img: "https://img.freepik.com/premium-photo/portrait-handsome-smiling-young-man-with-folded-arms-isolated-white-background_727137-9816.jpg?semt=ais_hybrid&w=740&q=80",
    },
  ];

  return (
    <Stack>
      <Box
        sx={{
          position: "relative",
          minHeight: "40vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          color: "white",
          padding: 4,
          backgroundImage: `url("https://media.istockphoto.com/id/1346944001/photo/close-up-of-co-workers-stacking-their-hands-together.jpg?s=612x612&w=0&k=20&c=lidJcFUSR3rkMt4B0yoNwH55lz3sth9o2280keqBXGE=")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            background: `rgba(0, 0, 0, 0.3)`,
            backdropFilter: "blur(3px)",
          },
          "& > *": {
            position: "relative",
            zIndex: 1,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h1" color="primary">
            Our Mission
          </Typography>
          <Typography variant="h5" color="primary.contrastText">
            Digi Capitale is a project team aiming for the development of the D'
            Capitale residential area.
          </Typography>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: 2,
            }}
          >
            {/* Confluence */}
            <Button
              variant="contained"
              href="https://cos20031-nguyenducnam.atlassian.net/wiki/spaces/COS20031/pages/98773/Digi+Capitale+Home+Page"
              color="primary"
            >
              {" "}
              See Our Journey{" "}
            </Button>

            {/* Github */}
            <Button
              variant="contained"
              href="https://github.com/MaiChiLe113/digi-capitale/tree/main/frontend"
              color="primary"
            >
              {" "}
              See Our Production{" "}
            </Button>
          </Box>
        </Box>
        {/* Our Mission */}
      </Box>

      {/* Members */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 2,
          margin: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h1">Meet Our Team</Typography>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="stretch"
        >
          {members.map((member, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={2}
              key={index}
              sx={{ display: "flex" }}
            >
              <Card
                sx={{
                  width: 220,
                  height: 280,
                  textAlign: "center",
                  boxShadow: 4,
                  borderRadius: 1,
                  background:
                    "linear-gradient(140deg, #f9dbb3ff 0%, #c88e3dff 100%)",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: 10,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={member.img}
                  alt={member.name}
                  sx={{
                    height: 200,
                    borderRadius: 0,
                    objectFit: "cover",
                    mx: "auto",
                    mt: 0,
                  }}
                />

                <CardContent sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "secondary.light",
                    }}
                  >
                    {" "}
                    {member.name}{" "}
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    {" "}
                    {member.role}{" "}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Stats Section */}
        <Typography variant="h1" sx={{ mt: 2 }}>
          About Us
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
              30+
            </Typography>
            <Typography variant="h5" sx={{ color: "primary.main", mb: 1 }}>
              Countries worldwide
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
                textAlign: "justify",
                maxWidth: "300px",
                mx: "auto",
              }}
            >
              Digi Capitale is continually expanding its services. We now help
              clients in multiple regions, including Asia and beyond. Our
              mission is to create seamless solutions for residential projects,
              ensuring quality and innovation at every step. With a growing
              network, we aim to set new standards in smart living.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
              50+
            </Typography>
            <Typography variant="h5" sx={{ color: "primary.main", mb: 1 }}>
              Qualified experts
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
                textAlign: "justify",
                maxWidth: "300px",
                mx: "auto",
              }}
            >
              Our team consists of highly skilled professionals specializing in
              design, development, and project management. Each member brings
              unique expertise, enabling us to tackle complex challenges with
              confidence. Collaboration is at the heart of our approach,
              ensuring that every solution is crafted with precision and care.
              Together, we deliver results that exceed expectations.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
              70%
            </Typography>
            <Typography variant="h5" sx={{ color: "primary.main", mb: 1 }}>
              Time saved on projects
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
                textAlign: "justify",
                maxWidth: "300px",
                mx: "auto",
              }}
            >
              By leveraging modern tools and streamlined workflows, we reduce
              project timelines by up to 70%. Our focus on efficiency means
              fewer delays and faster delivery without compromising quality.
              Clients benefit from quicker turnarounds, cost savings, and
              improved overall satisfaction. This commitment to speed and
              excellence sets us apart in the industry.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {/* Contribution */}
      <Box
        sx={{
          justifyItems: "center",
          m: 10,
          px: 4,
        }}
      >
        <Typography variant="h1" gutterBottom>
          Contribution
        </Typography>

        <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead
            style={{
              backgroundColor: theme.palette.primary.main,
              color: "white",
            }}
          >
            <th>Phase</th>
            {members.map((member, index) => (
              <th key={index}>{member.name}</th>
            ))}
          </thead>

          <tbody>
            <tr>
              <td>1-3</td>
              <td>
                <Typography variant="body3">
                  Meeting with clients, drafting ideasabout the project, define
                  project scope, and assigning team roles. Identify problem
                  statement, research project background, identify product
                  requirements. List features for WebApp
                </Typography>
              </td>
              <td>
                <Typography variant="body3">
                  Meeting with clients, researching and providing insights about
                  the D’capitale building, writing product requirement s
                  Proofread final files + export Confluence pages List features
                  for WebApp
                </Typography>
              </td>
              <td>
                <Typography variant="body3">
                  Meeting with clients, narrowing down the scope, and
                  identifying team roles Research project backgroun d, identify
                  requireme nts, write user story List features for WebApp
                  Review team’s work and provide feedback
                </Typography>
              </td>
              <td>
                <Typography variant="body3">
                  Meeting with clients, research project background Identify
                  product requireme nts and out-ofscope areas Document ing,
                  adding tasks to Jira, and writing meeting notes. Do risk
                  assessme nt for the project List features for WebApp
                </Typography>
              </td>
              <td>
                <Typography variant="body3">
                  research project background
                </Typography>
              </td>
            </tr>

            <tr>
              <td>4-6</td>
              <td>
                <Typography variant="body3">
                  Conduct meeting to update progress with client Drawing initial
                  ERD, choosing tech stack, proposing ideas for the WebApp
                </Typography>
              </td>
              <td>
                <Typography variant="body3">
                  Identify current problems of the building Design ERD, Design
                  prototype for the project
                </Typography>
              </td>
              <td>
                <Typography variant="body3">
                  Draw, connect, finalise ERD
                </Typography>
              </td>
              <td>
                <Typography variant="body3">
                  Monitor team health Design ERD
                </Typography>
              </td>
              <td>
                <Typography variant="body3">Design ERD</Typography>
              </td>
            </tr>

            <tr>
              <td>6-10</td>
              <td>
                <Typography variant="body3">
                  Generate data with mockaroo, planning for website Front-end
                  documentatio n, assign Web tasks to members
                </Typography>
              </td>
              <td>
                <Typography variant="body3">
                  Generate data, code frontend, write SQL query for the
                  functions
                </Typography>
              </td>
              <td>
                <Typography variant="body3">
                  Duplicate data, write SQL query for the functions Keep the
                  team on track with deadlines Add tasks to Jira
                </Typography>
              </td>
              <td>
                <Typography variant="body3">
                  Generate data, write SQL query for the functions Code frontend
                  landing page Add tasks to Jira
                </Typography>
              </td>
              <td>
                <Typography variant="body3">
                  Write SQL query for book utility function Code front-end
                </Typography>
              </td>
            </tr>

            <tr>
              <td>10-12</td>
              <td>
                <Typography variant="body3">
                  Code WebApp Team Reflection
                </Typography>
              </td>
              <td>
                <Typography variant="body3">
                  Code WebApp Video product Slide
                </Typography>
              </td>
              <td>
                <Typography variant="body3">
                  Duplicate data Code frontend for WebApp (home page) Team
                  reflection Test performan ce of the database
                </Typography>
              </td>
              <td>
                <Typography variant="body3">
                  Test performan ce of the database Document data generation
                  process, index + procedure performan ce testing. Team
                  reflection Content for product video slide
                </Typography>
              </td>
              <td>
                <Typography variant="body3">Code web</Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Stack>
  );
}
