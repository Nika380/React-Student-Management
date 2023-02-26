import { Box, Button,Typography} from '@mui/material'
import {Link} from 'react-router-dom';
import GroupList from './GroupList';

function GroupManagement() {
  

  return (
    
    <Box marginTop='100px' width='80%' marginLeft="100px" position='relative'>
    <Link to='/create-group' style={{textDecoration: 'none'}}><Button size='medium' variant='contained'> <Typography> Create New Group </Typography> </Button></Link>
        <GroupList />
    </Box>
  )
}

export default GroupManagement

