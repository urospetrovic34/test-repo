import React from "react";

export const themes = {
    dark: {
        backgroundColor: '#355464',
        color: 'white'
    },
    dark1: {
        backgroundColor: 'rgb(0, 22, 40, 0.95)',
        color: 'white'
    },
    fontColor: { 
        color: 'white'
    }
};

const ThemeContext = React.createContext(themes);

export default ThemeContext