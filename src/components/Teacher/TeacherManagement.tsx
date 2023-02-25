import { Box, Button, ButtonGroup, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function TeacherManagement() {
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
    
    <Box marginTop='100px' width='80%' marginLeft="100px">
    <Link href='/add-teacher' underline='none'><Button size='medium' variant='contained'> <Typography> Add Teacher </Typography> </Button></Link>
    <Table>
        <TableHead>
            <TableRow>

                <TableCell> <Typography fontSize='24px' align='right'> id </Typography> </TableCell>
                <TableCell> <Typography fontSize='24px' align='right'> Firstname </Typography> </TableCell>
                <TableCell> <Typography fontSize='24px' align='right'> Lastname </Typography> </TableCell>
                <TableCell> <Typography fontSize='24px' align='right'> Private Number </Typography> </TableCell>
                <TableCell> <Typography fontSize='24px' align='right'> Email </Typography> </TableCell>
                <TableCell> <Typography fontSize='24px' align='right'> Birthdate </Typography> </TableCell>
                <TableCell> <Typography fontSize='24px' align='right'> Edit/Delete </Typography> </TableCell>
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
                                <Button> <EditIcon color='info'/> </Button>
                                <Button onClick={() => deleteTeacher(row.id)}> <DeleteIcon color='error'/></Button>
                            </ButtonGroup>
                        </TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
    </Table>
    </Box>
  )
}

export default TeacherManagement