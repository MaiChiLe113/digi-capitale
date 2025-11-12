import React, { useState, useEffect } from "react";
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
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import EditRounded from "@mui/icons-material/EditRounded";
import HomeRounded from "@mui/icons-material/HomeRounded";
import EmailRounded from "@mui/icons-material/EmailRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";
import DirectionsCarRounded from "@mui/icons-material/DirectionsCarRounded";
import TwoWheelerRounded from "@mui/icons-material/TwoWheelerRounded";
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRounded from "@mui/icons-material/VisibilityOffRounded";
import CloudUploadRounded from "@mui/icons-material/CloudUploadRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import LockIcon from '@mui/icons-material/Lock';
const DLogo = "/images/Dlogo.svg";

interface ResidentProfile {
  ResidentID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Image: string | null;
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const Profile = () => {
  const [profile, setProfile] = useState<ResidentProfile | null>(null);
  const [apartment, setApartment] = useState<ApartmentInfo | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Edit states
  const [editEmail, setEditEmail] = useState("");
  const [editPhoto, setEditPhoto] = useState<string | null>("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

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

      await fetchProfileData(user.ResidentID);
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
        setEditEmail(data.profile.Email);
        setEditPhoto(data.profile.Image);
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
    setOpenEditDialog(true);
    setTabValue(0);
    setSuccessMessage(null);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateEmail = async () => {
    if (!editEmail) {
      alert("Email cannot be empty");
      return;
    }

    if (editEmail === profile?.Email) {
      alert("New email must be different");
      return;
    }

    setEditLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await fetch(
        `http://localhost/digi-capitale/backend/api/index.php?action=updateEmail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            residentId: user.ResidentID,
            email: editEmail,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setProfile({ ...profile!, Email: editEmail });
        setSuccessMessage("Email updated successfully!");
        setTimeout(() => {
          setOpenEditDialog(false);
          setSuccessMessage(null);
        }, 2000);
      } else {
        alert(data.message || "Failed to update email");
      }
    } catch (error) {
      console.error("Error updating email:", error);
      alert("Failed to update email");
    } finally {
      setEditLoading(false);
    }
  };

  const handleUpdatePhoto = async () => {
    if (!photoFile) {
      alert("Please select a photo");
      return;
    }

    setEditLoading(true);
    try {
      const formData = new FormData();
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      formData.append("residentId", user.ResidentID);
      formData.append("photo", photoFile);

      const response = await fetch(
        `http://localhost/digi-capitale/backend/api/index.php?action=updatePhoto`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        setProfile({ ...profile!, Image: editPhoto });
        setPhotoFile(null);
        setSuccessMessage("Photo updated successfully!");
        setTimeout(() => {
          setOpenEditDialog(false);
          setSuccessMessage(null);
        }, 2000);
      } else {
        alert(data.message || "Failed to update photo");
      }
    } catch (error) {
      console.error("Error updating photo:", error);
      alert("Failed to update photo");
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeletePhoto = async () => {
    if (!window.confirm("Are you sure you want to delete your profile photo?")) {
      return;
    }

    setEditLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await fetch(
        `http://localhost/digi-capitale/backend/api/index.php?action=deletePhoto`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ residentId: user.ResidentID }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setProfile({ ...profile!, Image: null });
        setEditPhoto(null);
        setPhotoFile(null);
        setSuccessMessage("Photo deleted successfully!");
        setTimeout(() => {
          setOpenEditDialog(false);
          setSuccessMessage(null);
        }, 2000);
      } else {
        alert(data.message || "Failed to delete photo");
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert("Failed to delete photo");
    } finally {
      setEditLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (newPassword === currentPassword) {
      alert("New password must be different from current password");
      return;
    }

    setEditLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await fetch(
        `http://localhost/digi-capitale/backend/api/index.php?action=updatePassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            residentId: user.ResidentID,
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setSuccessMessage("Password updated successfully!");
        setTimeout(() => {
          setOpenEditDialog(false);
          setSuccessMessage(null);
        }, 2000);
      } else {
        alert(data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password");
    } finally {
      setEditLoading(false);
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

  // Get avatar image - use default logo if no image
  const avatarImage = profile.Image || DLogo;

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
            Edit Settings
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
                src={avatarImage}
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
                              <Typography variant="body1" color="textSecondary">
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
            {/* Support Section */}
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, mt: 3 }}>
                Support
              </Typography>
                <Stack spacing={2}>
                    <Card>
                      <CardContent>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Stack direction="row" alignItems="center" gap={2}>
                            <HomeRepairServiceIcon sx={{ color: "primary.main", fontSize: 32 }} />
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                Building Manager
                              </Typography>
                              <Typography variant="body1" color="textSecondary">
                                021 899 5434
                              </Typography>
                            </Box>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Stack direction="row" alignItems="center" gap={2}>
                            <RoomServiceIcon sx={{ color: "primary.main", fontSize: 32 }} />
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                Reception Hotline
                              </Typography>
                              <Typography variant="body1" color="textSecondary">
                                045 698 7123
                              </Typography>
                            </Box>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Stack direction="row" alignItems="center" gap={2}>
                            <LockIcon sx={{ color: "primary.main", fontSize: 32 }} />
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                Security Hotline
                              </Typography>
                              <Typography variant="body1" color="textSecondary">
                                000 589 6376
                              </Typography>
                            </Box>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                </Stack>
              
            </Box>


          </>
        )}
      </Stack>

      {/* Edit Settings Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Settings</DialogTitle>
        <DialogContent>
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{ borderBottom: 1, borderColor: "divider", mb: 2, mt: 1 }}
          >
            <Tab label="Photo" id="tab-0" aria-controls="tabpanel-0" />
            <Tab label="Email" id="tab-1" aria-controls="tabpanel-1" />
            <Tab label="Password" id="tab-2" aria-controls="tabpanel-2" />
          </Tabs>

          {/* Photo Tab */}
          <TabPanel value={tabValue} index={0}>
            <Stack spacing={2}>
              <Avatar
                src={editPhoto || DLogo}
                sx={{ width: 100, height: 100, mx: "auto" }}
              >
                {profile.FirstName[0]}
              </Avatar>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadRounded />}
              >
                Upload Photo
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handlePhotoChange}
                />
              </Button>
              {profile.Image && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteRounded />}
                  onClick={handleDeletePhoto}
                  disabled={editLoading}
                >
                  {editLoading ? "Deleting..." : "Delete Photo"}
                </Button>
              )}
              <Typography variant="caption" color="textSecondary" align="center">
                Max size: 5MB. Supported: JPG, PNG
              </Typography>
            </Stack>
          </TabPanel>

          {/* Email Tab */}
          <TabPanel value={tabValue} index={1}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
              <Typography variant="caption" color="textSecondary">
                Current: {profile.Email}
              </Typography>
            </Stack>
          </TabPanel>

          {/* Password Tab */}
          <TabPanel value={tabValue} index={2}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Current Password"
                type={showPasswords ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPasswords(!showPasswords)}
                      edge="end"
                      size="small"
                    >
                      {showPasswords ? <VisibilityOffRounded /> : <VisibilityRounded />}
                    </IconButton>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="New Password"
                type={showPasswords ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type={showPasswords ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Typography variant="caption" color="textSecondary">
                Password must be at least 8 characters
              </Typography>
            </Stack>
          </TabPanel>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          {tabValue === 0 && (
            <Button
              onClick={handleUpdatePhoto}
              variant="contained"
              disabled={!photoFile || editLoading}
            >
              {editLoading ? "Uploading..." : "Upload Photo"}
            </Button>
          )}
          {tabValue === 1 && (
            <Button
              onClick={handleUpdateEmail}
              variant="contained"
              disabled={editLoading}
            >
              {editLoading ? "Updating..." : "Update Email"}
            </Button>
          )}
          {tabValue === 2 && (
            <Button
              onClick={handleUpdatePassword}
              variant="contained"
              disabled={editLoading}
            >
              {editLoading ? "Updating..." : "Update Password"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;