import { Box, Button, Link, Typography } from '@mui/material'

import TeacherList from './TeacherList';

function TeacherManagement() {
 
  return (
    
    <Box marginTop='100px' width='80%' marginLeft="100px">
    <Link href='/add-teacher' underline='none'><Button size='medium' variant='contained'> <Typography> Add Teacher </Typography> </Button></Link>
      <TeacherList />
    </Box>
  )
}

export default TeacherManagement