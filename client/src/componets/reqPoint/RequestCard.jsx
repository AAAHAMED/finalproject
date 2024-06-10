import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const stockData = [
  { id: 1, name: "Stock A", quantity: 20 },
  { id: 2, name: "Stock B", quantity: 15 },
  // Add more stocks as needed
];

function RequestCard() {
  const [selectedStock, setSelectedStock] = useState('');
  const [requestedQuantity, setRequestedQuantity] = useState('');

  const handleRequest = () => {
    console.log(`Request for ${requestedQuantity} of ${selectedStock}`);
    // Implement the API request logic here
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="stock-select-label">Stock</InputLabel>
        <Select
          labelId="stock-select-label"
          id="stock-select"
          value={selectedStock}
          label="Stock"
          onChange={e => setSelectedStock(e.target.value)}
        >
          {stockData.filter(stock => stock.quantity > 0).map((stock) => (
            <MenuItem key={stock.id} value={stock.name}>
              {stock.name} (Available: {stock.quantity})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Quantity"
        type="number"
        variant="outlined"
        value={requestedQuantity}
        onChange={e => setRequestedQuantity(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleRequest} style={{ marginTop: 20 }}>
        Send Request
      </Button>
    </div>
  );
}

export default RequestCard;
