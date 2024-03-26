import styled from '@emotion/styled'
import { Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material'

export const StyledRadioGroup = styled(RadioGroup)(({ theme }) => ({
    '&.contained': {
        backgroundColor: theme.palette.blue.b700,
        borderRadius: 8,
        '.MuiFormControlLabel-root': {
            borderColor: 'transparent',
            marginRight: 0,
            '&.Checked': {
                backgroundColor: theme.palette.blue.b700,
            },
        },
    },
    '.MuiFormControlLabel-root': {
        '&.Checked': {
            backgroundColor: theme.palette.blue.b700,
            color: theme.palette.white.main,

            '.MuiTypography-root': {
                fontWeight: theme.typography.fontWeightBold,
            },
        },
    },
}))

export const StyledRadioFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    borderRadius: 8,
    userSelect: 'none',
    verticalAlign: 'middle',
    fontSize: '1rem',
    lineHeight: 1.75,
    color: theme.palette.black.medium,
    backgroundColor: 'rgba(251, 253, 255, 0.4)',
    padding: '18px 24px',
    marginBottom: 12,
    fontWeight: 500,
    whiteSpace: 'nowrap',
    '.MuiTypography-root': {
        fontWeight: 500,
        lineHeight: '24px',
    },
}))

export const StyledRadio = styled(Radio)(() => ({
    position: 'absolute',
    svg: {
        display: 'none',
    },
}))

export const StyledCheckBoxFormGroup = styled(FormGroup)(() => ({
    flexDirection: 'row',
    flexWrap: 'wrap',
}))

export const StyledCheckBoxFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    borderRadius: 40,
    userSelect: 'none',
    verticalAlign: 'middle',
    fontSize: '1rem',
    lineHeight: 1.75,
    color: theme.palette.black.main,
    border: '1px solid',
    borderColor: theme.palette.blue.b700,
    marginRight: 40,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0.5, 3, 0.5, 3),
    fontWeight: 500,
    whiteSpace: 'nowrap',

    '&.Checked': {
        borderColor: theme.palette.blue.b700,
        color: theme.palette.white.main,
        backgroundColor: theme.palette.blue.b700,

        '.MuiTypography-root': {
            fontWeight: theme.typography.fontWeightBold,
        },
    },

    '.MuiTypography-root': {
        fontWeight: 500,
        lineHeight: '24px',
        fontSize: 16,
    },
}))

export const StyledCheckbox = styled(Checkbox)(() => ({
    position: 'absolute',
    svg: {
        display: 'none',
    },
}))

export const FileUploadWrapper = styled('div')(() => ({
    position: 'relative',
    marginTop: '40px',

    '& .closeBtn': {
        position: 'absolute',
        right: 0,
        left: 0,
        top: '43%',
        margin: 'auto',
        zIndex: 1,
    },
}))

export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
})
