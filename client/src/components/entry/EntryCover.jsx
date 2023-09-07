import React from 'react';
import { Grid, Paper, Box } from '@mui/material';

const EntryCover = ({ entry, exCover }) => {
  return (
    <Grid item xs={12} md={4}>
      <Paper>
        <Box
          sx={{
            height: 0,
            paddingTop: '100%',
            position: 'relative',
            '& img': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            },
          }}
        >
          <img src={exCover} alt="Album Cover" />
        </Box>
      </Paper>
    </Grid>
  );
};

export default EntryCover;