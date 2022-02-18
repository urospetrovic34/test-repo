import React from "react";
import '../Select/Select.css'
import { customStyles } from '../Select/customStyles'
import Select from 'react-select'

export const GuestHeader = (props) => {
  console.log(props.companyData);

  const sortOptions = [
    { value: "published", label: "Last joined" },
    { value: "pending", label: "First joined" },
  ];

  return (
    <div className="guest-header">
      <div className="guest-header-row-one">
        <div>
          <img
            className="company-avatar"
            src={props.companyData.attributes.logo.data.attributes.url}
            alt="#"
          />
        </div>
        <div>
          <h2>{props.companyData.attributes.name}</h2>
        </div>
      </div>
      <div className="guest-header-row-two">
        <div>
          <input
            placeholder="Filter by name"
            onKeyUp={(event) => props.handleFilter(event.target.value)}
          />
        </div>
        <div>
          <Select
            defaultValue={sortOptions[0]}
            className="custom-select"
            styles={customStyles}
            options={sortOptions}
            onChange={props.handleSort}
          />
        </div>
      </div>
    </div>
  );
};
