import { Box, Button, ButtonGroup, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';

function GroupManagement() {
  const [groups, setGroups] = useState<{ id: number; groupName: string; }[]>([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);
        const url = "http://localhost:8080/groups";
      
        useEffect(() => {
          fetch(url)
            .then(res => res.json())
            .then(data => setGroups(data))
            .catch(error => console.log(error));
        }, [shouldRefresh]); // add shouldRefresh to the dependency array
      
        async function deleteStudent(id: number) {
            setShouldRefresh(false);
          try {
            const response = await fetch(`http://localhost:8080/groups/${id}/delete`, {
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
    <Link href='/add-student' underline='none'><Button size='medium' variant='contained'> <Typography> Add Student </Typography> </Button></Link>
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
          
        </TableBody>
    </Table>
    </Box>
  )
}

export default GroupManagement

