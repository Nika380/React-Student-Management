import { Typography,Box,Button,} from '@mui/material'
import { useState, useEffect} from 'react'
import { Link } from '@mui/material';
import StudentList from './StudentList';

function StudentManagement() {

  
  return (
    
    <Box marginTop='100px' width='80%' marginLeft="100px">
    <Link href='/add-student' underline='none'><Button size='medium' variant='contained'> <Typography> Add Student </Typography> </Button></Link>
     <StudentList />
    </Box>
  )
}

export default StudentManagement