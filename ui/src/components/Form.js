import React from "react";
import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
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

          <p className={`errorMessage ${errors.inputPath ? "error" : ""}`}>
            Please select an XML file to process
          </p>

          <input className='submitButton' type='submit' value='Generate CSV' />
        </div>
      </form>
    </>
  );
};

export default Form;
