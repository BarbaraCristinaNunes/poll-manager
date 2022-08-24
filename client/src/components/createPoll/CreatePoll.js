import * as React from 'react';
import {
    IconButton,
    FormControl,
    Grid,
    TextField,
} from "@mui/material";
import PollDate from './PollDate';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SavePoll from './SavePoll';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function CreatePoll(props){
    const [title, setTitle] = React.useState("");
    const [start, setStart] = React.useState("");
    const [end, setEnd] = React.useState("");
    const [options, setOptions] = React.useState([
        "",
        "",
        ""
    ]);
    const [validTitle, setValidTitle] = React.useState(true);
    const [validOption, setValidOption] = React.useState(true);
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{maxWidth: 600, backgroundColor: "#ffffff", padding: 2}}
        >
            <Grid 
                item
                lg={12}
                xs={12}
                sx={{marginBottom: 2}}
            >
                <FormControl fullWidth>
                    <TextField
                        label="Title"
                        variant="outlined"
                        type="string"
                        color={!validTitle? "error" : "primary"} 
                        focused
                        values={title}
                        onChange={(v) => {
                            setTitle(v.target.value)
                            if(!v.target.value){
                                setValidTitle(false)
                            }else{setValidTitle(true)}
                        }}
                        onClick={(v) => {
                            if(!v.target.value){
                                setValidTitle(false)
                            }else{setValidTitle(true)}
                        }}
                        helperText={!validTitle ? "Dê um nome para sua enquete" : ''}
                    />
                </FormControl>
            </Grid>
            <Grid 
                item
                lg={12}
                xs={12}
            >
                <PollDate
                    start={start}
                    setStart={(v) => {setStart(v)}}
                    end={end}
                    setEnd={(v) => {setEnd(v)}}
                />
            </Grid>
            {
                options.map((option, index) => {

                    return (                        
                        <>
                            <Grid 
                                item
                                lg={10}
                                xs={10}
                                sx={{marginTop: 2}}
                                key={`userOption${index}`}
                            >
                                <FormControl fullWidth>
                                    <TextField
                                        label={`Opção ${index + 1}`}
                                        variant="outlined"
                                        type="string"
                                        color={!validOption ? "error" : "primary"} 
                                        helperText={!validOption ? "Crie uma opção para sua enquete" : ''}
                                        value={option}
                                        focused
                                        onChange={(v) => {
                                            let newOptions = [... options];
                                            newOptions[index] = v.target.value;
                                            setOptions(newOptions)
                                            if(!v.target.value){
                                                setValidOption(false)
                                            }else{setValidOption(true)}
                                        }}
                                        onClick={(v) => {
                                            if(!v.target.value){
                                                setValidOption(false)
                                            }else{setValidOption(true)}
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            {
                                index > 2 ?
                                <Grid 
                                    item
                                    lg={"auto"}
                                    xs={"auto"}
                                    sx={{marginTop: 2, marginRight: -5}}
                                >
                                    <IconButton
                                        onClick={(v) => {
                                            let newOptions = options.filter((option, i) => {
                                                return i !== index
                                            });
                                            setOptions(newOptions);
                                        }}
                                    >
                                        <HighlightOffIcon color="primary"/>
                                    </IconButton>
                                </Grid>
                                : ""
                            }
                        </>
                        
                    )
                })
            }
            <Grid 
                item
                lg={12}
                xs={12}
                sx={{textAlign: "center", margin: 2}}
            >
                <IconButton
                    onClick={(v) => {
                        let newOptions = [... options];
                        newOptions.push("");
                        setOptions(newOptions);
                    }}
                >
                    <AddCircleIcon color="primary"/>
                </IconButton>
            </Grid>
            <Grid 
                item
                lg={12}
                xs={12}
                sx={{textAlign: "center", marginBottom: 2}}
            >
                <SavePoll
                    title={title}
                    start={start}
                    end={end}
                    options={options}
                    setNewPoll={(v) => {props.setNewPoll(v)}}
                    setPolls={props.setPolls}
                    polls={props.polls}
                    page={props.page}
                    setMaxPage={props.setMaxPage}
                />
            </Grid>
        </Grid>

    )
}
