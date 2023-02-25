import { Box, Button, ButtonGroup, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import FilterUi from '../FilterUi';

import TeacherList from './TeacherList';

function TeacherManagement() {
 
  return (
    
    <Box marginTop='100px' width='80%' marginLeft="100px">
    <Link href='/add-teacher' underline='none'><Button size='medium' variant='contained'> <Typography> Add Teacher </Typography> </Button></Link>
    <FilterUi />
    <Typography variant='h3' margin="20px 0 20px 40%">Teacher List</Typography>
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
       <TeacherList />
    </Table>
    </Box>
  )
}

export default TeacherManagement