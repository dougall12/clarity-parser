export default function dueDate(date) {
  let myDate = new Date(date);
  myDate.setDate(myDate.getDate() + 30);
  const requiredDate = myDate.toISOString();
  return requiredDate;
}
