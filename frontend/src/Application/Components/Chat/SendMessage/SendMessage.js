import { TextFieldController } from '@application/Controllers/TextFieldController'
import { SendIcon } from '@application/Molecules/icons/SendIcon'
import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export const SendMessage = ({ methods, handleSendMessage }) => {
    return (
        <FormProvider {...methods}>
            <Box component="form" sx={{ mt: 2 }} onSubmit={handleSendMessage}>
                <Grid container spacing={0}>
                    <Grid item lg={11}>
                        <TextFieldController name="message" placeholder="Send A Message..." />
                    </Grid>
                    <Grid item lg={1}>
                        <Button type="submit">
                            <SendIcon width={32} height={32} />
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </FormProvider>
    )
}
