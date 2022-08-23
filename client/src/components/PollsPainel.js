import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import NavBar from './NavBar';
import { getPolls } from '../crud';
import { AllPulls } from './polls/AllPolls';
import { Poll } from './polls/components/Poll';
import CreatePoll from './createPoll/CreatePoll';
import {Grid} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { maxPaginationPage } from './Operations';

export default function PollsPainel() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [polls, setPolls] = React.useState(undefined);
    const [seeAll, setSeeAll] = React.useState(true);
    const [poll, setPoll] = React.useState(false);
    const [newPoll, setNewPoll] = React.useState(false);
    const [maxPage, setMaxPage] = React.useState(undefined);
    const width = () => {if(seeAll) {return "90%"} else {return "50%"}}

    if(!localStorage.getItem("votes")){
        localStorage.setItem("votes", "[]");
    }
    
    React.useEffect(() => {
        getPolls(1)
            .then((data) => {
                setPolls(data.rows);
                const dataRows = maxPaginationPage(data.count, data.limit);
                setMaxPage(dataRows);
            });
    }, [])

    React.useEffect(() => {
        if (polls) {
          setIsLoading(false);
        }
    }, [polls]);
    
    return (
    <>
        <NavBar 
            setSeeAll={(v) => {setSeeAll(v)}}
            setNewPoll={(v) => {setNewPoll(v)}}
        />
        <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: 2,
            marginBottom: 5,
            justifyContent: "center",
            '& > :not(style)': {
            width: width(),
            height: "auto",
            },
        }}
        >   {
                isLoading ? 
                    <h1>Loading...</h1>
                :
                    <Paper 
                        elevation={24}
                        sx={{
                            height: "auto",
                            backgroundColor: "rgba(192, 192, 192, 0.451)",
                            padding: 2,
                        }}
                    >
                        {
                            newPoll ? 
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <CreatePoll
                                        setNewPoll={(v) => {setNewPoll(v)}}
                                        polls={polls}
                                        setPolls={(v) => {setPolls(v)}}
                                        page={maxPage}
                                        setMaxPage={(v) =>{setMaxPage(v)}}
                                    />
                                </Grid>
                                
                            :
                                seeAll ? 
                                    <>
                                        <AllPulls 
                                            setSeeAll={(v) => {setSeeAll(v)}}
                                            setPoll={(v) => {setPoll(v)}}
                                            setNewPoll={(v) => {setNewPoll(v)}}
                                            data={polls}
                                        />
                                        <Stack spacing={2} alignItems="center" sx={{padding: 1}}>
                                            <Pagination 
                                                count={maxPage} 
                                                color="primary"
                                                onChange={(v, page) => {
                                                    getPolls(page)
                                                        .then((data) =>{
                                                            setPolls(data.rows);
                                                        })
                                                }}
                                            />
                                        </Stack>
                                    </>
                                : 
                                    <Poll 
                                        poll={poll}
                                    />
                        }
                    </Paper>                    
            }
        </Box>
    </>
    );
}
