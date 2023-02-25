import { TableBody, TableRow, TableCell, Button, TableHead } from '@mui/material';
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateStudent from '../Student/UpdateStudent';
import {Link} from 'react-router-dom'

function StudentsInGroups(props: { groupId: number }) {
  const { groupId } = props;

  const [students, setStudents] = useState<{ id: number; firstName: string; lastName: string; email: string; birthDate: string; privateNumber: string; groupId: number }[]>([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const url = "http://localhost:8080/students";

  

  useEffect(() => {
    fetch(`${url}?groupId=${groupId}`)
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(error => console.log(error));
  }, [shouldRefresh, groupId]);

  async function deleteStudent(id: number) {
    setShouldRefresh(false);
    console.log(id);
    try {
      const response = await fetch(`http://localhost:8080/students/${id}/${groupId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setShouldRefresh(true);
      }
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <>
      <TableHead>
        <TableCell align='right'>id</TableCell>
        <TableCell align='right'>Firstname</TableCell>
        <TableCell align='right'>Lastname</TableCell>
        <TableCell align='right'>Private Number</TableCell>
        <TableCell align='right'>Email</TableCell>
        <TableCell align='right'>Birthdate</TableCell>
        <TableCell align='right'>Edit/Delete</TableCell>
      </TableHead>
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
    </>
  )
}

export default StudentsInGroups;
