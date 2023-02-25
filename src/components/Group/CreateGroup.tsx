import { Box, TextField, Button, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';

function CreateGroup() {
  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [studentIds, setStudentIds] = useState("");
  const [teacherIds, setTeacherIds] = useState("");
  const url = "http://localhost:8080/groups/add-group";

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    // Split the input string into an array of IDs
    const studentIdArray = studentIds.split(",");
    const teacherIdArray = teacherIds.split(",");

    // Create the data object with the input values and ID arrays
    const data = {
      groupName: groupName,
      students: studentIdArray.map((id: any) => ({ id })),
      teachers: teacherIdArray.map((id: any) => ({ id })),
    };

    // Send the POST request with the data object
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Group created successfully");
          alert("Group " + groupName + " Created Successfully")
        } else {
          console.error("Error creating group");
        }
      })
      .catch((error) => {
        console.error("Error creating group", error);
      });
  };
  return (
    
    <Box width='500px' margin="auto" marginTop='100px' sx={{border: 1, borderColor: "secondary.main", borderRadius: '10px'}} padding='20px'>
      <Typography marginLeft="20%" variant="h5">Create New Group</Typography>
      <Stack spacing={4} marginTop='30px'>
        <TextField label="Group Name" onChange={(e) => setGroupName(e.target.value)}/>
        <TextField label="Students" helperText="Write id's of Students you want to add use commas separate info" placeholder='Ex: 1, 4, 5, 2, 7'
        onChange={(e) => setStudentIds(e.target.value)}/>
        <TextField label="Teachers" helperText="Write id's of Teachers you want to add use commas separate info" placeholder='Ex: 1, 4, 5, 2, 7'
        onChange={(e) => setTeacherIds(e.target.value)}/>
      </Stack>
      <Stack direction='row' spacing={5} margin="20px 0 20px 20%">
        <Link href='/group-management' underline='none'> <Button variant='contained' color='success' onClick={handleSubmit}>Submit</Button> </Link>
        <Link href='/group-management' underline='none'> <Button variant='contained' color='error'>Cancel</Button> </Link>

      </Stack>
    </Box>
  )
}

export default CreateGroup

