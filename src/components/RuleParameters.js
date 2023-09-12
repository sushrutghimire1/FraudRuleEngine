import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';

// Styled components for custom styling
const ParameterContainer = styled(Paper)`
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #e0e0e0;
`;

const ParameterHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;



const RuleParameters = ({ parameters, onSave }) => {
  const [editedParameters, setEditedParameters] = useState(parameters);

  const handleParameterChange = (index, property, value) => {
    const updatedParameters = [...editedParameters];
    updatedParameters[index][property] = value;
    setEditedParameters(updatedParameters);
  };

  const handleSave = () => {
    onSave(editedParameters); // Save the modified parameters to the application state
  };

  return (
    <ParameterContainer>
      <ParameterHeader>
        <Typography variant="h6">Customize Parameters</Typography>
        
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </ParameterHeader>
      {editedParameters.map((parameter, index) => (
        <div key={index}>
          <TextField
            label="Parameter Name"
            variant="outlined"
            value={parameter.name}
            onChange={(e) => handleParameterChange(index, 'name', e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel>Data Type</InputLabel>
            <Select
              label="Data Type"
              value={parameter.dataType}
              onChange={(e) => handleParameterChange(index, 'dataType', e.target.value)}
            >
              <MenuItem value="Text">Text</MenuItem>
              <MenuItem value="Number">Number</MenuItem>
              <MenuItem value="Date">Date</MenuItem>
              {/* Add more data types as needed */}
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel>Condition</InputLabel>
            <Select
              label="Condition"
              value={parameter.condition}
              onChange={(e) => handleParameterChange(index, 'condition', e.target.value)}
            >
              <MenuItem value="Equals">Equals</MenuItem>
              <MenuItem value="Not Equals">Not Equals</MenuItem>
              <MenuItem value="Greater Than">Greater Than</MenuItem>
              <MenuItem value="Less Than">Less Than</MenuItem>
              {/* Add more conditions as needed */}
            </Select>
          </FormControl>
          <TextField
            label="Default Value"
            variant="outlined"
            value={parameter.defaultValue}
            onChange={(e) => handleParameterChange(index, 'defaultValue', e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
      ))}
      <Button variant="contained" color="secondary" >
          Add
        </Button>
    </ParameterContainer>
  );
};

export default RuleParameters;
