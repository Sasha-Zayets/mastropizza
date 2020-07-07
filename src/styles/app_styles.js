const app_styles = (scales) => {
    return {
        colors: {
            text: {
                primary: "#1D1D1B",
                white: '#ffffff',
                grey: "#7A8799",
                light_grey: "#999999",
                red: "#aa141d",
                gold: "#e6c176",
            },
            app: {
                light_grey: '#E5E5E5',
                white: "#FFFFFF",
                blue: "#465C87",
                light_blue: "#72B0E1",
                orange: "#ff6900",
                gold: "#e6c176",
                green: "#1AA056",
                dark_green: "#4a7356",
                light_black: '#565E6B',
                dark_orange: '#d96334',
                black: '#000000'
            }
        },
        fonts: {
            weight: {
                bold: 'montserrat-semi-bold',
                medium: 'montserrat-medium',
                regular: 'montserrat-regular',
                light: 'montserrat-light'
            },
            size: {
                base: Math.round(scales.fontScale * 16)
            }
        },
        row_between: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'stretch',
        },
        row_between_start: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            alignSelf: 'stretch',
        },
        row_start: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignSelf: 'stretch',
        },
        row_start_start: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            alignSelf: 'stretch',
        },
        row_center: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'stretch',
        },
    }
}

export { app_styles };