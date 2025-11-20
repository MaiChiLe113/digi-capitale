import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CircularProgress,
  Alert,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stack,
  Chip,
  Paper,
} from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import CalendarTodayRounded from "@mui/icons-material/CalendarTodayRounded";
import AccessTimeRounded from "@mui/icons-material/AccessTimeRounded";
import PeopleRounded from "@mui/icons-material/PeopleRounded";

interface Utility {
  ItemID: number;
  ServiceName: string;
  UnitPrice: number;
  Condition: string;
}

interface Slot {
  SlotID: number;
  SlotDay: string;
  StartTime: string;
  Capacity: number;
  RemainingCapacity: number;
}

export default function BookUtility() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [utility, setUtility] = useState<Utility | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchUtilityAndSlots();
  }, [id]);

  const fetchUtilityAndSlots = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost/digi-capitale/backend/api/bookUtility.php?action=getUtilitySlots&itemId=${id}`
      );
      const data = await response.json();

      if (data.success) {
        setUtility(data.utility);
        setSlots(data.slots);
      } else {
        setError(data.message || "Failed to load utility information");
      }
    } catch (err) {
      console.error("Error fetching utility data:", err);
      setError("Failed to load utility information");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!selectedSlot) {
      setError("Please select a time slot");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.ResidentID) {
      setError("Please sign in to book utilities");
      return;
    }

    setBookingLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost/digi-capitale/backend/api/bookUtility.php?action=bookSlot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            residentId: user.ResidentID,
            slotId: selectedSlot,
            note: note,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        setError(data.message || "Failed to book slot");
      }
    } catch (err) {
      console.error("Error booking slot:", err);
      setError("Failed to book slot. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error && !utility) {
    return (
      <Container>
        <Box sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
          <Button
            variant="outlined"
            startIcon={<ArrowBackRounded />}
            onClick={() => navigate("/utility")}
          >
            Back to Utilities
          </Button>
        </Box>
      </Container>
    );
  }

  if (success) {
    return (
      <Container>
        <Box sx={{ py: 6, textAlign: "center" }}>
          <Alert severity="success" sx={{ mb: 3 }}>
            Booking successful! Redirecting to home...
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Button
          variant="text"
          startIcon={<ArrowBackRounded />}
          onClick={() => navigate("/utility")}
          sx={{ mb: 3 }}
        >
          Back to Utilities
        </Button>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
            Book {utility?.ServiceName}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Chip
              label={utility?.Condition}
              color={utility?.Condition === "Available" ? "success" : "warning"}
              sx={{ borderRadius: 2 }}
            />
            {utility?.UnitPrice && utility.UnitPrice > 0 && (
              <Chip
                label={`$${utility.UnitPrice}`}
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
            )}
          </Stack>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Select a Time Slot
        </Typography>

        {slots.length === 0 ? (
          <Alert severity="info" sx={{ mb: 3 }}>
            No available slots at this time. Please check back later.
          </Alert>
        ) : (
          <RadioGroup
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(Number(e.target.value))}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
                mb: 4,
              }}
            >
              {slots.map((slot) => (
                <Card
                  key={slot.SlotID}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    border: 2,
                    borderColor:
                      selectedSlot === slot.SlotID
                        ? "primary.main"
                        : "transparent",
                    transition: "all 0.2s",
                    "&:hover": {
                      borderColor: "primary.light",
                      boxShadow: 2,
                    },
                  }}
                  onClick={() => setSelectedSlot(slot.SlotID)}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <FormControlLabel
                        value={slot.SlotID}
                        control={<Radio />}
                        label=""
                        sx={{ m: 0 }}
                      />
                      <Box>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <CalendarTodayRounded
                            sx={{ fontSize: 18, color: "text.secondary" }}
                          />
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {formatDate(slot.SlotDay)}
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ mt: 0.5 }}
                        >
                          <AccessTimeRounded
                            sx={{ fontSize: 18, color: "text.secondary" }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {slot.StartTime}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>

                    <Stack alignItems="flex-end">
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <PeopleRounded
                          sx={{ fontSize: 18, color: "text.secondary" }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color:
                              slot.RemainingCapacity <= 2
                                ? "error.main"
                                : "success.main",
                          }}
                        >
                          {slot.RemainingCapacity}/{slot.Capacity}
                        </Typography>
                      </Stack>
                      <Typography variant="caption" color="text.secondary">
                        {slot.RemainingCapacity <= 2
                          ? "Almost full"
                          : "Available"}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
              ))}
            </Box>
          </RadioGroup>
        )}

        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Additional Note (Optional)
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Add any special requests or notes..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          sx={{ mb: 4 }}
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={() => navigate("/utility")}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleBooking}
            disabled={!selectedSlot || bookingLoading || slots.length === 0}
          >
            {bookingLoading ? "Booking..." : "Confirm Booking"}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
