import * as React from 'react';
import {
    Grid,
    TextField,
} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';

export default function PollDate(props) {
    const [validStart, setValidStart] = React.useState(true);
    const [validEnd, setValidEnd] = React.useState(true);
    const message = (string1, string2, operator) => {
        return `A data de ${string1} deve ser ${operator} que a da data de ${string2}.`
    }

    return (            
        
        <Grid
            container 
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={8}
        >
            <Grid 
                item
                lg={6}
                xs={6}
            >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label="Início"
                        value={props.start}
                        disablePast={true}
                        inputFormat="dd/MM/yyyy HH:mm"
                        onChange={(newValue) => {
                            if(props.end === "" || newValue.getTime() < props.end.getTime()){
                                setValidStart(true);
                                props.setStart(newValue);
                            }else{
                                setValidStart(false);
                            }
                                
                        }}
                        renderInput={(params) => 
                        <TextField 
                            color={"primary"}
                            focused 
                            {...params} 
                            inputProps={
                                { 
                                    ...params.inputProps, 
                                    placeholder: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`, 
                                }
                            }
                            helperText={!validStart ? message("início", "fim", "menor") : ''}
                        />
                    }
                    />
                </LocalizationProvider>
            </Grid>
            <Grid 
                item
                lg={6}
                xs={6}
            >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label={props.start === "" ? "" : "Fim"}
                        value={props.end}
                        disablePast={true}
                        disabled={props.start === "" ? true : false}
                        inputFormat="dd/MM/yyyy HH:mm"
                        onChange={(newValue) => {
                            if(newValue.getTime() > props.start.getTime()){
                                setValidEnd(true);
                                props.setEnd(newValue);
                            }else{
                                setValidEnd(false);
                            }

                        }}
                        renderInput={(params) => 
                            <TextField 
                                color={"primary"} 
                                focused 
                                {...params} 
                                inputProps={
                                    { 
                                        ...params.inputProps, 
                                        placeholder:  `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
                                    }
                                }
                                helperText={!validEnd ? message("fim", "início", "maior") : ''}
                            />
                        }
                    />
                </LocalizationProvider>
            </Grid>
        </Grid>
        
    )
}