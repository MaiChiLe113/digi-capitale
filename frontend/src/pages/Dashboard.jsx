import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost/digi-capitale/backend/api/index.php?action=getDashboardStats"
        );
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message || "Failed to load data");
        }
      } catch (err) {
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Calculate summary statistics from real data
  const totalBookings = data?.usageFrequency?.reduce(
    (sum, item) => sum + parseInt(item.ConfirmedBookings || 0), 0
  ) || 0;

  const totalRevenue = data?.monthlyRevenue?.reduce(
    (sum, item) => sum + parseFloat(item.TotalCollected || 0), 0
  ) || 0;

  const totalMinutes = data?.usageMinutes?.reduce(
    (sum, item) => sum + parseFloat(item.TotalUsageMinutes || 0), 0
  ) || 0;

  const totalServices = data?.usageFrequency?.length || 0;

  // Format data for charts
  const revenueChartData = data?.monthlyRevenue?.map((row) => ({
    name: `${monthNames[row.BillMonth]} ${row.BillYear}`,
    revenue: parseFloat(row.TotalCollected || 0),
  })).reverse() || [];

  const usageChartData = data?.usageFrequency?.map((row) => ({
    name: row.ServiceName,
    bookings: parseInt(row.ConfirmedBookings || 0),
  })) || [];

  const usageMinutesData = data?.usageMinutes?.map((row) => ({
    name: row.ServiceName,
    minutes: parseFloat(row.TotalUsageMinutes || 0),
  })) || [];

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Total Bookings
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {totalBookings.toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Confirmed bookings
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Total Revenue
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {(totalRevenue / 1000000).toFixed(1)}M
            </Typography>
            <Typography variant="caption" color="text.secondary">
              VND collected
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Usage Time
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {totalMinutes > 60 ? `${(totalMinutes / 60).toFixed(1)}h` : `${totalMinutes}m`}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total usage minutes
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper sx={{ p: 2.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Active Services
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {totalServices}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Available utilities
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }} >
        {/* Monthly Revenue Chart */}
        <Grid item xs={12} lg={12}>
          <Paper sx={{ p: 3, height: 420 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              Monthly Revenue
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Revenue collected from paid bills
            </Typography>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  formatter={(value) => [`${Number(value).toLocaleString()} VND`, "Revenue"]}
                  contentStyle={{ fontSize: 13 }}
                />
                <Bar dataKey="revenue" fill="#D6B585" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Usage by Service Chart */}
        <Grid item xs={12} lg={6} style={{ marginTop: 16 }}>
          <Paper sx={{ p: 3, height: 420 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              Bookings by Service
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Confirmed bookings per utility
            </Typography>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={usageChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10 }} 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ fontSize: 13 }} />
                <Bar dataKey="bookings" fill="#D6B585" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Service Details Table */}
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Service Details
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Service Name</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Confirmed Bookings</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Total Usage (minutes)</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Avg. per Booking</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.usageFrequency?.map((service, idx) => {
                const usageData = data?.usageMinutes?.find(
                  (u) => u.ServiceName === service.ServiceName
                );
                const minutes = parseFloat(usageData?.TotalUsageMinutes || 0);
                const bookings = parseInt(service.ConfirmedBookings || 0);
                const avgTime = bookings > 0 ? (minutes / bookings).toFixed(1) : 0;

                return (
                  <TableRow key={idx} hover>
                    <TableCell>{service.ServiceName}</TableCell>
                    <TableCell align="right">{bookings.toLocaleString()}</TableCell>
                    <TableCell align="right">{minutes.toLocaleString()}</TableCell>
                    <TableCell align="right">{avgTime} min</TableCell>
                  </TableRow>
                );
              })}
              {(!data?.usageFrequency || data.usageFrequency.length === 0) && (
                <TableRow>
                  <TableCell colSpan={4} align="center">No data available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}