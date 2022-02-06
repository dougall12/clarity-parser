//!Parse Imports
import { XMLParser } from "fast-xml-parser";
import fs from "fs";

export default function (XMLpath) {
  function getData() {
    try {
      //read xml
      const xml = fs.readFileSync(`${XMLpath}`, "utf-8");
      //format for parser
      const data = `${xml}`;

      return data;
    } catch (e) {
      console.log(e);
    }
  }

  //
  const xmlData = getData();

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
      invoiceNo: obj.Document.References.Id,
      address1: obj.Document.InvoiceAddress.Address1,
      address2: obj.Document.InvoiceAddress.Address2,
      address3: obj.Document.InvoiceAddress.Address3,
      city: obj.Document.InvoiceAddress.City,
      region: obj.Document.InvoiceAddress.County,
      postcode: obj.Document.InvoiceAddress.Postcode,
      country: obj.Document.InvoiceAddress.Country,
      ref: obj.Document.Reference,
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

  return records;
}
