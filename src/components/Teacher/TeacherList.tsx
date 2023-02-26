import { TableBody, TableRow, TableCell, Typography, ButtonGroup, Button, TableHead, Table, Stack, TextField} from '@mui/material';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateTeacher from './UpdateTeacher';

function TeacherList() {

  const filter = () => {
    const urlParams = new URLSearchParams({
      firstName: filters.firstName,
      lastName: filters.lastName,
      privateNumber: filters.privateNumber,
      birthDate: filters.birthDate
    });
  
    const newTeacherUrl = `http://localhost:8080/teachers?${urlParams.toString()}`;
    setTeacherUrl(newTeacherUrl);
    fetch(newTeacherUrl)
    .then(res => res.json())
    .then(data => setTeachers(data))
    .catch(error => console.log(error));
  }
  
  const [teacherUrl, setTeacherUrl] = useState("http://localhost:8080/teachers?");

  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    privateNumber:'',
    birthDate:''
  }
  )

    const [teachers, setTeachers] = useState<{ id: number; firstName: string; lastName: string; email: string; birthDate: string; privateNumber: string; }[]>([]);
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const url = teacherUrl;
  
    useEffect(() => {
      fetch(url)
        .then(res => res.json())
        .then(data => setTeachers(data))
        .catch(error => console.log(error));
    }, [shouldRefresh]); 
  
    async function deleteTeacher(id: number) {
        setShouldRefresh(false);
      try {
        const response = await fetch(`http://localhost:8080/teachers/${id}/delete`, {
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
    <Typography variant='h3' margin="20px 0 20px 40%">Teacher List</Typography>
    <Typography marginTop="20px" variant='h5'>Filter</Typography>
    <Stack direction={'row'} height="40px" spacing={3} margin="30px 0px">
      <TextField label="Firstame" value={filters.firstName} onChange={(e) => { setFilters({...filters, firstName: e.target.value})}}/>
      <TextField label="Lastname" value={filters.lastName} onChange={(e) => setFilters({...filters, lastName: e.target.value})}/>
      <TextField label="Private Number" value={filters.privateNumber} onChange={(e) => setFilters({...filters, privateNumber: e.target.value})} />
      <TextField type="date" value={filters.birthDate} onChange={(e) => setFilters({...filters, birthDate: e.target.value})}  />
      <Button variant='contained' color='primary' onClick={() => filter()}>Filter Data</Button>
    </Stack>
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
                    <Link to={`/update-teacher/${row.id}`}><Button onClick={() => <UpdateTeacher id={row.id} />} ><EditIcon color='info'/></Button></Link>
                        <Button onClick={() => deleteTeacher(row.id)}> <DeleteIcon color='error'/></Button>
                    </ButtonGroup>
                </TableCell>
            </TableRow>
        )
    })}
</TableBody>
</Table>
</>
  )
}

export default TeacherList