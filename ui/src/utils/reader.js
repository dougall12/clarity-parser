export const xmlData = function (file) {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onloadend = function () {
    console.log(reader.result);
    return reader.result;
  };
};

console.log(xmlData(`parseTest.xml`));
