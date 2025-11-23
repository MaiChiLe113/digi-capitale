import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  TablePagination,
  Select,
  MenuItem,
  Checkbox,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Refresh,
  Info,
  Undo,
} from "@mui/icons-material";

export default function AdminRequest() {
  const [activeTab, setActiveTab] = useState(0);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [solvedBookings, setSolvedBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);

  // Pagination, filtering, and selection states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedUtilities, setSelectedUtilities] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetchPendingBookings();
    fetchSolvedBookings();
  }, []);

  const fetchPendingBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost/digi-capitale/backend/api/index.php?action=getBookings&status=pending");
      const data = await response.json();
      setPendingBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching pending bookings:", error);
      setAlertMessage({ type: "error", text: "Failed to load pending bookings" });
    } finally {
      setLoading(false);
    }
  };

  const fetchSolvedBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost/digi-capitale/backend/api/index.php?action=getBookings&status=solved");
      const data = await response.json();
      setSolvedBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching solved bookings:", error);
      setAlertMessage({ type: "error", text: "Failed to load solved bookings" });
    } finally {
      setLoading(false);
    }
  };

  const fetchAllBookings = () => {
    fetchPendingBookings();
    fetchSolvedBookings();
    setPage(0); // Reset page on refresh
    setSelectedRows([]); // Clear selections
  };

  // Get unique utilities for filter
  const getUniqueUtilities = (bookings) => {
    const utilities = bookings.map(booking => booking.UtilityName);
    return ['All', ...new Set(utilities)];
  };

  // Filter bookings based on selected utility
  const getFilteredBookings = (bookings) => {
    if (selectedUtilities.length === 0) return bookings;
    return bookings.filter(booking => selectedUtilities.includes(booking.UtilityName));
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle select all
  const handleSelectAll = (bookings) => {
    const filteredBookings = getFilteredBookings(bookings);
    const allIds = filteredBookings.map(booking => booking.BookID);
    setSelectedRows(selectedRows.length === allIds.length ? [] : allIds);
  };

  // Handle select single row
  const handleSelectRow = (bookID) => {
    setSelectedRows(prev =>
      prev.includes(bookID)
        ? prev.filter(id => id !== bookID)
        : [...prev, bookID]
    );
  };

  const handleOpenDialog = (booking, action) => {
    setSelectedBooking(booking);
    setDialogAction(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedBooking(null);
    setDialogAction(null);
  };

  const handleConfirmAction = async () => {
    if (!selectedBooking) return;

    try {
      const response = await fetch("http://localhost/digi-capitale/backend/api/index.php?action=handleBookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookID: selectedBooking.BookID,
          action: dialogAction,
        }),
      });

      const result = await response.json();

      if (result.success) {
        const actionText =
          dialogAction === "approve" ? "approved" :
          dialogAction === "reject" ? "rejected" :
          "reverted to pending";

        setAlertMessage({
          type: "success",
          text: `Booking ${actionText} successfully`,
        });
        fetchAllBookings();
      } else {
        setAlertMessage({
          type: "error",
          text: result.message || "Operation failed",
        });
      }
    } catch (error) {
      console.error("Error handling booking:", error);
      setAlertMessage({ type: "error", text: "Failed to process request" });
    } finally {
      handleCloseDialog();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#333" }}>
            Booking Requests
          </Typography>
          <Typography variant="body2" sx={{ color: "#999", mt: 0.5 }}>
            Manage and process utility booking requests
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchAllBookings}
          startIcon={<Refresh />}
          disabled={loading}
          sx={{ borderRadius: 2 }}
        >
          Refresh
        </Button>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => {
          setActiveTab(newValue);
          setPage(0); // Reset page on tab change
          setSelectedRows([]); // Clear selections
        }}>
          <Tab label={`Pending Requests (${pendingBookings.length})`} />
          <Tab label={`Solved Requests (${solvedBookings.length})`} />
        </Tabs>
      </Box>

      {/* Alert Message */}
      {alertMessage && (
        <Alert
          severity={alertMessage.type}
          onClose={() => setAlertMessage(null)}
          sx={{ mb: 3 }}
        >
          {alertMessage.text}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Table - Pending Requests Tab */}
      {!loading && activeTab === 0 && (
        <>
          {/* Filter and Selection Info */}
          <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FormControl component="fieldset" sx={{ minWidth: 200 }}>
                <InputLabel shrink>Filter by Utility</InputLabel>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: 200,
                    overflowY: "auto",
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                    borderRadius: 1,
                    p: 1,
                    mt: 1,
                    bgcolor: "background.paper",
                  }}
                >
                  {getUniqueUtilities(pendingBookings)
                    .filter((u) => u !== 'All')
                    .map((utility) => (
                      <Box key={utility} sx={{ display: "flex", alignItems: "center" }}>
                        <Checkbox
                          checked={selectedUtilities.includes(utility)}
                          onChange={() => {
                            setSelectedUtilities((prevSelected) => {
                              if (prevSelected.includes(utility)) {
                                return prevSelected.filter((u) => u !== utility);
                              } else {
                                return [...prevSelected, utility];
                              }
                            });
                            setPage(0);
                            setSelectedRows([]);
                          }}
                          size="small"
                        />
                        <Typography variant="body2">{utility}</Typography>
                      </Box>
                    ))}
                </Box>
              </FormControl>
              {selectedRows.length > 0 && (
                <Typography variant="body2" sx={{ color: "#666" }}>
                  {selectedRows.length} selected
                </Typography>
              )}
            </Box>
          </Box>

          <TableContainer component={Paper} sx={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selectedRows.length > 0 && selectedRows.length < getFilteredBookings(pendingBookings).length}
                      checked={getFilteredBookings(pendingBookings).length > 0 && selectedRows.length === getFilteredBookings(pendingBookings).length}
                      onChange={() => handleSelectAll(pendingBookings)}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#333" }}>Booking ID</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#333" }}>Utility</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#333" }}>User Email</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#333" }}>Date & Time</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#333" }}>Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: "#333" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getFilteredBookings(pendingBookings).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Typography sx={{ color: "#999" }}>
                        No pending booking requests
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  getFilteredBookings(pendingBookings).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((booking) => (
                    <TableRow
                      key={booking.BookID}
                      sx={{
                        "&:hover": { bgcolor: "#fafafa" },
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedRows.includes(booking.BookID)}
                          onChange={() => handleSelectRow(booking.BookID)}
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{booking.BookID}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {booking.UtilityName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem", color: "#666" }}>
                        {booking.UserEmail}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem", color: "#666" }}>
                        {booking.BookingDate} {booking.BookingTime}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={booking.Status || "Registered"}
                          variant="outlined"
                          size="small"
                          sx={{
                            bgcolor: "#fff3cd",
                            color: "#856404",
                            borderColor: "#ffc107",
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                          <Button
                            variant="contained"
                            size="small"
                            color="success"
                            startIcon={<CheckCircle />}
                            onClick={() => handleOpenDialog(booking, "approve")}
                            sx={{ borderRadius: 1 }}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            startIcon={<Cancel />}
                            onClick={() => handleOpenDialog(booking, "reject")}
                            sx={{ borderRadius: 1 }}
                          >
                            Reject
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={getFilteredBookings(pendingBookings).length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 20]}
            />
          </TableContainer>
        </>
      )}

      {/* Table - Solved Requests Tab */}
      {!loading && activeTab === 1 && (
        <>
          {/* Filter and Selection Info */}
          <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FormControl component="fieldset" sx={{ minWidth: 200 }}>
                <InputLabel shrink>Filter by Utility</InputLabel>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: 200,
                    overflowY: "auto",
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                    borderRadius: 1,
                    p: 1,
                    mt: 1,
                    bgcolor: "background.paper",
                  }}
                >
                  {getUniqueUtilities(solvedBookings)
                    .filter((u) => u !== 'All')
                    .map((utility) => (
                      <Box key={utility} sx={{ display: "flex", alignItems: "center" }}>
                        <Checkbox
                          checked={selectedUtilities.includes(utility)}
                          onChange={() => {
                            setSelectedUtilities((prevSelected) => {
                              if (prevSelected.includes(utility)) {
                                return prevSelected.filter((u) => u !== utility);
                              } else {
                                return [...prevSelected, utility];
                              }
                            });
                            setPage(0);
                            setSelectedRows([]);
                          }}
                          size="small"
                        />
                        <Typography variant="body2">{utility}</Typography>
                      </Box>
                    ))}
                </Box>
              </FormControl>
              {selectedRows.length > 0 && (
                <Typography variant="body2" sx={{ color: "#666" }}>
                  {selectedRows.length} selected
                </Typography>
              )}
            </Box>
          </Box>

          <TableContainer component={Paper} sx={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selectedRows.length > 0 && selectedRows.length < getFilteredBookings(solvedBookings).length}
                      checked={getFilteredBookings(solvedBookings).length > 0 && selectedRows.length === getFilteredBookings(solvedBookings).length}
                      onChange={() => handleSelectAll(solvedBookings)}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#333" }}>Booking ID</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#333" }}>Utility</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#333" }}>User Email</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#333" }}>Date & Time</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#333" }}>Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: "#333" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getFilteredBookings(solvedBookings).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Typography sx={{ color: "#999" }}>
                        No solved booking requests
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  getFilteredBookings(solvedBookings).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((booking, index) => (
                    <TableRow
                      key={booking.BookID}
                      sx={{
                        "&:hover": { bgcolor: "#fafafa" },
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedRows.includes(booking.BookID)}
                          onChange={() => handleSelectRow(booking.BookID)}
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{booking.BookID}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {booking.UtilityName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem", color: "#666" }}>
                        {booking.UserEmail}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem", color: "#666" }}>
                        {booking.BookingDate} {booking.BookingTime}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={booking.Status}
                          variant="outlined"
                          size="small"
                          sx={{
                            bgcolor: booking.Status === "Confirmed" ? "#d4edda" : "#f8d7da",
                            color: booking.Status === "Confirmed" ? "#155724" : "#721c24",
                            borderColor: booking.Status === "Confirmed" ? "#28a745" : "#dc3545",
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          startIcon={<Undo />}
                          onClick={() => handleOpenDialog(booking, "revert")}
                          sx={{ borderRadius: 1 }}
                        >
                          Revert
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={getFilteredBookings(solvedBookings).length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 20]}
            />
          </TableContainer>
        </>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle sx={{ fontWeight: 600 }}>
          {dialogAction === "approve" ? "Approve Booking" :
           dialogAction === "reject" ? "Reject Booking" :
           "Revert Booking"}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <Info sx={{ color: "#1976d2", mt: 0.5, flexShrink: 0 }} />
            <Box>
              <Typography sx={{ mb: 1, fontWeight: 500 }}>
                Booking ID: {selectedBooking?.BookID}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Typography variant="body2">{selectedBooking?.UtilityName}</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "#666" }}>
                {selectedBooking?.BookingDate} at {selectedBooking?.BookingTime}
              </Typography>
              {selectedBooking?.Status && (
                <Typography variant="body2" sx={{ color: "#666", mt: 1 }}>
                  Current Status: <strong>{selectedBooking.Status}</strong>
                </Typography>
              )}
            </Box>
          </Box>
          <Typography sx={{ mt: 2, fontSize: "0.9rem", color: "#666" }}>
            Are you sure you want to{" "}
            <strong>
              {dialogAction === "approve" ? "approve" :
               dialogAction === "reject" ? "reject" :
               "revert to pending"}
            </strong> this booking request?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} variant="text">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmAction}
            variant="contained"
            color={dialogAction === "approve" ? "success" :
                   dialogAction === "reject" ? "error" :
                   "primary"}
          >
            {dialogAction === "approve" ? "Approve" :
             dialogAction === "reject" ? "Reject" :
             "Revert"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}