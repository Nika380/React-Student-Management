import { Typography, Table, TableHead, TableBody, TableRow, TableCell,Box, ButtonGroup, Button } from '@mui/material'
import { useState, useEffect} from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from '@mui/material';
import StudentList from './StudentList';

function StudentManagement() {


    


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
            <StudentList />
    </Table>
    </Box>
  )
}

export default StudentManagement