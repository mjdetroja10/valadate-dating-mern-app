import styled from '@emotion/styled'

export const CommonThreadsMainWrap = styled('div')({
    marginLeft: 290,
    marginTop: 90,

    '& h4': {
        fontWeight: 600,
        color: '#145CA8',
        marginBottom: '20px',
        marginTop: '12px',
    },

    '& .prevIcon': {
        position: 'absolute',
        left: '20px',
        top: '42%',
        zIndex: 1,
        cursor: 'pointer',
    },

    '& .nextIcon': {
        position: 'absolute',
        right: '20px',
        top: '42%',
        zIndex: 1,
        cursor: 'pointer',
    },

    '& .slick-slide': {
        margin: '0 10px',
        width: '160px',
    },

    '& .swiper-slide img': {
        borderRadius: '12px',
        width: '100%',
        objectFit: 'cover',
    },

    '& .MuiBox-root': {
        position: 'relative',

        '&::before': {
            content: '""',
            background:
                'linear-gradient(180deg, rgba(20, 92, 168, 0) 0%, rgba(20, 92, 168, 0.4) 26.43%, rgba(20, 92, 168, 0.8) 73%, #145CA8 100%)',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            width: '100%',
            height: '100px',
            position: 'absolute',
            bottom: 0,
            left: 0,
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
        },
    },

    '& .cardContent': {
        position: 'absolute',
        bottom: '15px',
        left: '15px',

        '&::before': {
            display: 'none',
        },

        '& .MuiTypography-body2': {
            color: '#FFFFFF',
            zIndex: 1,
            position: 'relative',
        },

        '& .MuiTypography-body3': {
            color: '#F9DB6D',
            zIndex: 1,
            position: 'relative',
        },
    },

    // '& .swiper-slide-active': {
    //     '& img': {
    //         height: '200px',
    //     },
    // },

    // '& .swiper-slide-active .activeSlide': {
    //     display: 'block',
    //     position: 'absolute',
    // },

    '& .activeSlide': {
        display: 'none',
    },
})
