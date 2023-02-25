import { Typography, Stack, TextField, Button } from '@mui/material'
import React from 'react'

function FilterUi() {
  return (
    <>
    <Typography marginTop="20px" variant='h5'>Filter</Typography>
    <Stack direction={'row'} height="40px" spacing={3} margin="30px 0px">
      <TextField label="Firstame"/>
      <TextField label="Lastname"/>
      <TextField label="Private Number"/>
      <TextField type="date"/>
      <Button variant='contained' color='primary'>Filter Data</Button>
    </Stack>
    </>
  )
}

export default FilterUi