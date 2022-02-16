import React, { useState, useEffect, useRef } from "react";
import "./Company.css";
import { TeamHeader } from "../Elements/TeamHeader/TeamHeader";
import { FileUpload } from "../Elements/FileUpload/FileUpload";
import useCompany from "../../hooks/companies/useCompany";
import { Spinner } from "../Elements/Spinner/Spinner";
import { DateShow } from "../Elements/Date/DateShow";
import {useMutation} from 'react-query'
import { useSelector } from 'react-redux'
import axiosConfig from '../../config/axiosConfig'

export const Company = () => {
  const [updatedCompany, setUpdatedCompany] = useState({
    name: "",
    slug: "",
    logo: null,
    image: null,
  });

  const user = useSelector((state) => state.user)
  const company = useCompany();
  console.log(updatedCompany);
  let companyCheck = false;
  let [sendCheck,setSendCheck] = useState(false)
  const fileInput = useRef(null);
  const fileReader = new FileReader();

  if (company.status === "success") {
    if (!companyCheck) {
      companyCheck = true;
    }
  }

  const handleCompanyNameChange = (event) => {
    setUpdatedCompany({
      ...updatedCompany,
      name: event.target.value,
      slug: event.target.value.replace(/\s+/g, "").toLowerCase(),
    });
  };

  const handleFileClick = (event) => {
    event.preventDefault();
    fileInput.current.click();
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    if (event.target.files[0] !== undefined) {
      console.log(event.target.files[0])
      const fileUploaded = event.target.files[0];
      const formData = new FormData();
      formData.append("files", fileUploaded);
      fileReader.readAsDataURL(fileUploaded);
      fileReader.onload = function () {
        setUpdatedCompany({
          ...updatedCompany,
          logo: formData,
          image: fileReader.result,
        });
      };
    } else {
      setUpdatedCompany({ ...updatedCompany, logo: null, image: null });
    }
  };

  const mutation = useMutation(
    (files) => {
      return axiosConfig.post("/upload", files);
    },
    {
      onMutate:async (data)=>{
        return setSendCheck(true)
      },
      onSuccess: (resp) => {
        console.log(resp.data[0].id);
        const data = { data: { ...updatedCompany, logo: resp.data[0].id } };
        mutationEditCompany.mutate(data);
      },
    }
  );

  const mutationEditCompany = useMutation((data) => {
    return axiosConfig.put(`companies/${user.company}`, data);
  },{
    onSuccess:()=>{
      setSendCheck(false)
    }
  });

  const handleEditCompany = (event) => {
    event.preventDefault();
    if(updatedCompany.logo){
      const files = updatedCompany.logo
      mutation.mutate(files)
    }
    else{
      const data = {"data":{"name":updatedCompany.name,"slug":updatedCompany.slug}}
      mutationEditCompany.mutate(data,{
        onMutate:async (data)=>{
          return setSendCheck(true)
        }
      })
    }
  };

  useEffect(() => {
    if (companyCheck) {
      setUpdatedCompany({
        ...updatedCompany,
        name: company.data.data.data.attributes.name,
        slug: company.data.data.data.attributes.slug,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyCheck]);

  return company.status === "success" && companyCheck && !sendCheck ? (
    <div className="company-center">
      <span className="company-header">
        <TeamHeader name="Company Info" />
      </span>
      <form>
        <div className="company-panel">
          <div className="company-panel-row-one">
            <label htmlFor="">Company name</label>
            <input
              value={updatedCompany.name}
              type="text"
              placeholder="Enter company name"
              name="company-name"
              onChange={handleCompanyNameChange}
            />
          </div>
          <div className="company-panel-row-two">
            <div className="company-panel-row-two-column-one">
              <img
                className="company-logo"
                src={
                  updatedCompany.logo
                    ? updatedCompany.image
                    : company.data.data.data.attributes.logo.data.attributes.url
                }
                alt="#"
              />
              <FileUpload
                fileInput={fileInput}
                wider="wider"
                className="company-width"
                handleFileClick={handleFileClick}
                handleFileChange={handleFileChange}
              />
            </div>
            <div className="company-panel-row-two-column-two">
              <p className="company-label">
                Number of users:{" "}
                {company.data.data.data.attributes.profiles.data.length}
              </p>
              <p className="company-label">
                Number of questions:{" "}
                {company.data.data.data.attributes.question.data.length}
              </p>
              <p className="company-label">Created at:</p>
              <span className="company-info">
                <DateShow date={company.data.data.data.attributes.createdAt} />
              </span>
            </div>
          </div>
          <div className="company-panel-row-three">
            <button className="submit-button" onClick={handleEditCompany}>
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <div className="control-center">
      <Spinner />
    </div>
  );
};
