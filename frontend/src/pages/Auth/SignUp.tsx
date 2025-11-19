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
import PersonRounded from "@mui/icons-material/PersonRounded";
import EmailRounded from "@mui/icons-material/EmailRounded";
import LockRounded from "@mui/icons-material/LockRounded";
import PhoneRounded from "@mui/icons-material/PhoneRounded";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRounded from "@mui/icons-material/VisibilityOffRounded";

interface FormErrors {
  firstName: string;
  lastName: string;
  residentId: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    residentId: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    firstName: "",
    lastName: "",
    residentId: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    residentId: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation functions
  const validateFirstName = (value: string) => {
    if (!value.trim()) {
      return "First name is required";
    }
    if (value.trim().length < 2) {
      return "First name must be at least 2 characters";
    }
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return "First name can only contain letters";
    }
    return "";
  };

  const validateLastName = (value: string) => {
    if (!value.trim()) {
      return "Last name is required";
    }
    if (value.trim().length < 2) {
      return "Last name must be at least 2 characters";
    }
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      return "Last name can only contain letters";
    }
    return "";
  };

  const validateResidentId = (value: string) => {
    if (!value.trim()) {
      return "Resident ID is required";
    }
    if (value.trim().length < 1) {
      return "Resident ID must be at least 1 characters";
    }
    return "";
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePhone = (value: string) => {
    if (!value.trim()) {
      return "Phone number is required";
    }
    const phoneRegex = /^[0-9+\-\s()]*$/;
    if (!phoneRegex.test(value)) {
      return "Please enter a valid phone number";
    }
    if (value.replace(/\D/g, "").length < 10) {
      return "Phone number must have at least 10 digits";
    }
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) {
      return "Password is required";
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(value)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) {
      return "Please confirm your password";
    }
    if (value !== formData.password) {
      return "Passwords don't match";
    }
    return "";
  };

  // Handle field changes
  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData({ ...formData, [field]: value });

      // Validate in real-time if field has been touched
      if (touched[field as keyof typeof touched]) {
        validateField(field, value);
      }
    };

  // Validate individual field
  const validateField = (field: string, value: string) => {
    let error = "";

    switch (field) {
      case "firstName":
        error = validateFirstName(value);
        break;
      case "lastName":
        error = validateLastName(value);
        break;
      case "residentId":
        error = validateResidentId(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "password":
        error = validatePassword(value);
        // Also validate confirm password if it has been touched
        if (touched.confirmPassword && formData.confirmPassword) {
          const confirmError = validateConfirmPassword(
            formData.confirmPassword
          );
          setFormErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
        }
        break;
      case "confirmPassword":
        error = validateConfirmPassword(value);
        break;
      default:
        break;
    }

    setFormErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Handle blur event to mark field as touched
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof typeof formData]);
  };

  // Validate all fields
  const validateAllFields = () => {
    const newErrors: FormErrors = {
      firstName: validateFirstName(formData.firstName),
      lastName: validateLastName(formData.lastName),
      residentId: validateResidentId(formData.residentId),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword),
    };

    setFormErrors(newErrors);

    // Mark all fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      residentId: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });

    // Check if there are any errors
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateAllFields()) {
      setError("Please fix all errors before submitting");
      return;
    }

    if (!agreeToTerms) {
      setError("Please agree to terms and conditions");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost/digi-capitale/backend/api/index.php?action=signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            residentId: formData.residentId,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 1500);
      } else {
        setError(data.message || "Sign up failed");
      }
    } catch (error) {
      setError("Sign up failed. Please try again.");
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
          borderRadius: 1,
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
              {/* First Name */}
              <div>
                <TextField
                  fullWidth
                  type="text"
                  label="First Name"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange("firstName")}
                  onBlur={() => handleBlur("firstName")}
                  error={touched.firstName && !!formErrors.firstName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonRounded sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
                {touched.firstName && formErrors.firstName && (
                  <FormHelperText error>{formErrors.firstName}</FormHelperText>
                )}
              </div>

              {/* Last Name */}
              <div>
                <TextField
                  fullWidth
                  type="text"
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange("lastName")}
                  onBlur={() => handleBlur("lastName")}
                  error={touched.lastName && !!formErrors.lastName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonRounded sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
                {touched.lastName && formErrors.lastName && (
                  <FormHelperText error>{formErrors.lastName}</FormHelperText>
                )}
              </div>

              {/* Resident ID */}
              <div>
                <TextField
                  fullWidth
                  type="text"
                  label="Resident ID"
                  placeholder="Enter your resident ID"
                  value={formData.residentId}
                  onChange={handleChange("residentId")}
                  onBlur={() => handleBlur("residentId")}
                  error={touched.residentId && !!formErrors.residentId}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonRounded sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
                {touched.residentId && formErrors.residentId && (
                  <FormHelperText error>{formErrors.residentId}</FormHelperText>
                )}
              </div>

              {/* Email Input */}
              <div>
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange("email")}
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

              {/* Phone Input */}
              <div>
                <TextField
                  fullWidth
                  type="tel"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  onBlur={() => handleBlur("phone")}
                  error={touched.phone && !!formErrors.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneRounded sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
                {touched.phone && formErrors.phone && (
                  <FormHelperText error>{formErrors.phone}</FormHelperText>
                )}
              </div>

              {/* Password Input */}
              <div>
                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange("password")}
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
                            <VisibilityRounded
                              sx={{ color: "text.secondary" }}
                            />
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

              {/* Confirm Password Input */}
              <div>
                <TextField
                  fullWidth
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  onBlur={() => handleBlur("confirmPassword")}
                  error={
                    touched.confirmPassword && !!formErrors.confirmPassword
                  }
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
                            <VisibilityRounded
                              sx={{ color: "text.secondary" }}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  required
                />
                {touched.confirmPassword && formErrors.confirmPassword && (
                  <FormHelperText error>
                    {formErrors.confirmPassword}
                  </FormHelperText>
                )}
              </div>

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
