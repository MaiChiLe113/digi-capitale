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
  IconButton,
} from "@mui/material";
import LockRounded from "@mui/icons-material/LockRounded";
import VpnKeyRounded from "@mui/icons-material/VpnKeyRounded";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRounded from "@mui/icons-material/VisibilityOffRounded";

export const SetNewPassword = (): JSX.Element => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData((prev) => {
      const newFormData = { ...prev, [field]: value };

      if (field === "password") {
        if (value && value.length < 8) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: "Password must be at least 8 characters.",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
        }
        if (
          newFormData.confirmPassword &&
          newFormData.confirmPassword !== value
        ) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: "Please enter the same password as above.",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
        }
      } else if (field === "confirmPassword") {
        if (value && newFormData.password !== value) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: "Please enter the same password as above.",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
        }
      }
      return newFormData;
    });
  };

  const isFormValid = () => {
    return (
      formData.password.trim() !== "" &&
      formData.confirmPassword.trim() !== "" &&
      formData.password === formData.confirmPassword &&
      formData.password.length >= 8
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Please enter the same password as above.",
      }));
      return;
    }

    if (formData.password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters.",
      }));
      return;
    }

    console.log("Password reset form submitted");
    navigate("/password-reset-success-confirmation");
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
              <VpnKeyRounded sx={{ color: "primary.main", fontSize: 24 }} />
            </Box>

            <Typography variant="h1" color="text.primary" textAlign="center">
              Create A New Password
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Choose a strong password you haven't used before.
            </Typography>
          </Stack>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {/* Password Input */}
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Type your password here"
                value={formData.password}
                onChange={handleInputChange("password")}
                error={!!errors.password}
                helperText={errors.password}
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
                          <VisibilityOffRounded
                            sx={{ color: "text.secondary" }}
                          />
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
                placeholder="Retype your password here"
                value={formData.confirmPassword}
                onChange={handleInputChange("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRounded sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOffRounded
                            sx={{ color: "text.secondary" }}
                          />
                        ) : (
                          <VisibilityRounded sx={{ color: "text.secondary" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />

              {/* Info Message */}
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Your password has to be different from previous ones.
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
                Reset Password
              </Button>
            </Stack>
          </form>

          {/* Back to Sign In */}
          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
          >
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

export default SetNewPassword;