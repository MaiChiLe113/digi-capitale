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
  Divider,Modal
} from "@mui/material";
import RoomServiceIcon from "@mui/icons-material/RoomServiceRounded";
import CalendarTodayIcon from "@mui/icons-material/CalendarMonthRounded";
import PaymentIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import PayNowIcon from '@mui/icons-material/PaymentRounded';
import PaidIcon from '@mui/icons-material/CheckCircleRounded';
import { useTheme } from '@mui/material';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [utilities, setUtilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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
        (user && (user.Email || user.email)) || (pJson && pJson.profile && pJson.profile.Email) || "";

      // Reservations (GET with email query)
      const reservationsUrl = `http://localhost/digi-capitale/backend/api/index.php?action=getReservations&email=${encodeURIComponent(
        reservationEmail
      )}`;
      let rRes = await fetch(reservationsUrl);

      // If router returns 404, try direct php file as a fallback for debugging
      if (!rRes.ok && rRes.status === 404) {
        console.warn("Router returned 404 for getReservations, trying direct file URL");
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
        console.error("Failed to parse reservations response as JSON", { status: rRes.status, text });
        throw new Error("Invalid reservations response: " + text.slice(0, 200));
      }
      console.debug("Reservations response:", rJson, "status:", rRes.status);
      // getReservations returns { today:[], upcoming:[], past:[] }
      const combinedReservations = [];
      if (rJson) {
        if (Array.isArray(rJson.today)) combinedReservations.push(...rJson.today);
        if (Array.isArray(rJson.upcoming)) combinedReservations.push(...rJson.upcoming);
      }
      setReservations(combinedReservations);

      // Utilities
      const uRes = await fetch("http://localhost/digi-capitale/backend/api/index.php?action=getUtilities");
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

  const pendingPayments = utilities.filter((u) => u.condition === "Pending" || u.status === "Pending");

  // Create lightweight card data for utilities to display similar UI to Services.jsx
  const utilityCards = utilities.map((u) => ({
    id: u.id,
    name: u.name,
    fee: Number(u.fee || 0),
    // treat non-Available items as Pending for display purposes
    status: (u.condition && u.condition !== "Available") || u.status ? "Pending" : "Paid",
  }));

  const pendingTotal = utilityCards.reduce((acc, it) => (it.status === "Pending" ? acc + (it.fee || 0) : acc), 0);

  return (
    <Container maxWidth="lg" sx={{ pt: 0, pb: 4 }}>
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3), #F8FAFC), url('/images/image.png')`,
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
          <Button variant="contained" color="primary" sx={{ borderRadius: 20 }}>
            New Booking
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, display: "flex", gap: 2, alignItems: "center" }}>
              <Avatar
                sx={{ width: 80, height: 80, bgcolor: "primary.main" }}
                src={profile?.Image || undefined}
              >
                {profile?.FirstName ? profile.FirstName.charAt(0) : "U"}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {profile?.FirstName ? `${profile.FirstName} ${profile.LastName || ""}` : "User"}
                </Typography>
                <Typography sx={{ color: "#666" }}>{profile?.Email}</Typography>
                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  <Button size="small" variant="outlined">
                    View Profile
                  </Button>
                  <Button size="small" variant="contained" color="primary">
                    Edit
                  </Button>
                </Box>
              </Box>
            </Card>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h3" sx={{ mb: 1, fontWeight: 600 }}>
                My Reservations
              </Typography>

              {reservations.length === 0 ? (
                <Card sx={{ p: 3, textAlign: "center" }}>
                  <Typography sx={{ color: "#999" }}>No reservations</Typography>
                </Card>
              ) : (
                reservations.map((r, idx) => (
                  <Card
                    key={r.BookID || r.id || idx}
                    sx={{ p: 2, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>{r.name}</Typography>
                      <Typography sx={{ color: "#666" }}>{r.time}</Typography>
                    </Box>
                  {/* <Button size="small" variant="contained" onClick={handleOpen}>Details</Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                      </Typography>
                    </Box>
                  </Modal> */}
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
                <Card sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="h3" sx={{ fontWeight: 600 }}>
                      Payment Status
                    </Typography>
                    <IconButton>
                      <CalendarTodayIcon />
                    </IconButton>
                  </Box>
                  <Divider sx={{ my: 2 }} />

                  {utilities.length === 0 ? (
                    <Typography sx={{ color: "#999" }}>No service bills</Typography>
                  ) : (
                    <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
                      {utilityCards.map((it) => (
                        <Card
                          key={it.id}
                          sx={{
                            p: 4,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            borderRadius: 2,
                            flexGrow: 1,
                            minWidth: 200,
                          }}
                        >
                          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
                            {/* <RoomServiceIcon sx={{ fontSize: 56 }} /> */}
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
                              <Typography variant="h5" sx={{ color: "text.primary" }}>{it.name} bill</Typography>
                              <Typography variant="h2" sx={{ fontWeight: 700 }}>${(it.fee || 0).toFixed(2)}</Typography>
                            </Box>
                          </Box>

                          {it.status === "Pending" ? (
                            <Button variant="contained" color="primary" startIcon={<PayNowIcon />}>Pay Now</Button>
                          ) : (
                            <Chip label="Paid" icon={<PaidIcon />} sx={{ fontWeight: 600, height: 48 }} />
                          )}
                        </Card>
                      ))}
                    </Box>
                  )}
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
