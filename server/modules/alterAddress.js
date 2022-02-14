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
  } else if (object.name === "AWAYRESO") {
    object.address1 = "AWAY RESORTS";
    object.address2 = "IMEX BUILDING";
    object.address3 = "575-599 Maxted Road";
    object.city = "Hemel Hempstead";
    object.region = "Hertfordshire";
    object.postcode = "HP2 7DX";
  } else if (object.name === "LOVAT") {
    object.address1 = "LOVAT PARKS";
    object.address2 = "WeWork Victoria";
    object.address3 = "123 Buckingham Palace Road";
    object.city = "London";
    object.region = "";
    object.postcode = "SW1W 9SH";
  } else if (object.name === "LYONSHOL") {
    object.address1 = "Lyons Holiday Parks";
    object.address2 = "Robin Hood Holiday Park";
    object.address3 = "Coast Road";
    object.city = "Rhyl";
    object.region = "";
    object.postcode = "LL18 3UU";
  } else if (object.name === "COVECOMM") {
    object.address1 = "White Horse Caravan Company Ltd";
    object.address2 = "Douglas Bunn House";
    object.address3 = "Warner Lane";
    object.city = "Selsey";
    object.region = "West Sussex";
    object.postcode = "PO20 9EL";
  } else if (object.name === "VERDANT2") {
    object.address1 = "Verdant Leisure Ltd";
    object.address2 = "10 Mannin Way";
    object.address3 = "Caton Road";
    object.city = "Lancaster";
    object.region = "";
    object.postcode = "LA1 3SW";
  } else if (object.name === "MEADOWHE") {
    object.address1 = "Meadowhead Ltd";
    object.address2 = "Charterhall";
    object.address3 = "";
    object.city = "Duns";
    object.region = "Berwickshire";
    object.postcode = "TD11 3RE";
  }

  return object;
}
