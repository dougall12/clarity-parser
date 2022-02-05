//!Parse Imports
const { XMLParser } = require("fast-xml-parser");
const fs = require("fs");

//! Write Imports
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

function getData() {
  try {
    const xml = fs.readFileSync(__dirname + "/tet.xml", "utf-8");
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

// console.log(jObj.Clarity.Contact.Document.Detail.AccountRef);
// console.log(jObj.Clarity.Contact.Document.Reference);

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

const name = jObj.Clarity.Contact.Document.Detail.AccountRef;
const invoice = jObj.Clarity.Contact.Document.References.Id;
const address1 = jObj.Clarity.Contact.Document.InvoiceAddress.Address1;
const address2 = jObj.Clarity.Contact.Document.InvoiceAddress.Address2;
const address3 = jObj.Clarity.Contact.Document.InvoiceAddress.Address3;
const city = jObj.Clarity.Contact.Document.InvoiceAddress.City;
const region = jObj.Clarity.Contact.Document.InvoiceAddress.County;
const postcode = jObj.Clarity.Contact.Document.InvoiceAddress.Postcode;
const country = jObj.Clarity.Contact.Document.InvoiceAddress.Country;
const ref = jObj.Clarity.Contact.Document.Reference;
const invoiceDate = jObj.Clarity.Contact.Document["@_DateTime"];
const dueDate = jObj.Clarity.Contact.Document.Item.RequiredDate;
const total = jObj.Clarity.Contact.Document.Totals.TotalPrice;
const description = jObj.Clarity.Contact.Document.Item.Description;
const quantity = jObj.Clarity.Contact.Document.Item.Quantity;
const unitAmount = jObj.Clarity.Contact.Document.Item.UnitPrice;
const discount = jObj.Clarity.Contact.Document.Item.Discount;
const accountCode = jObj.Clarity.Contact.Document.Item.NominalCode;
const taxType = jObj.Clarity.Contact.Document.Item.TaxCode;
const taxAmount = jObj.Clarity.Contact.Document.Item.TaxRate;
const currency = jObj.Clarity.Contact.Document.Detail.PriceCurrency;

const records = [
  {
    name: name,
    invoiceNo: invoice,
  },
];

csvWriter.writeRecords(records).then(() => {
  console.log("...done");
});
