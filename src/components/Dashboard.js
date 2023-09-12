import React, { useState } from 'react';
import { Typography,Button, List, ListItem, ListItemText, Switch, Container, TextField, Select, MenuItem, Alert, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
import RuleParameters from './RuleParameters';


// Styled components for custom styling
const DashboardContainer = styled(Container)`
  border: 1px solid #e0e0e0; /* Add a border to the container */
  padding: 16px; /* Add some padding for separation */
  margin: 16px 30px; /* Add margin to separate multiple containers */
`;

const ListItemContainer = styled(ListItem)`
  border: 1px solid #e0e0e0; /* Add a border to each list item */
  margin: 8px 0; /* Add margin to separate list items */
  padding: 8px; /* Add padding for separation within list items */
  display: flex; /* Use flex for better layout control */
  align-items: center; /* Vertically align content */
  justify-content: space-between; /* Space between primary content and criteria */
`;

const SearchContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px; /* Add some spacing between inputs */
  margin-bottom: 16px; /* Add margin to separate from the list */
`;

const Dashboard = () => {
    const [rules, setRules] = useState([
        {
          id: 1,
          name: 'Unusual Transaction Time',
          active: true,
          criteria: 'High Risk',
          category: 'Temporal',
          parameters: [
            { name: 'Parameter 1', dataType: 'Text', condition: 'Equals', defaultValue: 'Value 1' },
            // Add more parameters for Rule 1 as needed
          ],
        },
        {
          id: 2,
          name: 'Frequent change in Payment Methods',
          active: false,
          criteria: 'Medium Risk',
          category: 'Behavioral',
          parameters: [
            { name: 'Parameter 1', dataType: 'Number', condition: 'Greater Than', defaultValue: 0 },
            // Add more parameters for Rule 2 as needed
          ],
        },
        {
          id: 3,
          name: 'Unusual Transaction Volume',
          active: true,
          criteria: 'Low Risk',
          category: 'Transactional',
          parameters: [
            { name: 'Parameter 1', dataType: 'Date', condition: 'Before', defaultValue: '2023-01-01' },
            // Add more parameters for Rule 3 as needed
          ],
        },
        // Add more rules with parameters as needed
      ]);
      

  const [searchText, setSearchText] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedRule, setSelectedRule] = useState(null); // Initially, no rule is selected

  const handleRuleSelect = (rule) => {
    if (selectedRule === rule) {
      setSelectedRule(null); // Close the customization panel if it's already open
    } else {
      setSelectedRule(rule); // Open the customization panel for the selected rule
    }
  };

  

  const toggleRule = (id) => {
    setRules((prevRules) =>
      prevRules.map((rule) =>
        rule.id === id ? { ...rule, active: !rule.active } : rule
      )
    );
  };

  const filteredRules = rules
    .filter((rule) => {
      // Filter by criteria (e.g., risk level)
      if (filterCriteria && rule.criteria !== filterCriteria) {
        return false;
      }
      // Filter by category
      if (filterCategory && rule.category !== filterCategory) {
        return false;
      }
      // Filter by search text
      return rule.name.toLowerCase().includes(searchText.toLowerCase());
    });

  const criteriaOptions = Array.from(new Set(rules.map((rule) => rule.criteria))); // Get unique criteria values
  const categoryOptions = Array.from(new Set(rules.map((rule) => rule.category))); // Get unique category values

  return (
    <DashboardContainer>
      <Typography variant="h4" gutterBottom>
        Rule Dashboard
      </Typography>
     
      <SearchContainer>
        <TextField
          label="Search Rules"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          fullWidth
        />
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="filter-criteria">Filter by Criteria</InputLabel>
        <Select
          label="Filter by Criteria"
          variant="outlined"
          value={filterCriteria}
          onChange={(e) => setFilterCriteria(e.target.value)}
          fullWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {criteriaOptions.map((criteria) => (
            <MenuItem key={criteria} value={criteria}>
              {criteria}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="filter-criteria">Filter by Category</InputLabel>
        <Select
          label="Filter by Category"
          variant="outlined"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          fullWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categoryOptions.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      </SearchContainer>

      <List>
  {filteredRules.map((rule) => (
    <div>
    <ListItemContainer key={rule.id}>
      <ListItemText primary={rule.name} />
      <div>
      <Typography variant="caption" color="textSecondary">Criteria:</Typography>
      <Alert variant="outlined" color="info" style={{ marginRight: '8px' }}>
        <Typography variant="body2">{rule.criteria}</Typography>
      </Alert>
    </div>
    <div>
      <Typography variant="caption" color="textSecondary">Category:</Typography>
      <Alert variant="standard" color="info" style={{ marginRight: '8px' }}>
        <Typography variant="body2">{rule.category}</Typography>
      </Alert>
    </div>
      <Button
              variant="outlined"
              color="secondary" // Light pink color
              onClick={() => handleRuleSelect(rule)}
            >
              {selectedRule === rule ? 'Close' : 'Customize'}
            </Button>
      <Switch
        checked={rule.active}
        onChange={() => toggleRule(rule.id)}
        color="primary"
      />
    
     
    </ListItemContainer>
    {selectedRule !== null && selectedRule.id === rule.id && (
        <div>
  <RuleParameters
    parameters={selectedRule.parameters}
    onSave={(updatedParameters) => {
      // Update the parameters for the selected rule in your application state
      // This may involve making an API call to save the changes on the server, if applicable
      // After saving, clear the selectedRule state to hide the parameter editing interface
      setSelectedRule(null);
    }}
  />
  </div>
)}
    </div>
  ))
  
  }
</List>

    </DashboardContainer>
  );
};

export default Dashboard;
