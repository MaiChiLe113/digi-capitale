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
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Refresh,
  Info
} from "@mui/icons-material";

export default function AdminRequest() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost/digi-capitale/backend/api/index.php?action=getBookings");
      const data = await response.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setAlertMessage({ type: "error", text: "Failed to load bookings" });
    } finally {
      setLoading(false);
    }
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
        setAlertMessage({
          type: "success",
          text: `Booking ${dialogAction === "approve" ? "approved" : "rejected"} successfully`,
        });
        fetchBookings();
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
          onClick={fetchBookings}
          startIcon={<Refresh />}
          disabled={loading}
          sx={{ borderRadius: 2 }}
        >
          Refresh
        </Button>
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

      {/* Table */}
      {!loading && (
        <TableContainer component={Paper} sx={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f5f5f5" }}>
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
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography sx={{ color: "#999" }}>
                      No pending booking requests
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover": { bgcolor: "#fafafa" },
                      borderBottom: "1px solid #eee",
                    }}
                  >
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
                        label={booking.Status || "Pending"}
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
        </TableContainer>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle sx={{ fontWeight: 600 }}>
          {dialogAction === "approve" ? "Approve Booking" : "Reject Booking"}
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
            </Box>
          </Box>
          <Typography sx={{ mt: 2, fontSize: "0.9rem", color: "#666" }}>
            Are you sure you want to{" "}
            <strong>{dialogAction === "approve" ? "approve" : "reject"}</strong> this
            booking request?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} variant="text">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmAction}
            variant="contained"
            color={dialogAction === "approve" ? "success" : "error"}
          >
            {dialogAction === "approve" ? "Approve" : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}