import { Box, Button, ButtonGroup,  Table, TableBody, TableCell, TableHead, TableRow, Typography, Tabs, Tab } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import StudentList from '../Student/StudentList';
import { Stack } from '@mui/system';
import StudentsInGroups from './StudentsInGroups';
import TeachersInGroups from './TeachersInGroups';
import {Link} from 'react-router-dom';

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
    
        const [selectedTab, setSelectedTab] = useState('students');

        function handleTabChange(event: React.SyntheticEvent, newValue: string) {
        
          setSelectedTab(newValue);
          console.log(selectedTab);
        }

  return (
    
    <Box marginTop='100px' width='80%' marginLeft="100px" position='relative'>
    <Link to='/create-group' style={{textDecoration: 'none'}}><Button size='medium' variant='contained'> <Typography> Create New Group </Typography> </Button></Link>
        {groups.map(group => {
          return (
          <Box width='100%' justifyContent='center'  sx={{border: 1, borderColor: "secondary.main", borderRadius: '10px'}} margin="20px auto" position='relative' display="inline-block">
                <Link to={`/update-group/${group.id}`} style={{textDecoration: 'none', margin:"30px"}}> <Button variant='outlined'>Edit Data</Button> </Link>

            
            <Table>
            <TableHead key={group.id}>
                <TableCell> <Typography fontSize='24px' align='right'>Group id: {group.id} </Typography> </TableCell>
                <TableCell> <Typography fontSize='24px' align='right'>Group Name: {group.groupName} </Typography> </TableCell>
            </TableHead>
            <TableBody>
                <Tabs textColor='primary' value={selectedTab} onChange={handleTabChange}>
                  <Tab value="students" label="Students" />
                  <Tab value="teachers" label="Teachers" />
                </Tabs>
                <Box marginLeft="40%" width="100%">
                  {selectedTab === 'students' ? <StudentsInGroups groupId={group.id}/> : <TeachersInGroups groupId={group.id}/>}
                </Box>
              </TableBody>
          </Table>
          </Box>
          )
        })}
    </Box>
  )
}

export default GroupManagement

