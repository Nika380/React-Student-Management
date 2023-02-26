import { Box, Button, Table, TableHead, TableCell, Typography, TableBody, Tabs, Tab, Stack, TextField } from '@mui/material';
import { height } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import StudentsInGroups from './StudentsInGroups';
import TeachersInGroups from './TeachersInGroups';

function GroupList() {


    const filter = () => {
        setShouldRefresh(false);
        const urlSearchParams = new URLSearchParams({
            groupId: filters.groupId
        })
        const newGroupUrl = `http://localhost:8080/groups?${urlSearchParams.toString()}`;
        setGroupUrl(newGroupUrl);
        fetch(groupUrl)
        .then(res => res.json())
        .then(data => setGroups(data))
        .catch(error => console.log(error));
        setShouldRefresh(true);
    }

    const [groupUrl, setGroupUrl] = useState('http://localhost:8080/groups?');
    const [shouldRefresh, setShouldRefresh] = useState(false);


    const [groups, setGroups] = useState<{ id: number; groupName: string; }[]>([]);
        const url = groupUrl;
      
    const [filters, setFilters] = useState({
        groupId: ''
    });

        useEffect(() => {
          fetch(url)
            .then(res => res.json())
            .then(data => setGroups(data))
            .catch(error => console.log(error));
        }, [shouldRefresh]); 
      
       
    
        const [selectedTab, setSelectedTab] = useState('students');

        function handleTabChange(event: React.SyntheticEvent, newValue: string) {
          setSelectedTab(newValue);
        }

        async function deleteGroup(id: number) {
            setShouldRefresh(false);
          try {
            const response = await fetch(`http://localhost:8080/groups/${id}/delete`, {
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
    <Typography variant='h5' margin="20px">Filter By Group Id</Typography>
    <Stack direction='row' spacing={5}>
        <TextField value={filters.groupId} sx={{width: "200px"}} onChange={(e) => setFilters({...filters, groupId: e.target.value})}
            label="Type Id Of Group" placeholder='Ex: 4'
        />
        <Button variant='contained' color="info" onClick={() => filter()}> Filter Data </Button>
    </Stack>
    {groups.map(group => {
        return (
        <Box width='100%' justifyContent='center'  sx={{border: 1, borderColor: "secondary.main", borderRadius: '10px'}} margin="20px auto" position='relative' display="inline-block">
              <Stack direction="row" height="50px" margin="20px" spacing={3}>
              <Link to={`/update-group/${group.id}`} style={{textDecoration: 'none', height:"50px"}}> <Button variant='outlined'>Edit Data</Button> </Link>
            <Button variant='outlined' color='error' sx={{height: "35px"}} onClick={() => deleteGroup(group.id)} size="small">Delete Group</Button>
              </Stack>
          
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
     </>

)
}

export default GroupList