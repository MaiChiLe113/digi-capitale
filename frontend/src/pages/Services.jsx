import React, { useState, useMemo, useEffect } from "react";
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
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";
// Material UI Icons
import WaterIcon from "@mui/icons-material/WaterDropRounded";
import ElectricityIcon from "@mui/icons-material/ElectricalServicesRounded";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import MaintenanceIcon from "@mui/icons-material/BuildRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIosRounded";
import PaidIcon from "@mui/icons-material/CheckCircleRounded";
import PendingIcon from "@mui/icons-material/AccessTimeRounded";
import PayNowIcon from "@mui/icons-material/PaymentRounded";
import SearchIcon from "@mui/icons-material/Search";

// Map icon types to Material UI icon components
const ICON_MAP = {
  Water: WaterIcon,
  Electricity: ElectricityIcon,
  Internet: WifiRoundedIcon,
};

// Map status to theme colors for the Chip/Button styling
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
const UtilityCard = ({ item, onPay, theme }) => {
  const statusConfig = STATUS_COLORS[item.status];
  const Icon = ICON_MAP[item.icon] || MaintenanceIcon;
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
          color="primary"
          onClick={() => onPay(item)}
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
                        onClick={() => onPay(row)}
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

// --- Main Service Component ---
export default function Service() {
  const theme = useTheme();

  const [data, setData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMonth, setCurrentMonth] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [openPayAllDialog, setOpenPayAllDialog] = useState(false);
  const itemsPerPage = 3;

  // --- Helper Function: Fetch Bills ---
  // Tách ra để tái sử dụng khi cần refresh dữ liệu sau khi thanh toán
  const fetchBills = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user?.ResidentID) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      // Không set loading = true ở đây để tránh nháy màn hình khi refresh ngầm
      // Chỉ set loading lần đầu ở useEffect

      const url = `http://localhost/digi-capitale/backend/api/getBills.php?residentID=${user.ResidentID}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setData(result.data);
        // Nếu chưa có currentMonth (lần đầu load), set default
        // Nếu đã có currentMonth (đang reload), giữ nguyên để user không bị nhảy tab
        if (!currentMonth) {
          const months = Object.keys(result.data);
          const sortedMonths = months.sort().reverse();
          if (sortedMonths.length > 0) {
            setCurrentMonth(sortedMonths[0]);
          }
        }
      } else {
        // Nếu không có data hoặc success = false
        // throw new Error(result.message || "Failed to fetch bills");
        console.log("No data found or empty");
      }
    } catch (err) {
      console.error("Error fetching bills:", err);
      setError(err.message || "Failed to fetch bills from server");
    }
  };

  // --- Initial Load ---
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await fetchBills();
      setLoading(false);
    };
    loadInitialData();
  }, []); // Empty dependency array -> Run once on mount

  // --- Derived State Calculations ---
  // Get current month's data or empty array
  const rawData = data[currentMonth] || [];

  // Filter data by search term (only by name)
  const filteredData = rawData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort so Pending bills appear first, then Paid bills
  const sortedFilteredData = filteredData.sort((a, b) => {
    if (a.status === "Pending" && b.status === "Paid") return -1;
    if (a.status === "Paid" && b.status === "Pending") return 1;
    return 0;
  });

  // Pagination calculations
  const totalItems = sortedFilteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = sortedFilteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const summary = useMemo(() => {
    return rawData.reduce(
      (acc, item) => {
        acc.total += item.fee;
        if (item.status === "Pending") {
          acc.pendingCount += 1; // Count pending bills
          acc.pendingTotal += item.fee;
        }
        return acc;
      },
      { total: 0, pendingTotal: 0, pendingCount: 0 }
    );
  }, [rawData]);

  // --- Event Handlers ---

  const handlePayment = (bill) => {
    setSelectedBill(bill);
    setOpenDialog(true);
  };

  // HANDLER: PAY ONE BILL
  const handleConfirmPayment = async () => {
    if (!selectedBill) return;

    try {
      const response = await fetch(
        "http://localhost/digi-capitale/backend/api/payBills.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "pay_one",
            paymentCode: selectedBill.id, // ID trong getBills map sang PaymentCode
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Payment Successful!"); // Thông báo nhẹ
        await fetchBills(); // Reload data từ server
        setOpenDialog(false);
        setSelectedBill(null);
      } else {
        alert("Payment failed: " + result.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error connecting to server");
    }
  };

  const handleCancelPayment = () => {
    setOpenDialog(false);
    setSelectedBill(null);
  };

  const handlePayAll = () => {
    setOpenPayAllDialog(true);
  };

  // HANDLER: PAY ALL BILLS
  const handleConfirmPayAll = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user?.ResidentID) return;

    try {
      const response = await fetch(
        "http://localhost/digi-capitale/backend/api/payBills.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "pay_all",
            residentID: user.ResidentID,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("All bills paid successfully! 🎉");
        await fetchBills(); // Reload data từ server
        setOpenPayAllDialog(false);
      } else {
        alert("Pay all failed: " + result.message);
      }
    } catch (error) {
      console.error("Pay all error:", error);
      alert("Error connecting to server");
    }
  };

  const handleCancelPayAll = () => {
    setOpenPayAllDialog(false);
  };

  const handleMonthChange = (direction) => {
    const months = Object.keys(data).sort().reverse();
    const currentIndex = months.indexOf(currentMonth);

    if (direction === "next" && currentIndex > 0) {
      setCurrentMonth(months[currentIndex - 1]);
      setCurrentPage(1);
    } else if (direction === "prev" && currentIndex < months.length - 1) {
      setCurrentMonth(months[currentIndex + 1]);
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

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading your bills...</Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ pt: 0, pb: 4, display: "block", margin: "0 auto", gap: 0 }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

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
          <Button variant="contained" color="primary" sx={{ borderRadius: 20 }} component={Link} to="/makeincidents">
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

      {totalItems === 0 ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          No bills found for {currentMonth}.
        </Alert>
      ) : (
        <>
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
              <UtilityCard
                key={item.id}
                item={item}
                onPay={handlePayment}
                theme={theme}
              />
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
              <Typography
                variant="h3"
                sx={{ fontWeight: 500, color: "inherit" }}
              >
                Total Services bill
              </Typography>
              <Typography
                variant="h1"
                sx={{ fontWeight: 700, color: "inherit" }}
              >
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
        </>
      )}

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
          disabled={
            Object.keys(data).length === 0 ||
            Object.keys(data).sort().reverse().indexOf(currentMonth) ===
              Object.keys(data).length - 1
          }
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
          disabled={
            Object.keys(data).length === 0 ||
            Object.keys(data).sort().reverse().indexOf(currentMonth) === 0
          }
          size="large"
          sx={{ color: theme.palette.text.secondary }}
        >
          <ArrowForwardIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Box>

      {/* --- Utility Details Table --- */}
      <UtilityTable currentData={rawData} onPay={handlePayment} theme={theme} />

      {/* --- Payment Confirmation Dialog --- */}
      <Dialog
        open={openDialog}
        onClose={handleCancelPayment}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{ fontSize: 32, color: "secondary.light", fontWeight: 700 }}
        >
          Confirm Payment
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {selectedBill && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body1">
                Service: <strong>{selectedBill.name}</strong>
              </Typography>
              <Typography variant="body1">
                Amount: <strong>${selectedBill.fee.toFixed(2)}</strong>
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: theme.palette.text.secondary }}
              >
                Are you sure you want to pay this bill?
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={handleCancelPayment} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmPayment}
            variant="contained"
            color="primary"
          >
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>

      {/* --- Pay All Bills Confirmation Dialog --- */}
      <Dialog
        open={openPayAllDialog}
        onClose={handleCancelPayAll}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{ fontSize: 32, color: "secondary.light", fontWeight: 700 }}
        >
          Confirm Payment
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body1">
              Total Amount: <strong>${summary.pendingTotal.toFixed(2)}</strong>
            </Typography>
            <Typography variant="body1">
              Pending Bills: <strong>{summary.pendingCount}</strong>
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: theme.palette.text.secondary }}
            >
              Are you sure you want to pay all pending bills for {currentMonth}?
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={handleCancelPayAll} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmPayAll}
            variant="contained"
            color="primary"
          >
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
