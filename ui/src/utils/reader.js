export const readXmlFile = (file) => {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onloadend = function () {
    return reader.result;
  };
};
