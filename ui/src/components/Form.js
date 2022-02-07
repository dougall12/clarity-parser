import React, { useState, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { XMLParser } from "fast-xml-parser";

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
      const options = {
        ignoreDeclaration: true,
        ignoreAttributes: false,
      };

      const parser = new XMLParser(options);
      let jObj = parser.parse(xmlData);

      let inv = jObj.Clarity.Contact;

      const records = inv.map((obj) => {
        let rObj = {
          name: obj.Document.Detail.AccountRef,
          email: obj.Document.Email,
          invoiceNo: obj.Document.Reference,
          address1: obj.Document.InvoiceAddress.Address1,
          address2: obj.Document.InvoiceAddress.Address2,
          address3: obj.Document.InvoiceAddress.Address3,
          city: obj.Document.InvoiceAddress.City,
          region: obj.Document.InvoiceAddress.County,
          postcode: obj.Document.InvoiceAddress.Postcode,
          country: obj.Document.InvoiceAddress.Country,
          ref: obj.Document.References.Id,
          invoiceDate: obj.Document["@_DateTime"],
          dueDate: obj.Document.Item.RequiredDate,
          total: obj.Document.Totals.TotalPrice,
          description: obj.Document.Item.Description,
          quantity: obj.Document.Item.Quantity,
          unitAmount: obj.Document.Item.UnitPrice,
          discount: obj.Document.Item.Discount,
          accountCode: obj.Document.Item.NominalCode,
          taxType: obj.Document.Item.TaxCode,
          taxAmount: obj.Document.Item.TaxRate,
          currency: obj.Document.Detail.PriceCurrency,
        };
        return rObj;
      });
      axios.post("/api/csv", records).then((res) => {
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
