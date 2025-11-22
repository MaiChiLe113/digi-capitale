import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Person,
  Badge,
  Business,
  Phone,
  Work,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext.tsx";

export default function EmployeeProfile() {
  const { user } = useAuth();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!user?.EmployeeID) {
        setError("Employee ID not found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost/digi-capitale/backend/api/index.php?action=getEmployeeProfile",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ employeeId: user.EmployeeID }),
          }
        );
        const result = await response.json();
        if (result.success) {
          setEmployee(result.data);
        } else {
          setError(result.message || "Failed to load profile");
        }
      } catch (err) {
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [user]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const ProfileItem = ({ icon, label, value }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 2 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "8px",
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {value || "N/A"}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Employee Profile
      </Typography>

      <Paper sx={{ p: 4, maxWidth: 600 }}>
        {/* Header with Avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              fontSize: "2rem",
              backgroundColor: "#2C325B",
            }}
          >
            {employee?.FirstName?.charAt(0)}
            {employee?.LastName?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {employee?.FirstName} {employee?.LastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {employee?.Role}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Profile Details */}
        <ProfileItem
          icon={<Badge sx={{ color: "#2C325B" }} />}
          label="Employee ID"
          value={employee?.EmployeeID}
        />

        <ProfileItem
          icon={<Person sx={{ color: "#2C325B" }} />}
          label="Full Name"
          value={`${employee?.FirstName || ""} ${employee?.LastName || ""}`}
        />

        <ProfileItem
          icon={<Work sx={{ color: "#2C325B" }} />}
          label="Role"
          value={employee?.Role}
        />

        <ProfileItem
          icon={<Business sx={{ color: "#2C325B" }} />}
          label="Building ID"
          value={employee?.BuildingID}
        />

        <ProfileItem
          icon={<Phone sx={{ color: "#2C325B" }} />}
          label="Phone"
          value={employee?.Phone}
        />
      </Paper>
    </Box>
  );
}
