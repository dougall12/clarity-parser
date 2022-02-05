//!Parse Imports
const { XMLParser } = require("fast-xml-parser");
const fs = require("fs");

//! Write Imports
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

function getData() {
  try {
    const xml = fs.readFileSync(__dirname + "/parseTest.xml", "utf-8");
    const data = `${xml}`;
    return data;
  } catch (e) {
    console.log(e);
  }
}

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

const csvWriter = createCsvWriter({
  path: __dirname + "/test.csv",
  header: [
    { id: "name", title: "ContactName" },
    { id: "email", title: "EmailAddress" },
    { id: "address1", title: "POAddressLine1" },
    { id: "address2", title: "POAddressLine2" },
    { id: "address3", title: "POAddressLine3" },
    { id: "city", title: "POCity" },
    { id: "region", title: "PORegion" },
    { id: "postcode", title: "POPostalCode" },
    { id: "country", title: "POCountry" },
    { id: "invoiceNo", title: "InvoiceNumber" },
    { id: "ref", title: "Reference" },
    { id: "invoiceDate", title: "InvoiceDate" },
    { id: "dueDate", title: "DueDate" },
    { id: "total", title: "total" },
    { id: "description", title: "Description" },
    { id: "quantity", title: "Quantity" },
    { id: "unitAmount", title: "UnitAmount" },
    { id: "discount", title: "Discount" },
    { id: "accountCode", title: "AccountCode" },
    { id: "taxType", title: "TaxType" },
    { id: "taxAmount", title: "TaxAmount" },
    { id: "currency", title: "Currency" },
  ],
});

csvWriter.writeRecords(records).then(() => {
  console.log("...done");
});
