import React, { useState, JSX } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
} from "@mui/material";
import EmailRounded from "@mui/icons-material/EmailRounded";
import LockResetRounded from "@mui/icons-material/LockResetRounded";

export const PasswordReset = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  // Check if email field is filled and valid
  const isFormValid = () => {
    return email.trim() !== "" && email.includes("@") && !emailError;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !value.includes("@")) {
      setEmailError("Please enter valid email.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset requested for email:", email);
    navigate("/set-new-password");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
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
          {/* Header with Icon */}
          <Stack spacing={2} alignItems="center">
            <Box
              sx={{
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "primary.light",
                borderRadius: 2,
              }}
            >
              <LockResetRounded sx={{ color: "primary.main", fontSize: 24 }} />
            </Box>

            <Typography variant="h1" color="text.primary" textAlign="center">
              Forgot Your Password?
            </Typography>

            <Typography variant="body2" color="text.secondary" textAlign="center">
              No worries. We'll send you a link to reset it.
            </Typography>
          </Stack>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {/* Email Input */}
              <TextField
                fullWidth
                type="email"
                label="Email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRounded sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
                required
              />

              {/* Support Link */}
              <Typography variant="body2" textAlign="center" color="text.secondary">
                Don't have access to your email?{" "}
                <Button
                  component={RouterLink}
                  to="/contact-support"
                  size="small"
                  sx={{
                    textTransform: "none",
                    textDecoration: "underline",
                    p: 0,
                    minWidth: "auto",
                    verticalAlign: "baseline",
                  }}
                >
                  Contact support
                </Button>
              </Typography>

              {/* Submit Button */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={!isFormValid()}
              >
                Send Reset Link
              </Button>
            </Stack>
          </form>

          {/* Back to Sign In */}
          <Typography variant="body2" textAlign="center" color="text.secondary">
            Remembered your password?{" "}
            <Button
              component={RouterLink}
              to="/sign-in"
              size="small"
              sx={{
                textTransform: "none",
                p: 0,
                minWidth: "auto",
                verticalAlign: "baseline",
                fontWeight: 500,
              }}
            >
              Back to Sign In
            </Button>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default PasswordReset;