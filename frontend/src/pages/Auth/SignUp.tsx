import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import PersonRounded from "@mui/icons-material/PersonRounded";
import EmailRounded from "@mui/icons-material/EmailRounded";
import LockRounded from "@mui/icons-material/LockRounded";
import PhoneRounded from "@mui/icons-material/PhoneRounded";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRounded from "@mui/icons-material/VisibilityOffRounded";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    residentId: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords don't match");
    return;
  }
  
  if (!agreeToTerms) {
    alert("Please agree to terms");
    return;
  }

  try {
     console.log('Sending:', formData);
    //use Xampp
    // const res = await fetch('http://localhost/api/signup.php', {

    //Use MAMP
    const res = await fetch('http://localhost:8888/backend/api/index.php?action=signup',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        residentId: formData.residentId,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      })
    });
    console.log('Response status:', res.status); 
    const data = await res.json();
    console.log('Response data:', data);
    if (data.success) {
      // Redirect to login
      window.location.href = '/sign-in';
    } else {
      alert(data.message); // Show error from backend
    }
  } catch (error) {
    alert('Sign up failed');
  }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 440,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Stack spacing={3}>
          {/* Header */}
          <Stack spacing={1} textAlign="center">
            <Typography variant="h1" color="text.primary">
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign up to get started
            </Typography>
          </Stack>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {/* First Name */}
              <TextField
                fullWidth
                type="text"
                label="First Name"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange("firstName")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonRounded sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
                required
              />
              {/* Last Name */}
              <TextField
                fullWidth
                type="text"
                label="Last Name"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange("lastName")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonRounded sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
                required
              />

              <TextField
                fullWidth
                type="text"
                label="Resident ID"
                placeholder="Enter your resident ID"
                value={formData.residentId}
                onChange={handleChange("residentId")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonRounded sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
                required
              />

              {/* Email Input */}
              <TextField
                fullWidth
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange("email")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRounded sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
                required
              />

              {/* Phone Input */}
              <TextField
                fullWidth
                type="tel"
                label="Phone Number"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange("phone")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneRounded sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
                required
              />

              {/* Password Input - Password123 */}
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange("password")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRounded sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffRounded sx={{ color: "text.secondary" }} />
                        ) : (
                          <VisibilityRounded sx={{ color: "text.secondary" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />

              {/* Confirm Password Input */}
              <TextField
                fullWidth
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange("confirmPassword")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRounded sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOffRounded sx={{ color: "text.secondary" }} />
                        ) : (
                          <VisibilityRounded sx={{ color: "text.secondary" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />

              {/* Terms & Conditions */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the Terms and Conditions
                  </Typography>
                }
              />
              {/* Sign Up Button */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Sign Up
              </Button>
            </Stack>
          </form>

          {/* Sign In Link */}
          <Typography variant="body2" textAlign="center" color="text.secondary">
            Already have an account?{" "}
            <Link
              component={RouterLink}
              to="/sign-in"
              underline="hover"
              sx={{ color: "primary.main", fontWeight: 500 }}
            >
              Sign in
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SignUp;
