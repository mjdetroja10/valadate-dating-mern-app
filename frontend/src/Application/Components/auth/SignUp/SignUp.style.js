import styled from '@emotion/styled'

export const SignUpWrapper = styled('div')({
    backgroundImage: 'linear-gradient(68.66deg, #FDEAB6 0%, #F9DB6D 89.75%)',
    height: '100vh',
    paddingTop: 130,
    paddingBottom: 50,

    '& #demo-radio-buttons-group-label': {
        fontSize: '24px',
        fontWeight: 500,
        color: '#2E353E',
        marginBottom: 40,
        display: 'block',
    },

    '& .MuiFormLabel-root': {
        color: '#72859A',
    },

    '& .MuiTypography-body2': {
        fontSize: 16,
        fontWeight: 600,
        textTransform: 'capitalize',
    },

    '& .MuiSlider-valueLabelOpen': {
        backgroundColor: '#145CA8',
    },
})

export const WhiteBoxWrapper = styled('div')(({ theme }) => ({
    backgroundColor: 'rgba(251, 253, 255, 0.6)',
    padding: theme.spacing(4, 4),
    borderRadius: 8,
    height: 'auto',
    maxHeight: 477,
    overflowY: 'auto',
}))
