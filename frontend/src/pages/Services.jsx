import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Avatar,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
} from "@mui/material";
// Using the correct Material UI Icons from the original code request
import WaterIcon from "@mui/icons-material/WaterDropRounded";
import ElectricityIcon from "@mui/icons-material/ElectricalServicesRounded";
import MaintenanceIcon from "@mui/icons-material/BuildRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIosRounded";
import PaidIcon from "@mui/icons-material/CheckCircleRounded";
import PendingIcon from "@mui/icons-material/AccessTimeRounded";
import PayNowIcon from "@mui/icons-material/PaymentRounded";
import SearchIcon from "@mui/icons-material/Search";

// --- DUMMY DATA SETUP ---
const DUMMY_DATA = {
  "11/2025": [
    {
      id: 1,
      name: "Water",
      icon: WaterIcon,
      fee: 46.57,
      status: "Pending",
      due: "04/12/2025",
      usage: "12m³",
    },
    {
      id: 2,
      name: "Electricity",
      icon: ElectricityIcon,
      fee: 37.29,
      status: "Paid",
      due: "04/12/2025",
      usage: "150kWh",
    },
    {
      id: 3,
      name: "Maintenance",
      icon: MaintenanceIcon,
      fee: 25.18,
      status: "Pending",
      due: "04/12/2025",
      usage: "N/A",
    },
  ],
  "10/2025": [
    {
      id: 4,
      name: "Water",
      icon: WaterIcon,
      fee: 42.1,
      status: "Paid",
      due: "04/11/2025",
      usage: "11m³",
    },
    {
      id: 5,
      name: "Electricity",
      icon: ElectricityIcon,
      fee: 35.5,
      status: "Paid",
      due: "04/11/2025",
      usage: "145kWh",
    },
    {
      id: 6,
      name: "Maintenance",
      icon: MaintenanceIcon,
      fee: 25.18,
      status: "Paid",
      due: "04/11/2025",
      usage: "N/A",
    },
  ],
};

// Map status to theme colors for the Chip/Button styling
// Note: These now use the palette utility colors: warning, success
const STATUS_COLORS = {
  Pending: {
    bg: (theme) => theme.palette.warning.light,
    text: (theme) => theme.palette.warning.dark,
  },
  Paid: {
    bg: (theme) => theme.palette.success.light,
    text: (theme) => theme.palette.success.main,
  },
};

