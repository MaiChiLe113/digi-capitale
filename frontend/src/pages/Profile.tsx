import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  Button,
  Paper,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from "@mui/material";
import EditRounded from "@mui/icons-material/EditRounded";
import HomeRounded from "@mui/icons-material/HomeRounded";
import PhoneRounded from "@mui/icons-material/PhoneRounded";
import EmailRounded from "@mui/icons-material/EmailRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";

interface ResidentProfile {
  ResidentID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Image: string;
  Role: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ResidentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState<Partial<ResidentProfile>>({});

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user.ResidentID) {
        setError("No resident information found");
        return;
      }

      const response = await fetch(
        `http://localhost/digi-capitale/backend/api/index.php?action=getProfile`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ residentId: user.ResidentID }),
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
    } finally {
      setLoading(false);
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

  const handleMyApartmentClick = () => {
    navigate("/my-apartment");
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
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<EditRounded />}
              onClick={handleEditClick}
            >
              Edit Profile
            </Button>
            <Button
              variant="outlined"
              startIcon={<HomeRounded />}
              onClick={handleMyApartmentClick}
            >
              My Apartment
            </Button>
          </Stack>
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

                {/* Phone */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <PhoneRounded sx={{ color: "primary.main", fontSize: 28 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Phone Number
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {profile.Phone || "Not provided"}
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
          <TextField
            fullWidth
            label="Phone"
            value={editData.Phone || ""}
            onChange={(e) => setEditData({ ...editData, Phone: e.target.value })}
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