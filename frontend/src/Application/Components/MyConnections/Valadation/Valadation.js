import { Grid, Typography } from '@mui/material'
import React from 'react'

export const Valadation = () => {
    return (
        <Grid container spacing={2} p={2}>
            <Grid item lg={12} sx={{ mt: 4 }}>
                <Typography variant="h5" color="blue.b700" fontWeight={500}>
                    Valadation In Progress
                </Typography>
                <Typography variant="body1" align="center">
                    No data available
                </Typography>
            </Grid>

            <Grid item lg={12} sx={{ mt: 4 }}>
                <Typography variant="h5" color="blue.b700" fontWeight={500}>
                    My Matchmakers
                </Typography>
                <Typography variant="body1" align="center">
                    No my matchmakers available
                </Typography>
            </Grid>
        </Grid>
    )
}
