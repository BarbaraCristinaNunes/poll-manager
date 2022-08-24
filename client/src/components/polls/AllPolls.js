import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import {checkVote} from '../Operations';

export function AllPulls(props) {
    return (
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
                sx={{margin: 2, textAlign: "center"}}
                
            >
                <Button 
                    variant="outlined"
                    onClick={(v) => {
                        // Change content from newPoll to show a form that create new poll
                        props.setNewPoll(true);
                    }}
                >
                    Criar nova enquete
                </Button>                
            </Grid>
                {
                    props.data ? 
                        props.data.map((poll) => {

                            return(
                                <Grid
                                    item
                                    lg={3}
                                    xs={12}
                                    sx={{margin: 5, textAlign: "center", justifyContent: "center"}}
                                    key={`poll${poll.id}`}
                                >
                                    <Button 
                                        variant="contained"
                                        onClick={(v) => {
                                            // Send a specific poll to show only its information and options 
                                            props.setPoll(poll);
                                            // Change content from seeAll and newPoll to show only a specific poll
                                            props.setSeeAll(false);
                                            props.setNewPoll(false);
                                        }}
                                    > 
                                        {poll.title} 
                                    </Button>
                                    {
                                        // checkVote check if user voted or not in a specific poll
                                        checkVote(poll.id, "pollId") ? 
                                        <Typography variant='body2' sx={{marginTop: 1}}>
                                            Você já votou nessa enquete!
                                        </Typography>
                                        : ""
                                    }
                                </Grid>
                            )
                        })
                    : 
                        <Grid
                            item
                            lg={12}
                            xs={12}
                            sx={{height: 150, marginTop: 5, textAlign: "center", justifyContent: "center"}}
                        >
                            <Typography> Crie a primeira enquete </Typography>
                        </Grid>
                }
        </Grid>
    )
}