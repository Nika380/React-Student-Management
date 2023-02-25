import { TableBody, TableRow, TableCell, Typography, ButtonGroup, Button} from '@mui/material';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateTeacher from './UpdateTeacher';

function TeacherList() {
    const [teachers, setTeachers] = useState<{ id: number; firstName: string; lastName: string; email: string; birthDate: string; privateNumber: string; }[]>([]);
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const url = "http://localhost:8080/teachers";
  
    useEffect(() => {
      fetch(url)
        .then(res => res.json())
        .then(data => setTeachers(data))
        .catch(error => console.log(error));
    }, [shouldRefresh]); // add shouldRefresh to the dependency array
  
    async function deleteTeacher(id: number) {
        setShouldRefresh(false);
      try {
        const response = await fetch(`http://localhost:8080/teachers/${id}/delete`, {
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
</TableBody>
  )
}

export default TeacherList