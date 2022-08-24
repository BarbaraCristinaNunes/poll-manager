import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { updateOptionScore, getOptionsByPollId } from '../../../crud';
import {checkVote, getTotalVotes} from '../../Operations';

export function Option(props) {
    const [score, setScore] = React.useState(props.option.score);
    const [checkStatus, setCheckStatus] = React.useState(checkVote(props.option.id, "optionId"));
    // checkStatus keep user's option cheked after he/she votes
    
    React.useEffect(() => {
        const getOption = setInterval(() => {
            getOptionsByPollId(props.pollId)
                .then((data) => {
                    let options = [... props.options];
                    let dataOption = data.find((element) => {return element.id === props.option.id});
                    options.map((option) => {
                        if(option.id === props.option.id){
                            option.score = dataOption.score;
                        }
                        return option;
                    })
                    props.setOptions(options);
                    props.setVotes(getTotalVotes(data));
                    setScore(dataOption.score);
                })
        }, 60000);
        return () => clearInterval(getOption);
    }, [score]);

    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{backgroundColor: "#ffffff", padding: 2}}
        >
            <Grid
                item
                lg={11}
                xs={11}
            >
                <FormGroup>
                    <FormControlLabel 
                        disabled={props.ableStatus}
                        checked={checkStatus}
                        control={<Checkbox />} 
                        label={props.option.label} 
                        onClick={(v) => {
                            if(!props.ableStatus){
                                updateOptionScore(props.option.id, props.pollId)
                                    .then((responde) => {
                                        console.log("responde ", responde)
                                        if(responde){
                                            const vote = score + 1;
                                            const totalVotes = props.votes + 1;
                                            setCheckStatus(true);
                                            setScore(vote);
                                            props.setVotes(totalVotes);
        
                                            const userOption = {optionId: props.option.id, pollId: props.option.pollid};
                                            const userVotes = JSON.parse(localStorage.getItem("votes").slice(","));
                                            userVotes.push(userOption);
                                            localStorage.setItem("votes", JSON.stringify(userVotes));
                                        }else{
                                            props.setError("Essa enquete foi finalizada! Portanto, seu voto não foi contabilizado!");
                                        }
                                    })                              
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
                <Typography>{score}</Typography>
            </Grid>
        </Grid>
    )
}