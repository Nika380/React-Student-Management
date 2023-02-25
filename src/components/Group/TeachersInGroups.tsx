import { TableBody, TableRow, TableCell, Typography, ButtonGroup, Button, TableHead } from '@mui/material';
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateTeacher from '../Teacher/UpdateTeacher';
import {Link} from 'react-router-dom';

function TeachersInGroups(props: { groupId: number }) {
    const {groupId} = props;
    const [teachers, setTeachers] = useState<{ id: number; firstName: string; lastName: string; email: string; birthDate: string; privateNumber: string; groupId: number }[]>([]);
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const url = "http://localhost:8080/teachers";
  
    useEffect(() => {
        fetch(`${url}?groupId=${groupId}`)
          .then(res => res.json())
          .then(data => setTeachers(data))
          .catch(error => console.log(error));
      }, [shouldRefresh, props.groupId]);
    
      async function deleteTeacher(id: number) {
        setShouldRefresh(false);
        console.log(id);
        try {
          const response = await fetch(`http://localhost:8080/teachers/${id}/${groupId}`, {
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
        <TableRow>
        <TableCell align='right'>id</TableCell>
        <TableCell align='right'>Firstname</TableCell>
        <TableCell align='right'>Lastname</TableCell>
        <TableCell align='right'>Private Number</TableCell>
        <TableCell align='right'>Email</TableCell>
        <TableCell align='right'>Birthdate</TableCell>
        <TableCell align='right'>Edit/Delete</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
    {teachers.map(row => {
        return (
            <TableRow key={row.id}>
                <TableCell> <Typography fontSize="16px" align='right'> {row.id} </Typography> </TableCell>
                <TableCell> <Typography fontSize="16px" align='right'> {row.firstName} </Typography> </TableCell>
                <TableCell> <Typography fontSize="16px" align='right'> {row.lastName} </Typography> </TableCell>
                <TableCell> <Typography fontSize="16px" align='right'> {row.privateNumber} </Typography> </TableCell>
                <TableCell> <Typography fontSize="16px" align='right'> {row.email} </Typography> </TableCell>
                <TableCell> <Typography fontSize="16px" align='right'> {row.birthDate} </Typography> </TableCell>
                <TableCell align='right'>
                    <ButtonGroup>
                    <Link to={`/update-teacher/${row.id}`}><Button onClick={() => <UpdateTeacher id={row.id} />} ><EditIcon color='info'/></Button></Link>
                        <Button onClick={() => deleteTeacher(row.id)}> <DeleteIcon color='error'/></Button>
                    </ButtonGroup>
                </TableCell>
            </TableRow>
        )
    })}
</TableBody></>
  )
}

export default TeachersInGroups