import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import HomeRounded from "@mui/icons-material/HomeRounded";
import DirectionsCarRounded from "@mui/icons-material/DirectionsCarRounded";
import TwoWheelerRounded from "@mui/icons-material/TwoWheelerRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";

interface ApartmentInfo {
  Building: string;
  Floor: number;
  RoomNum: string;
  RoomType: string;
}

interface Vehicle {
  VehicleID: number;
  LicensePlate: string;
  Type: string;
}

interface FamilyMember {
  Name: string;
  Relationship?: string;
  ID: string;
}

interface ApartmentData {
  apartment: ApartmentInfo;
  vehicles: Vehicle[];
  familyMembers: FamilyMember[];
}

const MyApartment = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ApartmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchApartmentData();
  }, []);

  const fetchApartmentData = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user.ResidentID) {
        setError("No resident information found");
        return;
      }

      const response = await fetch(
        `http://localhost/digi-capitale/backend/api/index.php?action=getApartmentInfo`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ residentId: user.ResidentID }),
        }
      );

      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.message || "Failed to load apartment info");
      }
    } catch (error) {
      console.error("Error fetching apartment data:", error);
      setError("Failed to fetch apartment data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <Typography>Loading apartment information...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="warning">No apartment data available</Alert>
      </Box>
    );
  }

  const { apartment, vehicles, familyMembers } = data;

  return (
    <Box sx={{ p: 4, bgcolor: "background.default", minHeight: "100vh" }}>
      <Stack spacing={3}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" gap={2}>
            <IconButton onClick={() => navigate("/profile")} size="small">
              <ArrowBackRounded />
            </IconButton>
            <Typography variant="h3" sx={{ fontWeight: 600 }}>
              My Apartment
            </Typography>
          </Stack>
        </Stack>

        {/* Apartment Info Card */}
        <Paper elevation={2} sx={{ p: 4, bgcolor: "#F5E6D3" }}>
          <Stack spacing={3}>
            {/* Building and Room Info */}
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap={2}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  {apartment.Building} - Room {apartment.RoomNum}
                </Typography>
                <Stack
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 2,
                  }}
                >
                  <Card sx={{ bgcolor: "white" }}>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Building
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        <HomeRounded sx={{ mr: 1, verticalAlign: "middle" }} />
                        {apartment.Building}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ bgcolor: "white" }}>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Floor
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {apartment.Floor}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ bgcolor: "white" }}>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Room Number
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {apartment.RoomNum}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card sx={{ bgcolor: "white" }}>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Room Type
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {apartment.RoomType}
                      </Typography>
                    </CardContent>
                  </Card>
                </Stack>
              </Box>
            </Stack>

            <Divider />

            {/* Lease Contract */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                <DescriptionRounded sx={{ mr: 1, verticalAlign: "middle" }} />
                Lease Contract
              </Typography>
              <Stack direction="row" gap={2}>
                <Button variant="outlined">View</Button>
                <Button variant="outlined">Download</Button>
              </Stack>
            </Box>
          </Stack>
        </Paper>

        {/* Vehicles Section */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Vehicles
          </Typography>
          {vehicles.length > 0 ? (
            <Stack
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                gap: 2,
              }}
            >
              {vehicles.map((vehicle) => (
                <Card key={vehicle.VehicleID}>
                  <CardContent>
                    <Stack spacing={1}>
                      <Typography color="textSecondary" gutterBottom>
                        {vehicle.Type === "car" && (
                          <>
                            <DirectionsCarRounded sx={{ mr: 1, verticalAlign: "middle" }} />
                            Car
                          </>
                        )}
                        {(vehicle.Type === "motorcycle" || vehicle.Type === "Motorcycle") && (
                          <>
                            <TwoWheelerRounded sx={{ mr: 1, verticalAlign: "middle" }} />
                            Motorcycle
                          </>
                        )}
                        {vehicle.Type === "electricbike" && (
                          <>
                            <TwoWheelerRounded sx={{ mr: 1, verticalAlign: "middle" }} />
                            Electric Bike
                          </>
                        )}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {vehicle.LicensePlate}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          ) : (
            <Typography color="textSecondary">No vehicles registered</Typography>
          )}
        </Box>

        {/* Family Members Section */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Family
          </Typography>
          {familyMembers.length > 0 ? (
            <Stack spacing={2}>
              {familyMembers.map((member, index) => (
                <Card key={index}>
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" alignItems="center" gap={2}>
                        <PersonRounded sx={{ color: "primary.main", fontSize: 32 }} />
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {member.Name}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            ID: {member.ID}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          ) : (
            <Typography color="textSecondary">No family members added</Typography>
          )}
        </Box>
      </Stack>

      {/* Image Preview Dialog */}
      <Dialog
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Image Preview</Typography>
            <IconButton onClick={() => setSelectedImage(null)} size="small">
              <CloseRounded />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedImage && (
            <Box
              component="img"
              src={selectedImage}
              sx={{ width: "100%", height: "auto" }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MyApartment;