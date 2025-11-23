import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import SearchIcon from "@mui/icons-material/Search";

const ITEMS_PER_PAGE = 5;

export default function ViewIncidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ open: false, incident: null });

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost/digi-capitale/backend/api/index.php?action=handleIncidents"
      );
      const data = await res.json();
      if (data.success) {
        setIncidents(data.incidents);
      } else {
        setError(data.message || "Failed to fetch incidents");
      }
    } catch (err) {
      setError("Failed to load incidents");
    } finally {
      setLoading(false);
    }
  };

  // Get unique service names for checkbox filter
  const serviceOptions = useMemo(() => {
    const services = new Set(incidents.map(i => i.ServiceName));
    return Array.from(services).sort();
  }, [incidents]);

  // Handle item checkbox change
  const handleItemChange = (item) => {
    setSelectedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
    setCurrentPage(1);
  };

  // Filter incidents
  const filteredIncidents = useMemo(() => {
    return incidents.filter(incident => {
      // Search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        const matchesSearch =
          incident.Description?.toLowerCase().includes(search) ||
          incident.ServiceName?.toLowerCase().includes(search) ||
          incident.ImpactLevel?.toLowerCase().includes(search);
        if (!matchesSearch) return false;
      }
      // Item filter
      if (selectedItems.length > 0 && !selectedItems.includes(incident.ServiceName)) {
        return false;
      }
      return true;
    });
  }, [incidents, searchTerm, selectedItems]);

  // Pagination
  const totalPages = Math.ceil(filteredIncidents.length / ITEMS_PER_PAGE);
  const paginatedIncidents = filteredIncidents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = async () => {
    if (!deleteDialog.incident) return;

    try {
      const res = await fetch(
        "http://localhost/digi-capitale/backend/api/index.php?action=handleIncidents&delete=1",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ incidentId: deleteDialog.incident.IncidentID }),
        }
      );
      const data = await res.json();

      if (data.success) {
        setIncidents(incidents.filter(i => i.IncidentID !== deleteDialog.incident.IncidentID));
        setDeleteDialog({ open: false, incident: null });
      } else {
        setError(data.message || "Failed to delete");
      }
    } catch (err) {
      setError("Failed to delete incident");
    }
  };

  const getImpactColor = (level) => {
    switch (level) {
      case "High": return "error";
      case "Medium": return "warning";
      case "Low": return "success";
      default: return "default";
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
      <Typography variant="h1" sx={{ mb: 4 }}>
        Incident Reports
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Search incidents..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#999" }} />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      {/* Item Filter */}
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
          Filter by Service/Item
        </Typography>
        <FormGroup row>
          {serviceOptions.map(item => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  checked={selectedItems.includes(item)}
                  onChange={() => handleItemChange(item)}
                  size="small"
                />
              }
              label={item}
            />
          ))}
        </FormGroup>
        {selectedItems.length > 0 && (
          <Button
            size="small"
            onClick={() => {
              setSelectedItems([]);
              setCurrentPage(1);
            }}
            sx={{ mt: 1 }}
          >
            Clear Filters
          </Button>
        )}

      {/* Results Summary */}
      <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
        Showing {paginatedIncidents.length} of {filteredIncidents.length} incidents
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.100" }}>
              <TableCell>ID</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Impact</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedIncidents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  No incidents found
                </TableCell>
              </TableRow>
            ) : (
              paginatedIncidents.map((incident) => (
                <TableRow key={incident.IncidentID}>
                  <TableCell>{incident.IncidentID}</TableCell>
                  <TableCell>{incident.ServiceName}</TableCell>
                  <TableCell sx={{ maxWidth: 300 }}>
                    {incident.Description}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={incident.ImpactLevel}
                      color={getImpactColor(incident.ImpactLevel)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(incident.TimeStamp).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => setDeleteDialog({ open: true, incident })}
                    >
                      Resolve
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            color="primary"
            siblingCount={0}
            boundaryCount={2}
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, incident: null })}>
        <DialogTitle>Resolve Incident</DialogTitle>
        <DialogContent>
          Are you sure you want to mark this incident as resolved and remove it?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, incident: null })}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Resolve & Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
