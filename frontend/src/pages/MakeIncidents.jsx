import React, { useState, useEffect } from "react";
import {
    Typography,
    TextField,
    Button,
    Container,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    CircularProgress,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
} from "@mui/material";

export default function MakeIncidents() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    itemId: "",
    description: "",
    impactLevel: "Low",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch items on mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          "http://localhost/digi-capitale/backend/api/index.php?action=createIncident"
        );
        const data = await res.json();
        if (data.success) {
          setItems(data.items);
        }
      } catch (err) {
        console.error("Failed to fetch items:", err);
      }
    };
    fetchItems();
  }, []);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.itemId || !formData.description || !formData.impactLevel) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost/digi-capitale/backend/api/index.php?action=createIncident",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (data.success) {
        setSuccess("Incident reported successfully!");
        setFormData({ itemId: "", description: "", impactLevel: "" });
      } else {
        setError(data.message || "Failed to report incident");
      }
    } catch (err) {
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ pt: 4, pb: 4 }}>
      <Typography variant="h1" sx={{ mb: 4 }}>
        Report an Incident
      </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess("")}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Service/Facility</InputLabel>
            <Select
              value={formData.itemId}
              label="Service/Facility"
              onChange={handleChange("itemId")}
            >
              {items.map((item) => (
                <MenuItem key={item.ItemID} value={item.ItemID}>
                  {item.ServiceName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <FormLabel id="demo-radio-buttons-group-label">Impact Level</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Low"
                    name="radio-buttons-group"
                    value={formData.impactLevel}
                    onChange={handleChange("impactLevel")}
                >
                    <FormControlLabel value="Low" control={<Radio />} label="Low" />
                    <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                    <FormControlLabel value="High" control={<Radio />} label="High" />
                </RadioGroup>
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            placeholder="Describe the incident..."
            value={formData.description}
            onChange={handleChange("description")}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Submit Report"}
          </Button>
        </form>
    </Container>
  );
}
