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

      //!Check if 1 or multiple
      if (inv instanceof Array === false) {
        inv = [inv];
      }

      //!Account and Address Object

      const heads = inv.map((a) => {
        let rA = {
          name: a.Document.Detail.AccountRef,
          email: a.Email,
          invoiceNo: a.Document.Reference,
          address1: a.Document.InvoiceAddress.Address1,
          address2: a.Document.InvoiceAddress.Address2,
          address3: a.Document.InvoiceAddress.Address3,
          city: a.Document.InvoiceAddress.City,
          region: a.Document.InvoiceAddress.County,
          postcode: a.Document.InvoiceAddress.Postcode,
          country: a.Document.InvoiceAddress.Country,
          ref: a.Document.References.Id,
          invoiceDate: a.Document["@_DateTime"],
          currency: a.Document.Detail.PriceCurrency,
          // total: a.Document.Totals.TotalPrice,
        };
        return rA;
      });

      //!Item specific details
      const records = inv[0].Document.Item.map((obj) => {
        let rObj = {
          dueDate: obj.RequiredDate,
          description: obj.Description,
          quantity: obj.Quantity,
          unitAmount: obj.UnitPrice,
          discount: obj.Discount,
          accountCode: obj.NominalCode,
          taxType: obj.TaxCode,
          taxAmount: obj.TaxRate * obj.UnitPrice,
          total: obj.UnitPrice * obj.Quantity,
        };

        return rObj;
      });

      //!Account and Address Object
      const headObject = heads[0];

      const arr = records.map((el) => {
        let newArr = { ...headObject, ...el };
        return newArr;
      });

      axios.post("/api/csv", arr).then((res) => {
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
