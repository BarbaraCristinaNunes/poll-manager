import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { updateOptionScore, getOptionById } from '../../../crud';
import {checkVote} from '../../Operations';

export function Option(props) {
    const [socre, setScore] = React.useState(props.option.score);
    const [checkStatus, setCheckStatus] = React.useState(checkVote(props.option.id, "optionId"));
    // checkStatus keep user's option cheked after he/she votes

    React.useEffect(() => {
        const getOption = setInterval(() => {
            getOptionById(props.option.id)
            .then((data) => {
                console.log(data.score)
                setScore(data.score);
            })
        }, 500);
        return () => clearInterval(getOption);
    }, [socre]);

    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{backgroundColor: "#ffffff"}}
        >
            <Grid
                item
                lg={"auto"}
                xs={"auto"}
            >
                <FormGroup sx={{marginLeft: 3}}>
                    <FormControlLabel 
                        disabled={props.ableStatus}
                        checked={checkStatus}
                        control={<Checkbox />} 
                        label={props.option.label} 
                        onClick={(v) => {
                            if(!props.ableStatus){
                                // const vote = socre + 1;
                                // const totalVotes = props.votes + 1;
                                // setCheckStatus(true);
                                // setScore(vote);
                                // props.setVote(totalVotes);
                                updateOptionScore(props.option.id)
                                
                                const userOption = {optionId: props.option.id, pollId: props.option.pollid};
                                const userVotes = JSON.parse(localStorage.getItem("votes").slice(","));
                                userVotes.push(userOption);
                                // localStorage.setItem("votes", JSON.stringify(userVotes));
                            }
                        }}
                    />
                </FormGroup>
            </Grid>
            <Grid
                item
                lg={1}
                xs={1}
            >
                <Typography>{socre}</Typography>
            </Grid>
            
        </Grid>
    )
}