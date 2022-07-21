import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import { Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddUpdate from './Components/AddUpdate';
import lsu from './Services/LocalStorageUtilsService';


function App() {
  const [isStudentAdd, setIsStudentAdd] = React.useState(false)
  const [objSelectedStudent, setObjSelectedStudent] = React.useState()
  const [lstStudent, setLstStudent] = React.useState([])
  const toggleIsStudentAdd = () => {
    setIsStudentAdd(!isStudentAdd)
  }

  React.useEffect(() => {
    const newLstStudent = lsu.lsGet("STUDENTS") || []
    setLstStudent(newLstStudent)
  }, [])


  const onAddUpdateComplete = () => {
    toggleIsStudentAdd()
    const newLstStudent = lsu.lsGet("STUDENTS") || []
    setLstStudent(newLstStudent)
  }

  const onDelete = (id) => {
    const isResult = window.confirm("Are you sure want to delete?")
    if (!isResult)
      return;
    const updatedList = lstStudent.filter(item => item.id !== id)
    lsu.lsSet("STUDENTS", updatedList)
    setLstStudent(updatedList)
  }

  return (
    <div className="App">
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Grid container sx={{ py: 2 }}>
          <Grid item xs={12} >
            <Button variant="contained" onClick={() => setIsStudentAdd(true)}>New Student</Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper} elevation={5}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">Phone No.</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Sex</TableCell>
                <TableCell align="right">Gardian Name</TableCell>
                <TableCell align="right">Place</TableCell>
                <TableCell align="right">Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lstStudent.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <EditIcon onClick={() => { setObjSelectedStudent(row); toggleIsStudentAdd() }} />
                    <DeleteIcon onClick={() => { onDelete(row.id) }} />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.age}</TableCell>
                  <TableCell align="right">{row.phoneNo}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.sex}</TableCell>
                  <TableCell align="right">{row.gurdianName}</TableCell>
                  <TableCell align="right">{row.place}</TableCell>
                  <TableCell align="right">{row.address}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {isStudentAdd &&
          <AddUpdate
            open={isStudentAdd}
            objSelectedStudent={objSelectedStudent}
            toggleModal={toggleIsStudentAdd}
            onAddUpdateComplete={onAddUpdateComplete}
          />
        }
      </Container>
    </div>
  );
}

export default App;

