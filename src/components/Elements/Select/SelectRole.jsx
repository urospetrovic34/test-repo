import React from 'react'
import './Select.css'

export const SelectRole = () => {
    return (
        <div className="select">
            <select>
                <option value="company_user">Company User</option>
                <option value="company_admin">Company Admin</option>
            </select>
        </div>
    )
}
