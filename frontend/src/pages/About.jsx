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
      img: "https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-1/574476450_2280964512408753_2767848676934015635_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_ohc=UJ22DCQ9HQQQ7kNvwHmVTtt&_nc_oc=AdlYldVO9RKf_PtTjqOLYcwLMsnXe8VjMjH3G5f7LwwldXMD-dT_IGRUMJ4CCw6YSHg&_nc_zt=24&_nc_ht=scontent.fhan5-9.fna&_nc_gid=LuulqzYVS7PxEenzncts1w&oh=00_Afg1vE0Ar465LD6rCLu-_U8Cw3RbbFeLiUecxQTUdHGI3A&oe=691DABB0",
    },
    {
      name: "Le Mai Chi",
      role: "Role 2",
      img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=faces&fit=crop&w=200&h=200",
    },
    {
      name: "Nguyen Nhat Lam",
      role: "Role 3",
      img: "https://scontent.fhan5-6.fna.fbcdn.net/v/t39.30808-6/440928634_1233348624715488_6688028666977266526_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=KF8eED2P-PkQ7kNvwGAGa7I&_nc_oc=AdlaW9ooD_AxYq5P641a-UJ1oakkPC-LUiq9NPwylTqypQQ7rroKGb7GixnRQjZ3bcU&_nc_zt=23&_nc_ht=scontent.fhan5-6.fna&_nc_gid=c1H1uXSHwZGcKwFjk8zPYg&oh=00_AfiR7bwULxHaGn6PtIZFsI3SHo0imzuueARNBqdsmY6XxQ&oe=691DB481",
    },
    {
      name: "Nguyen Duc Nam",
      role: "Role 4",
      img: "https://scontent.fhan5-8.fna.fbcdn.net/v/t39.30808-6/460885431_3882918485273699_427880928224399346_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=ET2HROjBwngQ7kNvwGlTZl2&_nc_oc=AdnQ_I4CpLJ_fKicZG8ONCpV3MuVwoHDYL8usqmnmSKZYL9Uyd9nEZi1dALn--aBdrE&_nc_zt=23&_nc_ht=scontent.fhan5-8.fna&_nc_gid=sCLW4U-MXDCV_GXqkO8QZQ&oh=00_AfjKTOwyqkrhNzfBfWFIQ94VLoBPZIDlRyxc3fw0GUgaGQ&oe=691DD218",
    },
    {
      name: "Nguyen Huyen Minh Nhat",
      role: "Role 5",
      img: "https://scontent.fhan5-11.fna.fbcdn.net/v/t39.30808-6/474989068_1274483427109383_9076362888895322949_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=502-Oe8w890Q7kNvwG-mkUL&_nc_oc=AdnaX6n5ZkFBkcrk9ko8akfMY5yFZL5k_pcFjTnhBF2rT7pzT6TKYTxEUkk_-k-zVxI&_nc_zt=23&_nc_ht=scontent.fhan5-11.fna&_nc_gid=nYtvF7lQDRi47k7I-kc-RA&oh=00_Afis6u1hSxPlT3cSMypzsQUmzLSQU6Ba1R4F1bMdnj_fXQ&oe=691DCDF3",
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
    </Stack>
  );
}
