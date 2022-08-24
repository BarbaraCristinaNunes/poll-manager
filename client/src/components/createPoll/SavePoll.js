import * as React from 'react';
import {
    Button,
} from "@mui/material";
import { createPoll, createOption, getPolls} from '../../crud';
import { checkNewPollData, maxPaginationPage } from '../Operations';

export default function SavePoll(props) {
    const poll = {title: props.title, start: props.start, end: props.end};
    return (
        <Button 
            variant="contained"
            // checkNewPollData check if form's inputs are empty and able and disable button called Criar. It is boolean
            disabled={checkNewPollData(props.title, props.start, props.end, props.options)}
            onClick={(v) => {

                const newPoll = createPoll(poll)
                    .then((id) => {
                        props.options.forEach((option) => {
                            createOption(option, id)
                        });
                        getPolls(1)
                            .then((data) => {
                                const dataRows = maxPaginationPage(data.count, data.limit);
                                props.setMaxPage(dataRows);
                                props.setPolls(data.rows);
                            })
                    })
                if(newPoll){
                    props.setNewPoll(false);
                }
            }}
        >
            Criar
        </Button>
    )
}