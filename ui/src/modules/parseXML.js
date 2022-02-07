import { XMLParser } from "fast-xml-parser";

export default function XMLtoCsvFormat(xmlData) {
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

  return arr;
}
