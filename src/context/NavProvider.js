import React,{useState} from 'react';

export const NavContext = React.createContext({check:false,companyName:''})

export const NavProvider = ({children}) => {

    const [nav,setNav] = useState({check:false,companyName:''})

    const setCheck = () => {
        setNav((nav) => ({
            check:true
        }))
    }

    const setName = (name) => {
        setNav((nav) => ({
            companyName:name
        }))
    }

    return (
        <NavContext.Provider value={{nav,setCheck,setName}}>
            {children}
        </NavContext.Provider>
    )
}