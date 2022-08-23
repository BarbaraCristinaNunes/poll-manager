import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import { getOptionsByPollId, getPollById, getTotalVotes } from '../../../crud';
import {Option} from './Option';
import {checkVote, convertDateFormat} from '../../Operations';

export function Poll(props) {
    const [options, setOptions] = React.useState(undefined);
    const [isLoading, setIsLoading] = React.useState(true);
    const [votes, setVotes] = React.useState(0);
    const [vote, setVote] = React.useState(0)
    const [status, setStatus] = React.useState(props.poll.status.disabled);
    
    React.useEffect(() => {
        getOptionsByPollId(props.poll.id)
            .then((data) => {
                setOptions(data);
                setIsLoading(false);
            })            
    }, [])

    // React.useEffect(() => {
    //     if (options) {
    //         setIsLoading(false);
    //         let result = 0;
    //         options.forEach((option) => {
    //             result += option.score;                
    //         })
    //         setVotes(result);
    //     }
    // }, [options, votes]); 
    
    // React.useEffect(() => {
    //     const getStatus = setInterval(() => {
    //         getPollStatus(props.poll.id)
    //             .then((data) => {
    //                 setStatus(data.disabled);
    //             })
    //     }, 5000);
    //     return () => clearInterval(getStatus);
    // }, []);

    React.useEffect(() => {
        getTotalVotes(props.poll.id)
            .then((data) => {
                setVotes(data.total);
            })
        const getVotes = setInterval(() => {
            console.log("poll.js getTotalVotes: ", props.poll.id)
            getTotalVotes(props.poll.id)
                .then((data) => {
                    setVotes(data.total);
                });
            
            getPollById(props.poll.id)
                .then((data) => {
                    setStatus(data[0].status.disabled);
                })

        }, 500);
        return () => clearInterval(getVotes);
    }, [votes]);
    // console.log("vote ", vote, "votes ", votes)

    return (
        <>
        {
            isLoading ? 
                <h1>Loading...</h1>
            :
                
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid
                        item
                        lg={12}
                        xs={12}
                        sx={{textAlign: "center", margin: 2}}
                    >
                        <Typography variant='h5'>
                            {props.poll.title}
                        </Typography>
                    </Grid>
                    <Grid 
                        item
                        lg={12}
                        xs={12}
                        sx={{margin: 2}}
                    >
                        {
                            options.map((option) => {

                                return (
                                    <Grid
                                        item
                                        lg={12}
                                        xs={12}
                                        key={`poll${props.poll.id}option${option.id}`}
                                    >
                                        <Option 
                                            option={option} 
                                            pollId={props.poll.id}
                                            // ableStatus able and disable poll. It is a boolean
                                            ableStatus={
                                                // checkVote check if user voted or not in a specific poll
                                                checkVote(props.poll.id, "pollId") ? 
                                                checkVote(props.poll.id, "pollId") : 
                                                status
                                            } 
                                            votes={votes}
                                            setVote={(v) => {setVote(v)}}
                                        />
                                    </Grid>
                                )
                            })
                        }
                        <Grid
                            item
                            lg={12}
                            xs={12}
                            sx={{backgroundColor: "#ffffff", paddingBottom: 2}}
                        >
                            {
                                // vote !== 0 ?
                                //     <Typography variant='body2' sx={{marginLeft: 3}}>
                                //         {`Total de votos ${vote}`}
                                //     </Typography>  
                                // :      

                                    <Typography variant='body2' sx={{marginLeft: 3}}>
                                        {`Total de votos ${votes}`}
                                    </Typography> 
                            }
                            
                        </Grid>
                    </Grid>
                    <Grid 
                        item
                        lg={12}
                        xs={12}
                    >
                        <Grid
                            item
                            lg={12}
                            xs={12}
                        >
                            <Typography variant='body1' sx={{color: "gray", margin: 0.5}}>
                                Dados da enquete:
                            </Typography>
                            <Typography variant='body2' sx={{color: "gray", margin: 0.5}}>
                                {`Início: ${convertDateFormat(props.poll.start)}`}
                            </Typography>
                            <Typography variant='body2' sx={{color: "gray", margin: 0.5}}>
                                {`Término: ${convertDateFormat(props.poll.end)}`}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            lg={12}
                            xs={12}
                        >
                            <Typography variant='body2' sx={{color: "gray", margin: 0.5}}>
                                {`Status: ${props.poll.status.status}`}
                            </Typography>
                        </Grid>
                    </Grid>
                    
                </Grid>
        }
        </>
    )
}
