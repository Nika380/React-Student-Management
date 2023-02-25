import { Box, Stack, TextField, Button } from '@mui/material';
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UpdateGroup(props: any) {
  const { id } = useParams();
        console.log(id);

        useEffect(() => {
          fetch(`http://localhost:8080/groups/${id}`)
            .then(res => {
              return res.json();
            })
            .then(data => {
              if (data.students && data.teachers) {
                const studentId = data.students.map((st: { id: any; }) => st.id);
                const teacherId = data.teachers.map((teach: {id: any}) => teach.id)
                setGroupName(data.groupName);
                setStudents(studentId.join(","));
                setTeachers(teacherId.join(","));
              }
            })
            .catch(error => {
              console.log(error);
            });
        }, [id]);
        
      
      const [groupName, setGroupName] = useState('');
      const [students, setStudents] = useState('');
      const [teachers, setTeachers] = useState('');
      const [studentIds, setStudentIds] = useState("");
      const [teacherIds, setTeacherIds] = useState("");
    
      console.log("Students: " + students);
      console.log("Teachers" + teachers);


      const updateGroupInfo = (e: { preventDefault: () => void; }) => {
        const studentIdArray = students.split(",");
        const teacherIdArray = teachers.split(",");
      
        // Create the data object with the input values and ID arrays
        const group = {
          groupName: groupName,
          students: studentIdArray.map((id: any) => ({ id })),
          teachers: teacherIdArray.map((id: any) => ({ id })),
        }
          fetch(`http://localhost:8080/groups/${id}/update`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(group)
            })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
              alert(groupName + " Info Updated")
            })
            .catch((error) => {
              console.error('Error:', error);
            });
      }

  
  return (
    <Box  width='500px' margin="auto" marginTop='100px' sx={{border: 1, borderColor: "secondary.main", borderRadius: '10px'}} padding='20px'>
        <Stack spacing={2}>
        <TextField label="Group Name" onChange={(e) => setGroupName(e.target.value)} value={groupName}/>
        <TextField label="Student id's" onChange={(e) => setStudents(e.target.value)} value={students} />
        <TextField label="Teacher id's" onChange={(e) => setTeachers(e.target.value)} value={teachers} />

    </Stack>
    <Stack spacing={6} direction='row' marginTop="20px" marginLeft="20%">
        <Button variant='contained' color='success' onClick={updateGroupInfo}>Submit</Button>
        <Button variant='contained' color='error'>Cancel</Button>
    </Stack>
    </Box>
  )
}

export default UpdateGroup