// --- UtilityCard Component ---
// Now accepts 'theme' object to access dynamic colors
const UtilityCard = ({ item, onPay, theme }) => {
  // Use a function to get colors dynamically
  const statusConfig = STATUS_COLORS[item.status];
  const Icon = item.icon;
  const isPending = item.status === "Pending";

  return (
    <Card
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Icon sx={{ fontSize: 80 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1,
          }}
        >
          <Typography variant="h4" sx={{ color: theme.palette.text.primary }}>
            {item.name} bill
          </Typography>
          <Typography variant="h1" sx={{ fontWeight: 700 }}>
            $ {item.fee.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      {isPending ? (
        <Button
          variant="contained"
          color="primary" // Uses primary color from theme: #D6B585
          onClick={() => onPay(item.id, item.name)}
          startIcon={<PayNowIcon />}
        >
          Pay Now
        </Button>
      ) : (
        <Chip
          label={item.status}
          icon={<PaidIcon />}
          sx={{
            bgcolor: statusConfig.bg(theme),
            color: statusConfig.text(theme),
            fontWeight: 600,
            fontSize: 18,
            alignSelf: "stretch",
            justifyContent: "center",
            padding: 2,
            height: 48,
            borderRadius: 100,
            border: `1px solid ${theme.palette.success.main}`,
          }}
        />
      )}
    </Card>
  );
};

// --- UtilityTable Component ---
const UtilityTable = ({ currentData, onPay, theme }) => {
  return (
    <Box sx={{ mt: 4, width: "100%", flexDirection: "column", gap: 1 }}>
      <TableContainer>
        <Table aria-label="utility details table">
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.background.default }}>
              <TableCell sx={{ color: theme.palette.text.secondary }}>
                Service
              </TableCell>
              <TableCell sx={{ color: theme.palette.text.secondary }}>
                Usage
              </TableCell>
              <TableCell sx={{ color: theme.palette.text.secondary }}>
                Status
              </TableCell>
              <TableCell sx={{ color: theme.palette.text.secondary }}>
                Fee
              </TableCell>
              <TableCell sx={{ color: theme.palette.text.secondary }}>
                Due
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: theme.palette.text.secondary }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((row) => {
              const statusConfig = STATUS_COLORS[row.status];
              const StatusIcon = row.status === "Paid" ? PaidIcon : PendingIcon;

              return (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>
                    {row.usage}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      icon={<StatusIcon sx={{ fontSize: 18 }} />}
                      size="large"
                      sx={{
                        bgcolor: statusConfig.bg(theme),
                        color: statusConfig.text(theme),
                        border: `1px solid ${statusConfig.bg(theme)}`,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>
                    ${row.fee.toFixed(2)}
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.secondary }}>
                    {row.due}
                  </TableCell>
                  <TableCell align="center">
                    {row.status === "Pending" ? (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => onPay(row.id, row.name)}
                        sx={{ minWidth: 80 }}
                      >
                        Pay Now
                      </Button>
                    ) : (
                      <Chip
                        label="Paid"
                        size="large"
                        icon={<PaidIcon sx={{ fontSize: 16 }} />}
                        sx={{
                          bgcolor: statusConfig.bg(theme),
                          color: statusConfig.text(theme),
                          minWidth: 80,
                          border: `1px solid ${theme.palette.success.main}`,
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// --- Main Utility Component ---
export default function Utility() {
  const theme = useTheme(); // This hook gives access to the entire theme object

  const [currentMonth, setCurrentMonth] = useState("11/2025");
  const [data, setData] = useState(DUMMY_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Get current month's data or empty array
  const rawData = data[currentMonth] || [];

  // Filter data by search term (only by name)
  const filteredData = rawData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const summary = useMemo(() => {
    return paginatedData.reduce(
      (acc, item) => {
        acc.total += item.fee;
        if (item.status === "Pending") {
          acc.pendingTotal += item.fee;
        }
        return acc;
      },
      { total: 0, pendingTotal: 0 }
    );
  }, [paginatedData]);

  const handlePayment = (id, name) => {
    // Simulating payment logic
    setData((prevData) => {
      const newData = { ...prevData };
      newData[currentMonth] = newData[currentMonth].map((item) =>
        item.id === id ? { ...item, status: "Paid" } : item
      );
      return newData;
    });
  };

  const handlePayAll = () => {
    // Simulating 'Pay All' logic
    setData((prevData) => {
      const newData = { ...prevData };
      newData[currentMonth] = newData[currentMonth].map((item) =>
        item.status === "Pending" ? { ...item, status: "Paid" } : item
      );
      return newData;
    });
  };

  const handleMonthChange = (direction) => {
    if (direction === "next" && currentMonth === "10/2025") {
      setCurrentMonth("11/2025");
      setCurrentPage(1);
    } else if (direction === "prev" && currentMonth === "11/2025") {
      setCurrentMonth("10/2025");
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Generate pagination buttons (1 ... totalPages)
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

  return (
    // Use theme.palette.background.default
    <Container
      maxWidth="lg"
      sx={{ pt: 0, pb: 4, display: "block", margin: "0 auto", gap: 0 }}
    >
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3), #F8FAFC), url('https://vinhomelands.com//Areas/Admin/Content/Fileuploads/images/5(1).jpg')`,
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
          <Typography variant="h1">Services</Typography>
          <Button variant="contained" color="primary" sx={{ borderRadius: 20 }}>
            Request Maintenance
          </Button>
        </Box>
      </Box>

      {/* Search Input */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#999" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
      </Box>

      {/* --- Utility Cards Grid --- */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {paginatedData.map((item) => (
          <UtilityCard item={item} onPay={handlePayment} theme={theme} />
        ))}
      </Box>

      {/* --- Pagination Controls --- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          mb: 4,
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

      {/* --- Pay All Bill Bar --- */}
      <Card
        sx={{
          p: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: theme.palette.primary.main,
          borderRadius: 2,
          boxShadow: theme.shadows[2],
          color: theme.palette.primary.contrastText,
          mb: 4,
          flexDirection: "row",
        }}
      >
        <Box sx={{ flexDirection: "column", gap: 0 }}>
          <Typography variant="h3" sx={{ fontWeight: 500, color: "inherit" }}>
            Total Services bill
          </Typography>
          <Typography variant="h1" sx={{ fontWeight: 700, color: "inherit" }}>
            ${summary.pendingTotal.toFixed(2)}
          </Typography>
        </Box>
        <Button
          variant="containedSecondary"
          sx={{
            fontSize: 24,
            borderRadius: 1,
            p: 4,
          }}
          disabled={summary.pendingTotal === 0}
          onClick={handlePayAll}
        >
          Pay All Bill
        </Button>
      </Card>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 600 }}>
        Details
      </Typography>
      
      {/* --- Month Navigation --- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          my: 3,
          flexDirection: "row",
          gap: 1,
        }}
      >
        <IconButton
          onClick={() => handleMonthChange("prev")}
          disabled={currentMonth === "10/2025"}
          size="large"
          sx={{ color: theme.palette.text.secondary }}
        >
          <ArrowBackIcon sx={{ fontSize: 24 }} />
        </IconButton>
        <Typography
          variant="h3"
          sx={{ mx: 2, fontWeight: 600, color: theme.palette.text.primary }}
        >
          {currentMonth}
        </Typography>
        <IconButton
          onClick={() => handleMonthChange("next")}
          disabled={currentMonth === "11/2025"}
          size="large"
          sx={{ color: theme.palette.text.secondary }}
        >
          <ArrowForwardIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Box>

      {/* --- Utility Details Table --- */}
      <UtilityTable 
      currentData={paginatedData} 
      onPay={handlePayment} 
      theme={theme} 
      />
    </Container>
  );
}
