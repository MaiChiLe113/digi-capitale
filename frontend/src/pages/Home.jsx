import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  Grid,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Divider,
  Modal,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import RoomServiceIcon from "@mui/icons-material/RoomServiceRounded";
import PayNowIcon from "@mui/icons-material/PaymentRounded";
import PaidIcon from "@mui/icons-material/CheckCircleRounded";
import WaterIcon from "@mui/icons-material/WaterDropRounded";
import ElectricityIcon from "@mui/icons-material/ElectricalServicesRounded";
import MaintenanceIcon from "@mui/icons-material/BuildRounded";
import EditIcon from "@mui/icons-material/EditRounded";
import VisibilityIcon from "@mui/icons-material/VisibilityRounded";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import { useTheme } from "@mui/material";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [utilities, setUtilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      // Read logged in user (Profile page stores `user` in localStorage)
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user || !user.ResidentID) {
        setError("Not logged in");
        setLoading(false);
        return;
      }

      // Profile (POST residentId)
      const pRes = await fetch(
        "http://localhost/digi-capitale/backend/api/index.php?action=getProfile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ residentId: user.ResidentID }),
        }
      );
      const pJson = await pRes.json();
      if (pJson && pJson.success) {
        setProfile(pJson.profile);
      }

      // Determine email to use for reservations: prefer stored user, fallback to profile
      const reservationEmail =
        (user && (user.Email || user.email)) ||
        (pJson && pJson.profile && pJson.profile.Email) ||
        "";

      // Reservations (GET with email query)
      const reservationsUrl = `http://localhost/digi-capitale/backend/api/index.php?action=getReservations&email=${encodeURIComponent(
        reservationEmail
      )}`;
      let rRes = await fetch(reservationsUrl);

      // If router returns 404, try direct php file as a fallback for debugging
      if (!rRes.ok && rRes.status === 404) {
        console.warn(
          "Router returned 404 for getReservations, trying direct file URL"
        );
        const directUrl = `http://localhost/digi-capitale/backend/api/getReservations.php?email=${encodeURIComponent(
          reservationEmail
        )}`;
        rRes = await fetch(directUrl);
      }

      // Read response (attempt JSON parse but capture non-OK bodies)
      let rJson;
      try {
        rJson = await rRes.json();
      } catch (parseErr) {
        const text = await rRes.text();
        console.error("Failed to parse reservations response as JSON", {
          status: rRes.status,
          text,
        });
        throw new Error("Invalid reservations response: " + text.slice(0, 200));
      }
      console.debug("Reservations response:", rJson, "status:", rRes.status);
      // getReservations returns { today:[], upcoming:[], past:[] }
      const combinedReservations = [];
      if (rJson) {
        if (Array.isArray(rJson.today))
          combinedReservations.push(...rJson.today);
        if (Array.isArray(rJson.upcoming))
          combinedReservations.push(...rJson.upcoming);
      }
      setReservations(combinedReservations);

      // Utilities
      const uRes = await fetch(
        "http://localhost/digi-capitale/backend/api/index.php?action=getUtilities"
      );
      let uJson;
      try {
        uJson = await uRes.json();
      } catch (err) {
        console.error("Failed to parse utilities response", err);
        uJson = [];
      }
      console.debug("Utilities response:", uJson);
      setUtilities(Array.isArray(uJson) ? uJson : []);
    } catch (err) {
      console.error("Home fetch error:", err);
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const pendingPayments = utilities.filter(
    (u) => u.condition === "Pending" || u.status === "Pending"
  );

  // Create lightweight card data for utilities to display similar UI to Services.jsx
  const getIconForUtility = (name) => {
    const lowerName = (name || "").toLowerCase();
    if (lowerName.includes("water")) return WaterIcon;
    if (lowerName.includes("electric")) return ElectricityIcon;
    if (lowerName.includes("maintenance")) return MaintenanceIcon;
    return RoomServiceIcon;
  };

  const utilityCards = utilities.map((u) => ({
    id: u.id,
    name: u.name,
    fee: Number(u.fee || 0),
    icon: getIconForUtility(u.name),
    // treat non-Available items as Pending for display purposes
    status:
      (u.condition && u.condition !== "Available") || u.status
        ? "Pending"
        : "Paid",
  }));

  const pendingTotal = utilityCards.reduce(
    (acc, it) => (it.status === "Pending" ? acc + (it.fee || 0) : acc),
    0
  );

  return (
    <Container maxWidth="lg" sx={{ pt: 0, pb: 4 }}>
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3), #F8FAFC), url('https://bizweb.dktcdn.net/thumb/2048x2048/100/378/391/files/20230928101136-14c8-wm.jpg?v=1696396656820')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mb: 4,
          height: { xs: 140, md: 220 },
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
          <Typography variant="h1">Welcome back</Typography>
          <Button variant="contained" color="primary" sx={{ borderRadius: 20 }} component={Link} to="/makeincidents">
            Report Incidents
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <Card
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                background: "linear-gradient(135deg, #C4924A 0%, #E8C8A0 100%)",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0px 15px 40px rgba(196, 146, 74, 0.3)",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -50,
                  right: -100,
                  width: 400,
                  height: 400,
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.15)",
                  zIndex: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DiamondOutlinedIcon
                  sx={{ fontSize: 300, color: "rgba(255, 255, 255, 0.26)" }}
                />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: -30,
                  left: 50,
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.1)",
                  zIndex: 0,
                }}
              />
              {/* Card Content */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                  zIndex: 1,
                  gap: 3,
                }}
              >
                {/* LEFT: Avatar & User Info */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    width: "100%",
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 70, md: 90 },
                      height: { xs: 70, md: 90 },
                      bgcolor: "white",
                      color: "primary.dark",
                      fontSize: "2rem",
                      fontWeight: 700,
                    }}
                    src={profile?.Image || undefined}
                  >
                    {profile?.FirstName ? profile.FirstName.charAt(0) : "U"}
                  </Avatar>

                  <Box>
                    <Typography
                      variant="overline"
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        letterSpacing: 1.5,
                      }}
                    >
                      RESIDENT
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 700, color: "white", lineHeight: 1.2 }}
                    >
                      {profile?.FirstName
                        ? `${profile.FirstName} ${profile.LastName || ""}`
                        : "User"}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "rgba(255,255,255,0.9)", mt: 0.5 }}
                    >
                      {profile?.Email}
                    </Typography>
                  </Box>
                </Box>

                {/* RIGHT: Action Buttons */}
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ minWidth: "fit-content" }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "white",
                      color: "white",
                      borderRadius: 3,
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.1)",
                        borderColor: "white",
                      },
                    }}
                    startIcon={<VisibilityIcon />}
                    component={Link} to="/profile"
                  >
                    View Profile
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "primary.dark",
                      borderRadius: 3,
                      fontWeight: 700,
                      "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                    }}
                    startIcon={<EditIcon />}
                    component={Link} to="/profile"
                  >
                    Edit
                  </Button>
                </Stack>
              </Box>
            </Card>
          </Box>
          <Grid item xs={12} md={4}>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h3" sx={{ mb: 1, fontWeight: 600 }}>
                My Reservations
              </Typography>
              {reservations.length === 0 ? (
                <Card sx={{ p: 3, textAlign: "center" }}>
                  <Typography sx={{ color: "#999" }}>
                    No reservations
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "primary.dark",
                      borderRadius: 3,
                      fontWeight: 700,
                      "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                    }}
                    startIcon={<EditIcon />}
                    component={Link} to="/utility"
                  >
                    Make New Reservation
                  </Button>
                </Card>
              ) : (
                reservations.map((r, idx) => (
                  <Card
                    key={r.BookID || r.id || idx}
                    sx={{
                      p: 2,
                      mb: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>{r.name}</Typography>
                      <Typography sx={{ color: "#666" }}>{r.time}</Typography>
                    </Box>
                  </Card>
                ))
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h3" sx={{ mb: 1, fontWeight: 600 }}>
                  Services Payment Status
                </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                  </Box>
                  <Divider sx={{ my: 2 }} />

                  {utilities.length === 0 ? (
                    <Typography sx={{ color: "#999" }}>
                      No service bills
                    </Typography>
                  ) : (
                    <Box
                      sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}
                    >
                      {utilityCards.map((it) => {
                        const Icon = it.icon;
                        const isPending = it.status === "Pending";

                        return (
                          <Card
                            key={it.id}
                            sx={{
                              p: 3,
                              display: "flex",
                              flexDirection: "column",
                              gap: 2,
                              borderRadius: 2,
                              flexGrow: 1,
                              minWidth: 220,
                              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                                transform: "translateY(-2px)",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <Icon
                                sx={{ fontSize: 60, color: "primary.main" }}
                              />
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: 0.5,
                                }}
                              >
                                <Typography
                                  variant="h6"
                                  sx={{ fontWeight: 600 }}
                                >
                                  {it.name} bill
                                </Typography>
                                <Typography
                                  variant="h4"
                                  sx={{
                                    fontWeight: 700,
                                    color: "primary.main",
                                  }}
                                >
                                  ${(it.fee || 0).toFixed(2)}
                                </Typography>
                              </Box>
                            </Box>

                            {isPending ? (
                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<PayNowIcon />}
                                fullWidth
                                sx={{ mt: 1 }}
                              >
                                Pay Now
                              </Button>
                            ) : (
                              <Chip
                                label="Paid"
                                icon={<PaidIcon />}
                                sx={{
                                  fontWeight: 600,
                                  height: 40,
                                  bgcolor: "#e8f5e9",
                                  color: "#2e7d32",
                                  border: "1px solid #4caf50",
                                }}
                              />
                            )}
                          </Card>
                        );
                      })}
                    </Box>
                  )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}
