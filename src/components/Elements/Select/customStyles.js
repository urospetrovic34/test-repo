export const customStyles = {
    control: (provided,state) => ({
        ...provided,
        minHeight: '45px',
        height: '45px',
        border:'none',
        boxShadow: 'none',
        borderRadius: '2px',
        cursor:'pointer',
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        padding:'0px',
        marginLeft:'7px',
    }),
    input: (provided, state) => ({
        ...provided,
        padding: '0px',
    }),
    indicatorSeparator: (state) => ({
        display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '45px',
    }),
    dropdownIndicator: () => ({
        color:'#001628',
        marginRight:'7px',
    }),
    option:(styles, { data, isDisabled, isFocused, isSelected }) => ({
        cursor:'pointer',
        height: '45px',
        display:'flex',
        alignItems:'center',
        justifyContent: 'flex-start',
        paddingLeft:'7px',
        backgroundColor:isFocused ? '#001628' : 'white',
        color:isFocused ? '#99D9D9' : '#001628'
    }),
    menu:(provided, state) => ({
        ...provided,
        padding:'0px'
    }),
    menuList:(provided, state) => ({
        ...provided,
        padding:'0px',
        borderRadius: '2px',
    })
}