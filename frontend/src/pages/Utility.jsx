import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  Chip,
  CircularProgress,
  Alert,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Utility() {
  const navigate = useNavigate();
  const [utilities, setUtilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    fetchUtilities();
  }, []);

  const fetchUtilities = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost/digi-capitale/backend/api/index.php?action=getUtilities"
      );
      const data = await response.json();

      if (data.success === false) {
        throw new Error(data.message || "Failed to fetch utilities");
      }

      setUtilities(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching utilities:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getConditionColor = (condition) => {
    if (condition === "Available")
      return { bg: "#e9f7ef", text: "#2e7d32", border: "none" };
    if (condition === "Maintenance")
      return { bg: "#fff3cd", text: "#856404", border: "#ffc107" };
    if (condition === "Unavailable" || condition === "Full")
      return { bg: "#f8d7da", text: "#721c24", border: "#dc3545" };
    return { bg: "#e3f2fd", text: "#1565c0", border: "none" };
  };

  // Filter utilities based on search term and selected filter
  const filteredUtilities = utilities.filter((utility) => {
    const matchesSearch = utility.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" || utility.condition === selectedFilter;
    return matchesSearch && matchesFilter;
  });

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
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: 20 }}
            >
              Report Incidents
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: 20 }}
              component={Link}
              to="/history"
            >
              See Booking History
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Search and Filter Section */}
      {!loading && !error && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <TextField
            fullWidth
            placeholder="Search utilities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#999" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Filter</InputLabel>
            <Select
              value={selectedFilter}
              label="Filter"
              onChange={(e) => setSelectedFilter(e.target.value)}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Available">Available</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Utilities List */}
      {!loading && !error && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          {filteredUtilities.length === 0 ? (
            <Box sx={{ gridColumn: "1 / -1", textAlign: "center", py: 6 }}>
              <Typography sx={{ color: "#999" }}>
                {utilities.length === 0
                  ? "No utilities available"
                  : "No utilities match your search"}
              </Typography>
            </Box>
          ) : (
            filteredUtilities.map((utility) => {
              const colors = getConditionColor(utility.condition);
              return (
                <Card
                  key={utility.id}
                  sx={{
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 3,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 500,
                      color: "#333",
                      flex: 1,
                    }}
                  >
                    {utility.name}
                  </Typography>
                  <Chip
                    label={utility.condition}
                    sx={{
                      bgcolor: colors.bg,
                      color: colors.text,
                      border: colors.border
                        ? `1px solid ${colors.border}`
                        : "none",
                      borderRadius: 2,
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      px: 1,
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={utility.condition === "Maintenance"}
                    sx={{ borderRadius: 2, whiteSpace: "nowrap", ml: 2 }}
                    onClick={() => navigate(`/utility/${utility.id}`)}
                  >
                    Book
                  </Button>
                </Card>
              );
            })
          )}
        </Box>
      )}
    </Container>
  );
}
