import { TableRow, TableCell, Typography, Button, TableBody, Table, TableHead, Stack, TextField } from '@mui/material'
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateStudent from './UpdateStudent';
import {Link} from 'react-router-dom'


const StudentList = () => {

  const filter = () => {
    const urlParams = new URLSearchParams({
      firstName: filters.firstName,
      lastName: filters.lastName,
      privateNumber: filters.privateNumber,
      birthDate: filters.birthDate
    });
  
    const newStudentUrl = `http://localhost:8080/students?${urlParams.toString()}`;
    setStudentUrl(newStudentUrl);
    fetch(newStudentUrl)
    .then(res => res.json())
    .then(data => {setStudents(data)
    console.log("data: " + data)})
    .catch(error => console.log(error));
    console.log("Url " + newStudentUrl)
  }
  
  const [studentUrl, setStudentUrl] = useState("http://localhost:8080/students?");

  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    privateNumber:'',
    birthDate:''
  }
  )

    const [students, setStudents] = useState<{ id: number; firstName: string; lastName: string; email: string; birthDate: string; privateNumber: string; }[]>([]);
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const url = studentUrl;
  
    useEffect(() => {
      fetch(url)
        .then(res => res.json())
        .then(data => setStudents(data))
        .catch(error => console.log(error));
    }, [shouldRefresh]); 
  
    async function deleteStudent(id: number) {
        setShouldRefresh(false);
        console.log(id);
      try {
        const response = await fetch(`http://localhost:8080/students/${id}/delete`, {
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
    <Typography marginTop="20px" variant='h5'>Filter</Typography>
    <Stack direction={'row'} height="40px" spacing={3} margin="30px 0px">
      <TextField label="Firstame" value={filters.firstName} onChange={(e) => setFilters({...filters, firstName: e.target.value})} />
      <TextField label="Lastname" value={filters.lastName} onChange={(e) => setFilters({...filters, lastName: e.target.value})} />
      <TextField label="Private Number" value={filters.privateNumber} onChange={(e) => setFilters({...filters, privateNumber: e.target.value})} />
      <TextField type="date" value={filters.birthDate} onChange={(e) => setFilters({...filters, birthDate: e.target.value})}  />
      <Button variant='contained' color='primary' onClick={() => filter()}>Filter Data</Button>
    </Stack>
    <Typography variant='h3' margin="20px 0 20px 40%">Student List</Typography>
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
        {students.map(row => {
          return (
            <TableRow key={row.id}>
              <TableCell align='right'>{row.id}</TableCell>
              <TableCell align='right'> {row.firstName} </TableCell>
              <TableCell align='right'> {row.lastName} </TableCell>
              <TableCell align='right'> {row.privateNumber} </TableCell>
              <TableCell align='right'> {row.email} </TableCell>
              <TableCell align='right'> {row.birthDate} </TableCell>
              <TableCell align='right'> 
              <Link to={`/update-student/${row.id}`}><Button variant='outlined' onClick={() => <UpdateStudent id={row.id} />} ><EditIcon color='info'/></Button></Link>
                <Button variant='outlined' onClick={() => deleteStudent(row.id)}><DeleteIcon color='error'/></Button>
              </TableCell>
            </TableRow>
          )
        })}
    </TableBody>
    </Table>
    </>
  )
}


export default StudentList;
