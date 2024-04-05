import PropTypes from 'prop-types'
import { FormProvider, useForm } from 'react-hook-form'

import { STATUS } from '@application/Constants/DiscoverConstants'
import { useFormSubmit } from '@application/Hooks/UseFormSubmit'
import { ExpandMoreIcon } from '@application/Molecules/icons/ExpandMoreIcon'
import { userDetails } from '@application/Utils/TokenDecodeUtility'
import { Button, Divider, Grid, Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { FriendRequest } from '@store/Requests/FriendRequest'

const loggedInUserDetails = userDetails()

const interestSendDetails = (recieverId, senderId, status) => {
    return {
        senderId: senderId,
        recieverId: recieverId,
        status: status,
    }
}

const removeUser = (setPendingRequestList, setReloadMyFrds) => (data) => {
    setPendingRequestList((prev) => prev.filter((x) => x._id !== data))
    setReloadMyFrds(true)
}

export const ValadationsRequests = ({ pendingRequestList, setPendingRequestList, setReloadMyFrds }) => {
    const methods = useForm({})

    const { handleSubmit } = methods

    const [formSubmit, formLoading] = useFormSubmit({
        requestMethod: FriendRequest,
        onError: () => {},
        onSuccess: removeUser(setPendingRequestList, setReloadMyFrds),
    })

    return (
        <Grid item lg={12}>
            <Typography variant="h5" sx={{ color: 'blue.b700' }}>
                Valadation Requests
            </Typography>
            <Divider sx={{ my: 3 }} />
            {pendingRequestList && pendingRequestList.length > 0 ? (
                pendingRequestList.map((requestList) => (
                    <Accordion key={requestList?._id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon width={20} height={10} />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            {/* eslint-disable-next-line */}
                            <img src={requestList?.images[0].src} className="smallRoundImage" alt="" />
                            {requestList?.firstName} {requestList?.lastName}
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormProvider {...methods}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    sx={{ mr: 2 }}
                                    disabled={formLoading}
                                    onClick={() =>
                                        handleSubmit(
                                            formSubmit(
                                                interestSendDetails(
                                                    requestList?._id,
                                                    loggedInUserDetails?.id,
                                                    STATUS.accept
                                                )
                                            )
                                        )
                                    }
                                >
                                    Accept
                                </Button>
                                <Button variant="contained" color="error">
                                    Reject
                                </Button>
                            </FormProvider>
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <Typography align="center">No request avaliable</Typography>
            )}
        </Grid>
    )
}

ValadationsRequests.propTypes = {
    pendingRequestList: PropTypes.array,
    setPendingRequestList: PropTypes.func,
    setReloadMyFrds: PropTypes.func,
}
