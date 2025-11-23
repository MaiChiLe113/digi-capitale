import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  Avatar,
  Button,
  CircularProgress,
  Alert,
  Container,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIosRounded";

const ITEMS_PER_PAGE = 5;

export default function History() {
  const theme = useTheme();
  const [reservations, setReservations] = useState({ today: [], upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user || !user.Email) {
        setError("Not logged in");
        setLoading(false);
        return;
      }

      const res = await fetch(
        `http://localhost/digi-capitale/backend/api/index.php?action=getReservations&email=${encodeURIComponent(user.Email)}`
      );
      const data = await res.json();
      setReservations({
        today: data.today || [],
        upcoming: data.upcoming || [],
        past: data.past || []
      });
    } catch (err) {
      console.error("Failed to fetch reservations:", err);
      setError("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  // Past reservations only (for filtering)
  const pastReservations = useMemo(() => {
    return reservations.past || [];
  }, [reservations]);

  // Extract unique service names for checkbox filter (from past only)
  const serviceOptions = useMemo(() => {
    const services = new Set(pastReservations.map(r => r.name));
    return Array.from(services).sort();
  }, [pastReservations]);

  // Extract unique months for dropdown filter (from past only)
  const monthOptions = useMemo(() => {
    const months = new Set();
    pastReservations.forEach(r => {
      if (r.slotDay) {
        const date = new Date(r.slotDay);
        const monthYear = `${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        months.add(monthYear);
      }
    });
    return Array.from(months).sort().reverse();
  }, [pastReservations]);

  // Handle service checkbox change
  const handleServiceChange = (service) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
    setCurrentPage(1);
  };

  // Filter past reservations only
  const filteredPastReservations = useMemo(() => {
    return pastReservations.filter(r => {
      // Filter by service
      if (selectedServices.length > 0 && !selectedServices.includes(r.name)) {
        return false;
      }
      // Filter by month
      if (selectedMonth !== "all" && r.slotDay) {
        const date = new Date(r.slotDay);
        const monthYear = `${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        if (monthYear !== selectedMonth) {
          return false;
        }
      }
      return true;
    });
  }, [pastReservations, selectedServices, selectedMonth]);

  // Pagination calculations (for past reservations only)
  const totalPages = Math.ceil(filteredPastReservations.length / ITEMS_PER_PAGE);
  const paginatedPastReservations = filteredPastReservations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Generate pagination buttons
  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <Button
        key={i}
        variant={i === currentPage ? "contained" : "outlined"}
        onClick={() => handlePageChange(i)}
        sx={{ minWidth: 32, px: 1, mx: 0.5 }}
      >
        {i}
      </Button>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 0, pb: 4 }}>
      {/* Header Banner */}
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
            background: "linear-gradient(180deg, transparent 0%, rgba(249, 249, 249, 0.95) 100%)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h1">Booking History</Typography>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Upcoming */}
        <Typography
          variant="h3" sx={{ fontWeight: 600, mb: 2 }}
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

      {/* Filters Section */}
        <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
          See your past reservation
        </Typography>

        {/* Month Filter */}
        <FormControl size="small" sx={{ minWidth: 200, mb: 2 }}>
          <InputLabel>Filter by Month</InputLabel>
          <Select
            value={selectedMonth}
            label="Filter by Time"
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setCurrentPage(1);
            }}
          >
            <MenuItem value="all">Choose Time</MenuItem>
            {monthOptions.map(month => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Utility Checkbox Filters */}
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, mt: 2 }}>
          Filter by Utility
        </Typography>
        <FormGroup row>
          {serviceOptions.map(service => (
            <FormControlLabel
              key={service}
              control={
                <Checkbox
                  checked={selectedServices.includes(service)}
                  onChange={() => handleServiceChange(service)}
                  size="small"
                />
              }
              label={service}
            />
          ))}
        </FormGroup>

        {/* Clear Filters */}
        {(selectedServices.length > 0 || selectedMonth !== "all") && (
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setSelectedServices([]);
              setSelectedMonth("all");
              setCurrentPage(1);
            }}
            sx={{ mt: 2 }}
          >
            Clear All Filters
          </Button>
        )}

      {/* Results Summary */}
      <Typography variant="body2" sx={{ mb: 2, mt: 2, color: theme.palette.text.secondary }}>
        Showing {paginatedPastReservations.length} of {filteredPastReservations.length} past reservations
      </Typography>

      {/* Past Reservations List */}
      {paginatedPastReservations.length === 0 ? (
        <Card sx={{ p: 4, textAlign: "center" }}>
          <Typography sx={{ color: "#999" }}>
            No past reservations found
          </Typography>
        </Card>
      ) : (
        paginatedPastReservations.map((res, i) => (
          <Card
            key={res.BookID || i}
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
            >
              {res.name?.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 500 }}>{res.name}</Typography>
              <Typography sx={{ fontSize: "0.875rem", color: theme.palette.text.secondary }}>
                {res.time}
              </Typography>
              {res.status && (
                <Typography sx={{ fontSize: "0.75rem", color: theme.palette.text.disabled }}>
                  Status: {res.status}
                </Typography>
              )}
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            mt: 4,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            startIcon={<ArrowBackIcon />}
            sx={{ borderRadius: 2 }}
          >
            Prev
          </Button>
          {paginationButtons}
          <Button
            variant="outlined"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            endIcon={<ArrowForwardIcon />}
            sx={{ borderRadius: 2 }}
          >
            Next
          </Button>
        </Box>
      )}
    </Container>
  );
}
