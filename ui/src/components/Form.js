import React, { useState, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import XMLtoCsvFormat from "../modules/parseXML";

const Form = () => {
  const [filePath, setFilePath] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    const file = e.inputPath[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = function () {
      let xmlData = reader.result;

      let arr = XMLtoCsvFormat(xmlData);

      axios.post("/api/csv", { xml: arr, path: e.outPath }).then((res) => {
        setFilePath(res.data);
      });
    };
  };
  return (
    <>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='buttons'>
          <label className='formLabels'>
            Select XML file
            <input
              id='inputPath'
              {...register("inputPath", { required: true })}
              type='file'
              accept='.xml'
            />
          </label>

          <label className='label' for='outPath'>
            Output File Name
          </label>
          <input
            id='outPath'
            placeholder='Please enter file name...'
            {...register("outPath", { required: true, pattern: /\.csv/i })}
            type='text'
          ></input>

          <p className={`errorMessage ${errors.outPath ? "error" : ""}`}>
            Please add .csv to the end of the file name
          </p>
          <p className={`errorMessage ${errors.inputPath ? "error" : ""}`}>
            Please select an XML file to process
          </p>

          <input className='submitButton' type='submit' value='Generate CSV' />
          {filePath && (
            <>
              <h5>New Csv created</h5>

              <p className='fileLink'>{filePath}</p>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default Form;
