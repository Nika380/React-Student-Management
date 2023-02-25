import { TableRow, TableCell, Typography, ButtonGroup, Button, TableBody } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateStudent from './UpdateStudent';
import {Link} from 'react-router-dom'


const StudentList = () => {
    const [students, setStudents] = useState<{ id: number; firstName: string; lastName: string; email: string; birthDate: string; privateNumber: string; }[]>([]);
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const url = "http://localhost:8080/students";
  
    useEffect(() => {
      fetch(url)
        .then(res => res.json())
        .then(data => setStudents(data))
        .catch(error => console.log(error));
    }, [shouldRefresh]); // add shouldRefresh to the dependency array
  
    async function deleteStudent(id: number) {
        setShouldRefresh(false);
        console.log(id);
      try {
        const response = await fetch(`http://localhost:8080/students/${id}/delete`, {
          method: 'DELETE'
        });
  
        if (response.ok) {
          // if the delete request was successful, refresh the data
          setShouldRefresh(true);
        }
      } catch(error) {
        console.log(error);
      }
    }
  return (
    <TableBody>
        {students.map(row => {
          return (
            <TableRow key={row.id}>
              <TableCell align='right'>{row.id}</TableCell>
              <TableCell align='right'> {row.firstName} </TableCell>
              <TableCell align='right'> {row.lastName} </TableCell>
              <TableCell align='right'> {row.privateNumber} </TableCell>
              <TableCell align='right'> {row.email} </TableCell>
              <TableCell align='right'> {row.birthDate} </TableCell>
              <TableCell align='right'> 
              <Link to={`/update-student/${row.id}`}><Button variant='outlined' onClick={() => <UpdateStudent id={row.id} />} ><EditIcon color='info'/></Button></Link>
                <Button variant='outlined' onClick={() => deleteStudent(row.id)}><DeleteIcon color='error'/></Button>
              </TableCell>
            </TableRow>
          )
        })}
    </TableBody>
    
  )
}


export default StudentList;
