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
  Alert,
  AlertTitle,
  FormHelperText,
} from "@mui/material";
import EmailRounded from "@mui/icons-material/EmailRounded";
import LockRounded from "@mui/icons-material/LockRounded";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRounded from "@mui/icons-material/VisibilityOffRounded";

interface FormErrors {
  email: string;
  password: string;
}

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  // Validation functions
  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return "Email is required";
    }
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) {
      return "Password is required";
    }
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  // Handle field changes
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (touched.email) {
      setFormErrors((prev) => ({
        ...prev,
        email: validateEmail(value),
      }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (touched.password) {
      setFormErrors((prev) => ({
        ...prev,
        password: validatePassword(value),
      }));
    }
  };

  // Handle blur event
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (field === "email") {
      setFormErrors((prev) => ({
        ...prev,
        email: validateEmail(email),
      }));
    } else if (field === "password") {
      setFormErrors((prev) => ({
        ...prev,
        password: validatePassword(password),
      }));
    }
  };

  // Validate all fields
  const validateAllFields = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setFormErrors({
      email: emailError,
      password: passwordError,
    });

    setTouched({
      email: true,
      password: true,
    });

    return emailError === "" && passwordError === "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateAllFields()) {
      setError("Please fix all errors before signing in");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost/digi-capitale/backend/api/index.php?action=login",
        {
          // const response = await fetch('http://localhost:8888/api/index.php?action=login', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, rememberMe }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess("Sign in successful! Redirecting...");
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setTimeout(() => {
          window.location.href = "/landing";
        }, 1500);
      } else {
        // Handle specific error messages from backend
        if (data.message === "Invalid email" || data.message === "User not found") {
          setError("No account found with this email address");
          setFormErrors((prev) => ({
            ...prev,
            email: "Account not found",
          }));
        } else if (data.message === "Invalid password" || data.message === "Password incorrect") {
          setError("Incorrect password. Please try again.");
          setFormErrors((prev) => ({
            ...prev,
            password: "Incorrect password",
          }));
        } else {
          setError(data.message || "Sign in failed. Please try again.");
        }
      }
    } catch (error) {
      setError("An error occurred. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
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
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to continue to your account
            </Typography>
          </Stack>

          {/* Alert */}
          {error && (
            <Alert severity="error" onClose={() => setError("")}>
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" onClose={() => setSuccess("")}>
              <AlertTitle>Success</AlertTitle>
              {success}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {/* Email Input */}
              <div>
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => handleBlur("email")}
                  error={touched.email && !!formErrors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailRounded sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
                {touched.email && formErrors.email && (
                  <FormHelperText error>{formErrors.email}</FormHelperText>
                )}
              </div>

              {/* Password Input */}
              <div>
                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => handleBlur("password")}
                  error={touched.password && !!formErrors.password}
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
                {touched.password && formErrors.password && (
                  <FormHelperText error>{formErrors.password}</FormHelperText>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      size="small"
                    />
                  }
                  label={<Typography variant="body2">Remember me</Typography>}
                />
                <Link
                  component={RouterLink}
                  to="/password-reset-request"
                  variant="body2"
                  underline="hover"
                  sx={{ color: "primary.main" }}
                >
                  Forgot password?
                </Link>
              </Stack>

              {/* Sign In Button */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </Stack>
          </form>

          {/* Sign Up Link */}
          <Typography variant="body2" textAlign="center" color="text.secondary">
            Don't have an account?{" "}
            <Link
              component={RouterLink}
              to="/sign-up"
              underline="hover"
              sx={{ color: "primary.main", fontWeight: 500 }}
            >
              Sign up
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SignIn;