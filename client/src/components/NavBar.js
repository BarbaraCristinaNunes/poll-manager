import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';


export default function ButtonAppBar(props) {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "center", backgroundColor: "silver"}}>
          <Button 
            size="large" 
            color="primary" 
            variant="contained"
            onClick={(v) => {
              // Change content from consts seeAll and NewPoll to show all polls
              props.setSeeAll(true);
              props.setNewPoll(false)
            }}
          >
            Enquetes
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
