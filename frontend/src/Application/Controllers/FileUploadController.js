import PropTypes from 'prop-types'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { DeleteIcon } from '@application/Molecules/icons/DeleteIcon'
import { Button, Typography } from '@mui/material'

import { FileUploadWrapper, VisuallyHiddenInput } from './styles/controller.styled'
// import { styled } from '@mui/material/styles'

// const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
// })

// const FileUploadWrapper = styled('div')(() => ({
//     position: 'relative',
//     marginTop: '40px',

//     '& .closeBtn': {
//         position: 'absolute',
//         right: 0,
//         left: 0,
//         top: '43%',
//         margin: 'auto',
//         zIndex: 1,
//     },
// }))

const handleRemove = (setImage, setValue, name) => () => {
    setImage(null)
    setValue(name, '')
}

export const FileUploadController = (props) => {
    const [image, setImage] = useState(null)
    const {
        control,
        setValue,
        formState: { errors },
    } = useFormContext()

    const { name, rules, ...rest } = props

    const handleChange = (onChange) => (e) => {
        onChange(e.target.files[0])
        setImage(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, ...restfields } }) => (
                <FileUploadWrapper>
                    {image && (
                        <Button
                            sx={{ color: 'blue.b700' }}
                            className="closeBtn"
                            onClick={handleRemove(setImage, setValue, name)}
                        >
                            <DeleteIcon width={34} height={34} />
                        </Button>
                    )}
                    <Button
                        component="label"
                        sx={{
                            color: 'blue.b700',
                            backgroundColor: 'transparent',
                            fontSize: '70px',
                            padding: image ? '0px' : '100px',
                            border: '8px dotted #145CA8',
                        }}
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                    >
                        {/* eslint-disable-next-line  */}
                        {image ? <img src={image} style={{ width: '244px', height: '337px' }} /> : '+'}
                        <VisuallyHiddenInput
                            {...restfields}
                            {...rest}
                            value={''}
                            onChange={handleChange(onChange)}
                            accept="images/*"
                            type="file"
                        />
                    </Button>

                    <Typography variant="body2" color="red">
                        {errors[name]?.message}
                    </Typography>
                </FileUploadWrapper>
            )}
        />
    )
}

FileUploadController.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    variant: PropTypes.string,
    inputType: PropTypes.string,
    rules: PropTypes.object,
}
