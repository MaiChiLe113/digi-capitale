import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Pool,
  SportsBasketball,
  SportsTennis,
  SportsSoccer,
  LocalBar,
  OutdoorGrill,
  MeetingRoom,
  SportsKabaddi,
} from "@mui/icons-material";

export default function Utility() {
  const [utilities, setUtilities] = useState([]);
  const [reservations, setReservations] = useState({
    today: [],
    upcoming: [],
    past: [],
  });
  const userEmail = "user@example.com";

  const FALLBACK_UTILITIES = [
    {
      section: "Health & Well-being",
      items: [
        { name: "Swimming Pool", icon: <Pool />, status: "Available" },
        {
          name: "Basketball court",
          icon: <SportsBasketball />,
          status: "Maintenance",
        },
        { name: "Tennis Court", icon: <SportsTennis />, status: "Available" },
        {
          name: "Badminton court",
          icon: <SportsKabaddi />,
          status: "Available",
        },
        { name: "Soccer Field", icon: <SportsSoccer />, status: "Available" },
      ],
    },

    {
      section: "Community",
      items: [
        { name: "Sky Bar", icon: <LocalBar />, status: "Available" },
        { name: "BBQ Garden", icon: <OutdoorGrill />, status: "Full" },
        { name: "Common Room", icon: <MeetingRoom />, status: "Full" },
      ],
    },
  ];

  const displayUtilities =
    Array.isArray(utilities) && utilities.length
      ? utilities
      : FALLBACK_UTILITIES;

  useEffect(() => {
    fetch("http://localhost:8000/api/getUtilities.php")
      .then((response) => response.json())
      .then((data) => setUtilities(data || []))
      .catch((error) => console.error("Error fetching utilities:", error));

    fetch(
      `http://localhost:8000/api/getReservations.php?email=${encodeURIComponent(
        userEmail
      )}`
    )
      .then((response) => response.json())
      .then((data) =>
        setReservations(data || { today: [], upcoming: [], past: [] })
      )
      .catch((error) => console.error("Error fetching reservations:", error));
  }, []);

  const getStatusColor = (status) => {
    if (status === "Available")
      return { bg: "#e9f7ef", text: "#2e7d32", border: "none" };
    if (status === "Maintenance")
      return { bg: "transparent", text: "#666", border: "#ccc" };
    if (status === "Full")
      return { bg: "transparent", text: "#d32f2f", border: "#d32f2f" };
    return { bg: "transparent", text: "#666", border: "#ccc" };
  };

  return (
    <Container>
      {/* Hero Section with Background */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3), #F8FAFC), url('/images/image.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mb: 4,
          height: { xs: 150, md: 250 },
          display: "flex",
          alignItems: "flex-end",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            p: { xs: 2, md: 4 },
            background:
              "linear-gradient(180deg, transparent 0%, rgba(249, 249, 249, 0.95) 100%)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h1">Utilities</Typography>
          <Button variant="contained" color="primary" sx={{ borderRadius: 20 }}>
            Report Incidents
          </Button>
        </Box>
      </Box>

      {/* Utilities Grid */}
      {displayUtilities.map((section, idx) => (
        <Box key={idx} sx={{ mb: 5 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2.5, fontWeight: 600, color: "#333" }}
          >
            {section.section}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
              width: "100%",
            }}
          >
            {section.items.map((item, i) => {
              const colors = getStatusColor(item.status);
              return (
                <Card
                  key={i}
                  sx={{
                    p: 2.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 2.5,
                    borderRadius: 3,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    width: "100%",
                    height: { xs: "auto", md: 80 },
                    minHeight: 70,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#d4a574",
                      width: 50,
                      height: 50,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </Avatar>
                  <Typography
                    sx={{
                      flex: 1,
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      flexShrink: 0,
                    }}
                  >
                    <Chip
                      label={item.status}
                      sx={{
                        bgcolor: colors.bg,
                        color: colors.text,
                        border: colors.border
                          ? `1px solid ${colors.border}`
                          : "none",
                        borderRadius: 2,
                        fontSize: "0.8rem",
                      }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ borderRadius: 2, whiteSpace: "nowrap" }}
                    >
                      Book
                    </Button>
                  </Box>
                </Card>
              );
            })}
          </Box>
        </Box>
      ))}

      {/* Reservations Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: "#333" }}>
          My Reservations
        </Typography>

        {/* Today */}
        <Typography
          variant="subtitle1"
          sx={{ mt: 3, mb: 1.5, fontWeight: 500 }}
        >
          Today
        </Typography>
        {(reservations.today || []).length === 0 ? (
          <Typography sx={{ color: "#999", mb: 3 }}>
            No reservations today
          </Typography>
        ) : (
          (reservations.today || []).map((res, i) => (
            <Card
              key={i}
              sx={{
                p: 2,
                mb: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Avatar
                src={res.img}
                sx={{ width: 60, height: 60, borderRadius: 2 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 500 }}>{res.name}</Typography>
                <Typography sx={{ fontSize: "0.875rem", color: "#666" }}>
                  {res.time}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                sx={{ borderRadius: 2 }}
              >
                {res.action}
              </Button>
            </Card>
          ))
        )}

        {/* Upcoming */}
        <Typography
          variant="subtitle1"
          sx={{ mt: 3, mb: 1.5, fontWeight: 500 }}
        >
          Upcoming
        </Typography>
        {(reservations.upcoming || []).length === 0 ? (
          <Typography sx={{ color: "#999", mb: 3 }}>
            No upcoming reservations
          </Typography>
        ) : (
          (reservations.upcoming || []).map((res, i) => (
            <Card
              key={i}
              sx={{
                p: 2,
                mb: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Avatar
                src={res.img}
                sx={{ width: 60, height: 60, borderRadius: 2 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 500 }}>{res.name}</Typography>
                <Typography sx={{ fontSize: "0.875rem", color: "#666" }}>
                  {res.time}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                sx={{ borderRadius: 2 }}
              >
                {res.action}
              </Button>
            </Card>
          ))
        )}

        {/* Past */}
        <Typography
          variant="subtitle1"
          sx={{ mt: 3, mb: 1.5, fontWeight: 500 }}
        >
          Past
        </Typography>
        {(reservations.past || []).length === 0 ? (
          <Typography sx={{ color: "#999", mb: 3 }}>
            No past reservations
          </Typography>
        ) : (
          (reservations.past || []).map((res, i) => (
            <Card
              key={i}
              sx={{
                p: 2,
                mb: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Avatar
                src={res.img}
                sx={{ width: 60, height: 60, borderRadius: 2 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 500 }}>{res.name}</Typography>
                <Typography sx={{ fontSize: "0.875rem", color: "#666" }}>
                  {res.time}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                sx={{ borderRadius: 2 }}
              >
                {res.action}
              </Button>
            </Card>
          ))
        )}
      </Box>
    </Container>
  );
}
