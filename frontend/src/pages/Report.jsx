import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Report() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination states
  const [revenuePage, setRevenuePage] = useState(0);
  const [revenueRowsPerPage, setRevenueRowsPerPage] = useState(5);
  const [unpaidPage, setUnpaidPage] = useState(0);
  const [unpaidRowsPerPage, setUnpaidRowsPerPage] = useState(5);
  const [servicePage, setServicePage] = useState(0);
  const [serviceRowsPerPage, setServiceRowsPerPage] = useState(5);

  // Search/filter states
  const [revenueSearch, setRevenueSearch] = useState("");
  const [revenueSort, setRevenueSort] = useState("desc");
  const [unpaidSearch, setUnpaidSearch] = useState("");
  const [unpaidSort, setUnpaidSort] = useState("desc");
  const [serviceSearch, setServiceSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost/digi-capitale/backend/api/index.php?action=getReportData"
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

  // Filtered and sorted data
  const filteredRevenue = useMemo(() => {
    if (!data?.revenueByResident) return [];
    let filtered = data.revenueByResident.filter(
      (row) =>
        row.ResidentID?.toString().includes(revenueSearch) ||
        row.RoomNum?.toString().toLowerCase().includes(revenueSearch.toLowerCase())
    );
    filtered.sort((a, b) =>
      revenueSort === "desc"
        ? Number(b.TotalAmountCollected) - Number(a.TotalAmountCollected)
        : Number(a.TotalAmountCollected) - Number(b.TotalAmountCollected)
    );
    return filtered;
  }, [data?.revenueByResident, revenueSearch, revenueSort]);

  const filteredUnpaid = useMemo(() => {
    if (!data?.unpaidBills) return [];
    let filtered = data.unpaidBills.filter(
      (row) =>
        row.ResidentID?.toString().includes(unpaidSearch) ||
        row.RoomNum?.toString().toLowerCase().includes(unpaidSearch.toLowerCase())
    );
    filtered.sort((a, b) =>
      unpaidSort === "desc"
        ? Number(b.TotalAmountOwed) - Number(a.TotalAmountOwed)
        : Number(a.TotalAmountOwed) - Number(b.TotalAmountOwed)
    );
    return filtered;
  }, [data?.unpaidBills, unpaidSearch, unpaidSort]);

  const filteredService = useMemo(() => {
    if (!data?.revenueByService) return [];
    return data.revenueByService.filter((row) =>
      row.ServiceName?.toLowerCase().includes(serviceSearch.toLowerCase())
    );
  }, [data?.revenueByService, serviceSearch]);

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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Report
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Revenue by Resident */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Revenue by Resident (Paid)
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
            <TextField
              size="small"
              placeholder="Search Room or Resident ID"
              value={revenueSearch}
              onChange={(e) => {
                setRevenueSearch(e.target.value);
                setRevenuePage(0);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 220 }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort by Amount</InputLabel>
              <Select
                value={revenueSort}
                label="Sort by Amount"
                onChange={(e) => setRevenueSort(e.target.value)}
              >
                <MenuItem value="desc">Highest First</MenuItem>
                <MenuItem value="asc">Lowest First</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Resident ID</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell align="right">Total Collected</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRevenue.length > 0 ? (
                  filteredRevenue
                    .slice(revenuePage * revenueRowsPerPage, revenuePage * revenueRowsPerPage + revenueRowsPerPage)
                    .map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{row.ResidentID}</TableCell>
                        <TableCell>{row.RoomNum}</TableCell>
                        <TableCell align="right">
                          {Number(row.TotalAmountCollected).toLocaleString()} VND
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">No data</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredRevenue.length}
            page={revenuePage}
            onPageChange={(e, newPage) => setRevenuePage(newPage)}
            rowsPerPage={revenueRowsPerPage}
            onRowsPerPageChange={(e) => {
              setRevenueRowsPerPage(parseInt(e.target.value, 10));
              setRevenuePage(0);
            }}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>

        {/* Unpaid Bills */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: "error.main" }}>
            Unpaid Bills
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
            <TextField
              size="small"
              placeholder="Search Room or Resident ID"
              value={unpaidSearch}
              onChange={(e) => {
                setUnpaidSearch(e.target.value);
                setUnpaidPage(0);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 220 }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort by Amount</InputLabel>
              <Select
                value={unpaidSort}
                label="Sort by Amount"
                onChange={(e) => setUnpaidSort(e.target.value)}
              >
                <MenuItem value="desc">Highest First</MenuItem>
                <MenuItem value="asc">Lowest First</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Resident ID</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell align="right">Unpaid Bills</TableCell>
                  <TableCell align="right">Total Owed</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUnpaid.length > 0 ? (
                  filteredUnpaid
                    .slice(unpaidPage * unpaidRowsPerPage, unpaidPage * unpaidRowsPerPage + unpaidRowsPerPage)
                    .map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{row.ResidentID}</TableCell>
                        <TableCell>{row.RoomNum}</TableCell>
                        <TableCell align="right">{row.UnpaidBills}</TableCell>
                        <TableCell align="right">
                          {Number(row.TotalAmountOwed).toLocaleString()} VND
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No unpaid bills</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredUnpaid.length}
            page={unpaidPage}
            onPageChange={(e, newPage) => setUnpaidPage(newPage)}
            rowsPerPage={unpaidRowsPerPage}
            onRowsPerPageChange={(e) => {
              setUnpaidRowsPerPage(parseInt(e.target.value, 10));
              setUnpaidPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>

        {/* Revenue by Service */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Revenue by Service
          </Typography>
          <Box sx={{ mb: 2 }}>
            <TextField
              size="small"
              placeholder="Search Service Name"
              value={serviceSearch}
              onChange={(e) => {
                setServiceSearch(e.target.value);
                setServicePage(0);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 220 }}
            />
          </Box>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Service Name</TableCell>
                  <TableCell align="right">Paid Bills</TableCell>
                  <TableCell align="right">Total Revenue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredService.length > 0 ? (
                  filteredService
                    .slice(servicePage * serviceRowsPerPage, servicePage * serviceRowsPerPage + serviceRowsPerPage)
                    .map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{row.ServiceName}</TableCell>
                        <TableCell align="right">{row.TotalPaidBills}</TableCell>
                        <TableCell align="right">
                          {Number(row.TotalRevenue).toLocaleString()} VND
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">No data</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredService.length}
            page={servicePage}
            onPageChange={(e, newPage) => setServicePage(newPage)}
            rowsPerPage={serviceRowsPerPage}
            onRowsPerPageChange={(e) => {
              setServiceRowsPerPage(parseInt(e.target.value, 10));
              setServicePage(0);
            }}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      </Box>
    </Box>
  );
}
