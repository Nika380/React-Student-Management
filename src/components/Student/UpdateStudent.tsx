import { Box, Stack, TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function UpdateStudent(props: any) {

    const { id } = useParams();
        console.log(id);

    useEffect(() => {
        fetch(`http://localhost:8080/students/${id}`)
          .then(res => {
            return res.json();
          })
          .then(data => {
            setFirstname(data.firstName);
            setBirthDate(data.birthDate);
            setLasttname(data.lastName);
            setEmail(data.email);
            setPrivateNumber(data.privateNumber);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
      

    const [firstName, setFirstname] = useState('');
    const [lastName, setLasttname] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [privateNumber, setPrivateNumber] = useState('');


    const updateStudentInfo = (e: { preventDefault: () => void; }) => {
        const student = {
            firstName,
            lastName,
            email,
            birthDate,
            privateNumber
        }
        fetch(`http://localhost:8080/students/${id}/update`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            alert(student.firstName + " " + student.lastName + " Info Updated")
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }


  return (
    <Box  width='500px' margin="auto" marginTop='100px' sx={{border: 1, borderColor: "secondary.main", borderRadius: '10px'}} padding='20px'>
        <Stack spacing={2}>
        <TextField label='Firstname' onChange={(e) => setFirstname(e.target.value)} value={firstName}/>
        <TextField label="Lastname" onChange={(e) => setLasttname(e.target.value)} value={lastName}></TextField>
        <TextField label="Email" onChange={(e) => setEmail(e.target.value)} value={email}></TextField>
        <TextField label="Private Number" onChange={(e) => setPrivateNumber(e.target.value)} value={privateNumber}></TextField>
        <TextField  onChange={(e) => setBirthDate(e.target.value)} type='date' value={birthDate}></TextField>
    </Stack>
    <Stack spacing={6} direction='row' marginTop="20px" marginLeft="20%">
        <Button variant='contained' color='success' onClick={updateStudentInfo}>Submit</Button>
        <Button variant='contained' color='error'>Cancel</Button>
    </Stack>
    </Box>
  )
}

export default UpdateStudent
