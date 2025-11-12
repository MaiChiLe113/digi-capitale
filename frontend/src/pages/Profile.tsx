import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  Button,
  Paper,
  Avatar,
  Card,
  CardContent,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import EditRounded from "@mui/icons-material/EditRounded";
import HomeRounded from "@mui/icons-material/HomeRounded";
import EmailRounded from "@mui/icons-material/EmailRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";
import DirectionsCarRounded from "@mui/icons-material/DirectionsCarRounded";
import TwoWheelerRounded from "@mui/icons-material/TwoWheelerRounded";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";

interface ResidentProfile {
  ResidentID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Image: string;
  Role: string;
}

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

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ResidentProfile | null>(null);
  const [apartment, setApartment] = useState<ApartmentInfo | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState<Partial<ResidentProfile>>({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user.ResidentID) {
        setError("No resident information found");
        return;
      }

      // Fetch profile
      await fetchProfileData(user.ResidentID);
      // Fetch apartment info
      await fetchApartmentData(user.ResidentID);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const fetchProfileData = async (residentId: number) => {
    try {
      const response = await fetch(
        `http://localhost/digi-capitale/backend/api/index.php?action=getProfile`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ residentId }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setProfile(data.profile);
        setEditData(data.profile);
      } else {
        setError(data.message || "Failed to load profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to fetch profile data");
    }
  };

  const fetchApartmentData = async (residentId: number) => {
    try {
      const response = await fetch(
        `http://localhost/digi-capitale/backend/api/index.php?action=getApartmentInfo`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ residentId }),
        }
      );

      const result = await response.json();
      if (result.success) {
        setApartment(result.data.apartment);
        setVehicles(result.data.vehicles);
        setFamilyMembers(result.data.familyMembers);
      }
    } catch (error) {
      console.error("Error fetching apartment data:", error);
    }
  };

  const handleEditClick = () => {
    setEditData(profile || {});
    setOpenEditDialog(true);
  };

  const handleEditSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await fetch(
        `http://localhost/digi-capitale/backend/api/index.php?action=updateProfile`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            residentId: user.ResidentID,
            ...editData,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setProfile(editData as ResidentProfile);
        setOpenEditDialog(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <Typography>Loading profile...</Typography>
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

  if (!profile) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="warning">No profile data available</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, bgcolor: "background.default", minHeight: "100vh" }}>
      <Stack spacing={3}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            My Profile
          </Typography>
          <Button
            variant="contained"
            startIcon={<EditRounded />}
            onClick={handleEditClick}
          >
            Edit Profile
          </Button>
        </Stack>

        {/* Profile Card */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <Stack
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              gap: 4,
            }}
          >
            {/* Avatar Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: { xs: "1 0 100%", sm: "0 0 33.33%" },
              }}
            >
              <Avatar
                src={profile.Image}
                sx={{ width: 150, height: 150, mb: 2 }}
              >
                {profile.FirstName[0]}
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 600, textAlign: "center" }}>
                {profile.FirstName} {profile.LastName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                Resident ID: {profile.ResidentID}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  px: 2,
                  py: 1,
                  bgcolor: "primary.light",
                  color: "primary.dark",
                  borderRadius: 2,
                  textTransform: "capitalize",
                }}
              >
                {profile.Role}
              </Typography>
            </Box>

            {/* Details Section */}
            <Box sx={{ flex: { xs: "1 0 100%", sm: "0 0 66.66%" } }}>
              <Stack spacing={3}>
                {/* Email */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <EmailRounded sx={{ color: "primary.main", fontSize: 28 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Email Address
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {profile.Email}
                    </Typography>
                  </Box>
                </Box>

                <Divider />

                {/* Full Name */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <PersonRounded sx={{ color: "primary.main", fontSize: 28 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Full Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {profile.FirstName} {profile.LastName}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Paper>

        {/* Apartment Section */}
        {apartment && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
              My Apartment
            </Typography>

            <Paper elevation={2} sx={{ p: 4, bgcolor: "#F5E6D3" }}>
              <Stack spacing={3}>
                {/* Building and Room Info */}
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
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, mt: 3 }}>
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
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, mt: 3 }}>
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
                                ID: {member.ID} • {member.Relationship}
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
          </>
        )}
      </Stack>

      {/* Edit Profile Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            label="First Name"
            value={editData.FirstName || ""}
            onChange={(e) =>
              setEditData({ ...editData, FirstName: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Last Name"
            value={editData.LastName || ""}
            onChange={(e) =>
              setEditData({ ...editData, LastName: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;