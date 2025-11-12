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
import EmailRounded from "@mui/icons-material/EmailRounded";
import LockRounded from "@mui/icons-material/LockRounded";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRounded from "@mui/icons-material/VisibilityOffRounded";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
    // const response = await fetch('http://localhost/api/login.php', {
    const response = await fetch('http://localhost:8888/api/index.php?action=login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, rememberMe }),
    });
    
    const data = await response.json();
    if (data.success) {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/landing';
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

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {/* Email Input */}
              <TextField
                fullWidth
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRounded sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
                required
              />

              {/* Password Input */}
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  label={
                    <Typography variant="body2">Remember me</Typography>
                  }
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
              >
                Sign In
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