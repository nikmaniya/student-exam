import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Alert, Grid, MenuItem, Select, TextField } from '@mui/material';
import lsu from '../Services/LocalStorageUtilsService';
import { v4 as uuidv4 } from 'uuid';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddUpdate(props) {
    const isEdit = !!props.objSelectedStudent;
    const [objStudent, setObjStudent] = React.useState(props.objSelectedStudent || {
        name: "",
        age: 0,
        phoneNo: "",
        email: "",
        sex: "",
        gurdianName: "",
        place: "",
        address: ""
    });
    const [isValid, setValid] = React.useState(true);




    const register = (fieldkey) => {
        return { value: objStudent[fieldkey], onChange: (e) => setObjStudent({ ...objStudent, [fieldkey]: e.target.value }) }
    }

    const onSubmit = () => {
        for (const key in objStudent) {
            if (!objStudent[key]) {
                setValid(false)
                return;
            }
        }


        const lstStudent = lsu.lsGet("STUDENTS") || [];
        if (isEdit) {
            const updatedList = lstStudent.map(item => {
                if (item.id === objStudent.id) {
                    return objStudent
                }
                return item
            })
            lsu.lsSet("STUDENTS", updatedList)
        }
        else {
            // add Student into local Storage
            if (lstStudent?.length > 0) {
                lstStudent.push({ ...objStudent, id: uuidv4() })
                lsu.lsSet("STUDENTS", lstStudent)
            }
            else {
                lsu.lsSet("STUDENTS", [{ ...objStudent, id: uuidv4() }])
            }
        }

        // props onComplete
        setObjStudent({})
        props.onAddUpdateComplete()

    }

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.toggleModal}
            maxWidth="md"
        >
            <DialogTitle>{isEdit ? "Edit Student" : "Add New Student"}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item xs={6}>
                        <TextField {...register("name")} fullWidth label="Name *" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField {...register("age")} fullWidth label="Age *" type="number" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField {...register("phoneNo")} fullWidth label="Phone No *" type="number" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField {...register("email")} fullWidth label="Email *" type="email" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField {...register("gurdianName")} fullWidth label="Guardian Name *" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField {...register("place")} fullWidth label="Place *" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            {...register("sex")}
                            displayEmpty
                            fullWidth
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>

                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField {...register("address")} fullWidth label="Address *" variant="outlined" />
                    </Grid>
                    {!isValid &&
                        <Grid item xs={12}>
                            <Alert severity="error">Please enter required field.</Alert>
                        </Grid>
                    }
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.toggleModal}>Cancle</Button>
                <Button onClick={onSubmit} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>

    );
}