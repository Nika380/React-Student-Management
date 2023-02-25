import { Box, Stack, TextField, Button } from '@mui/material';
import React, { useState } from 'react'

function AddTeacher() {
    const [firstName, setFirstname] = useState('');
    const [lastName, setLasttname] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [privateNumber, setPrivateNumber] = useState('');

    const saveTeacherInfo = (e: { preventDefault: () => void; }) => {
        const teacher = {
            firstName,
            lastName,
            email,
            birthDate,
            privateNumber
        }
        fetch('http://localhost:8080/teachers/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(teacher)
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            alert(teacher.firstName + " " + teacher.lastName + " Added To Database")
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }


  return (
    <Box  width='500px' margin="auto" marginTop='100px' sx={{border: 1, borderColor: "secondary.main", borderRadius: '10px'}} padding='20px'>
        <Stack spacing={2}>
        <TextField label='Firstname' onChange={(e) => setFirstname(e.target.value)}/>
        <TextField label="Lastname" onChange={(e) => setLasttname(e.target.value)}></TextField>
        <TextField label="Email" onChange={(e) => setEmail(e.target.value)}></TextField>
        <TextField label="Private Number" onChange={(e) => setPrivateNumber(e.target.value)}></TextField>
        <TextField  onChange={(e) => setBirthDate(e.target.value)} type='date'></TextField>
    </Stack>
    <Stack spacing={6} direction='row' marginTop="20px" marginLeft="20%">
        <Button variant='contained' color='success' onClick={saveTeacherInfo}>Submit</Button>
        <Button variant='contained' color='error'>Cancel</Button>
    </Stack>
    </Box>
  )
}

export default AddTeacher