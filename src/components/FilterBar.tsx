import React from "react";
import { Filters } from "../types";
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Paper, Box, SelectChangeEvent,} from "@mui/material";

interface FilterBarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  positions: string[];
  statTypes: string[];
}

interface FilterOption {
  label: string;
  name: keyof Filters;
  options: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters, positions, statTypes}) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      position: "",
      statType: "",
      marketStatus: "",
      searchTerm: "",
    });
  };

  const renderSelectValue = (value: string) =>
    value === "" ? <em>All</em> : value;

  const filterOptions: FilterOption[] = [
    {
      label: "Position",
      name: "position",
      options: positions,
    },
    {
      label: "Stat Type",
      name: "statType",
      options: statTypes,
    },
    {
      label: "Market Status",
      name: "marketStatus",
      options: ["Active", "Suspended"],
    },
  ];

  const FilterSelect: React.FC<{
    label: string;
    name: keyof Filters;
    value: string;
    options: string[];
  }> = ({ label, name, value, options }) => (
    <FormControl fullWidth variant="outlined">
      <InputLabel id={`${name}-label`} shrink sx={{ fontSize: "1rem", color: "#555" }}>
        {label}
      </InputLabel>
      <Select
        labelId={`${name}-label`}
        id={`${name}-select`}
        name={name}
        value={value}
        onChange={handleSelectChange}
        label={label}
        renderValue={renderSelectValue}
        displayEmpty
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "repeat(4, 1fr)" }}
        gap={2}
        alignItems="flex-end"
      >
        {filterOptions.map(({ label, name, options }) => (
          <FilterSelect key={name} label={label} name={name} value={filters[name]} options={options}/>
        ))}

        <TextField
          label="Search"
          name="searchTerm"
          value={filters.searchTerm}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
        />

        <Box display="flex" justifyContent="flex-start">
          <Button variant="contained" color="primary" onClick={resetFilters}>
            Reset Filters
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default FilterBar;
