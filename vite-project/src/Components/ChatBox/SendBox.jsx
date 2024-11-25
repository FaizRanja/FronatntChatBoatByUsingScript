import { Box, IconButton, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

const SendBox = () => {
  return (
    <Paper
    sx={{
      position: "fixed",
      bottom: "80px", // Adjusted to appear above the button
      right: "20px",
      width: "300px",
      height: "400px",
      backgroundColor: "white",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      padding: "16px",
      zIndex: 999, // Ensure it appears above other elements
    }}
  >
    <Typography sx={{
        display:"flex",
        justifyContent:"center",
        fontSize:"30px"

    }} >
        Chat 
    </Typography>

<IconButton>
<Box
     
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" />
    </Box>
</IconButton>

  </Paper>
  )
}

export default SendBox
