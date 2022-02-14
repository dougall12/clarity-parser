export default function alterAddress(object) {
  if (object.name === "PARKDEA2") {
    object.email = "accountspayable@parkdean-resorts.com";
    object.address1 = "Parkdean Resorts UK Ltd";
    object.address2 = "2nd Floor";
    object.address3 = "One Gosforth Park Way";
    object.city = "Newcastle-Upon-Tyne";
    object.region = "";
    object.postcode = "NE12 BET";
  } else if (object.name === "BOURNE") {
    object.address1 = "Bourne Leisure Group Ltd";
    object.address2 = "1 Park Lane";
    object.address3 = "";
    object.city = "Hemel Hempstead";
    object.region = "Hertfordshire";
    object.postcode = "HP2 4YL";
  }

  return object;
}
