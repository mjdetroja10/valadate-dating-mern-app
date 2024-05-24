import { MyFriends } from '@application/Components/Valadations/MyFriends/MyFriends'
import { Box, Grid, Stack, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { MatchImage, MatchWrapper, NameText } from './Connections.styled'

export const Connections = () => {
    const [newMatches, setNewMatches] = useState([])
    return (
        <Fragment>
            <Grid item lg={12} sx={{ mt: 4 }}>
                <Typography variant="h5" color="blue.b700" fontWeight={500}>
                    New Matches
                </Typography>

                {newMatches.length > 0 ? (
                    <Stack direction="row">
                        {newMatches
                            .slice(-3)
                            .reverse()
                            .map((match) => {
                                return (
                                    <MatchWrapper key={match._id}>
                                        <MatchImage src={match?.frd?.images[0]?.src} alt={match?.frd?.images[0]?.alt} />
                                        <NameText variant="body2">{match?.frd?.firstName}</NameText>
                                    </MatchWrapper>
                                )
                            })}
                    </Stack>
                ) : (
                    <Typography variant="body1" align="center">
                        No new matches available
                    </Typography>
                )}
            </Grid>

            <MyFriends title="Connections" setNewMatches={setNewMatches} />
        </Fragment>
    )
}
