//! Write Imports
import { createObjectCsvWriter } from "csv-writer";
import path from "path";

export default function (records, outPath) {
  const csvWriter = createObjectCsvWriter({
    path: outPath,
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
      { id: "total", title: "Total" },
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
}
