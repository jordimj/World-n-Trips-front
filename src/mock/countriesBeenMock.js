const countriesBeenMock = [
  {
    name: "Albania",
    continent: "Europe",
    region: "Southern Europe",
    alpha2code: "AL",
    numberOfSpots: "6"
  },
  {
    name: "Algeria",
    continent: "Africa",
    region: "Northern Africa",
    alpha2code: "DZ",
    numberOfSpots: "11"
  },
  {
    name: "Andorra",
    continent: "Europe",
    region: "Southern Europe",
    alpha2code: "AD",
    numberOfSpots: "7"
  },
  {
    name: "Armenia",
    continent: "Asia",
    region: "Transcaucasia",
    alpha2code: "AM",
    numberOfSpots: "11"
  },
  {
    name: "Austria",
    continent: "Europe",
    region: "Western Europe",
    alpha2code: "AT",
    numberOfSpots: "2"
  },
  {
    name: "Belgium",
    continent: "Europe",
    region: "Western Europe",
    alpha2code: "BE",
    numberOfSpots: "4"
  },
  {
    name: "Bosnia and Herzegovina",
    continent: "Europe",
    region: "Southern Europe",
    alpha2code: "BA",
    numberOfSpots: "3"
  },
  {
    name: "Bulgaria",
    continent: "Europe",
    region: "Eastern Europe",
    alpha2code: "BG",
    numberOfSpots: "7"
  },
  {
    name: "Cambodia",
    continent: "Asia",
    region: "Southeast Asia",
    alpha2code: "KH",
    numberOfSpots: "7"
  },
  {
    name: "Croatia",
    continent: "Europe",
    region: "Southern Europe",
    alpha2code: "HR",
    numberOfSpots: "3"
  },
  {
    name: "Cuba",
    continent: "North America",
    region: "Caribbean",
    alpha2code: "CU",
    numberOfSpots: "7"
  },
  {
    name: "Czech Republic",
    continent: "Europe",
    region: "Eastern Europe",
    alpha2code: "CZ",
    numberOfSpots: "2"
  },
  {
    name: "France",
    continent: "Europe",
    region: "Western Europe",
    alpha2code: "FR",
    numberOfSpots: "30"
  },
  {
    name: "Gambia",
    continent: "Africa",
    region: "Western Africa",
    alpha2code: "GM",
    numberOfSpots: "4"
  },
  {
    name: "Georgia",
    continent: "Asia",
    region: "Transcaucasia",
    alpha2code: "GE",
    numberOfSpots: "7"
  },
  {
    name: "Germany",
    continent: "Europe",
    region: "Western Europe",
    alpha2code: "DE",
    numberOfSpots: "6"
  },
  {
    name: "Greece",
    continent: "Europe",
    region: "Southern Europe",
    alpha2code: "GR",
    numberOfSpots: "4"
  },
  {
    name: "Holy See (Vatican City State)",
    continent: "Europe",
    region: "Southern Europe",
    alpha2code: "VA",
    numberOfSpots: "1"
  },
  {
    name: "Hungary",
    continent: "Europe",
    region: "Eastern Europe",
    alpha2code: "HU",
    numberOfSpots: "4"
  },
  {
    name: "India",
    continent: "Asia",
    region: "Southern and Central Asia",
    alpha2code: "IN",
    numberOfSpots: "28"
  },
  {
    name: "Indonesia",
    continent: "Asia",
    region: "Southeast Asia",
    alpha2code: "ID",
    numberOfSpots: "17"
  },
  {
    name: "Iran",
    continent: "Asia",
    region: "Southern and Central Asia",
    alpha2code: "IR",
    numberOfSpots: "15"
  },
  {
    name: "Israel",
    continent: "Asia",
    region: "Middle East",
    alpha2code: "IL",
    numberOfSpots: "4"
  },
  {
    name: "Italy",
    continent: "Europe",
    region: "Southern Europe",
    alpha2code: "IT",
    numberOfSpots: "28"
  },
  {
    name: "Jordan",
    continent: "Asia",
    region: "Middle East",
    alpha2code: "JO",
    numberOfSpots: "7"
  },
  {
    name: "Kazakhstan",
    continent: "Asia",
    region: "Southern and Central Asia",
    alpha2code: "KZ",
    numberOfSpots: "16"
  },
  {
    name: "Kyrgyzstan",
    continent: "Asia",
    region: "Southern and Central Asia",
    alpha2code: "KG",
    numberOfSpots: "13"
  },
  {
    name: "Laos",
    continent: "Asia",
    region: "Southeast Asia",
    alpha2code: "LA",
    numberOfSpots: "7"
  },
  {
    name: "Latvia",
    continent: "Europe",
    region: "Baltic Countries",
    alpha2code: "LV",
    numberOfSpots: "1"
  },
  {
    name: "Lebanon",
    continent: "Asia",
    region: "Middle East",
    alpha2code: "LB",
    numberOfSpots: "8"
  },
  {
    name: "Luxembourg",
    continent: "Europe",
    region: "Western Europe",
    alpha2code: "LU",
    numberOfSpots: "1"
  },
  {
    name: "Macedonia",
    continent: "Europe",
    region: "Southern Europe",
    alpha2code: "MK",
    numberOfSpots: "7"
  },
  {
    name: "Malaysia",
    continent: "Asia",
    region: "Southeast Asia",
    alpha2code: "MY",
    numberOfSpots: "5"
  },
  {
    name: "Malta",
    continent: "Europe",
    region: "Southern Europe",
    alpha2code: "MT",
    numberOfSpots: "4"
  },
  {
    name: "Moldova",
    continent: "Europe",
    region: "Eastern Europe",
    alpha2code: "MD",
    numberOfSpots: "2"
  },
  {
    name: "Monaco",
    continent: "Europe",
    region: "Western Europe",
    alpha2code: "MC",
    numberOfSpots: "2"
  },
  {
    name: "Montenegro",
    continent: "Europe",
    region: "Southern Europe",
    alpha2code: "ME",
    numberOfSpots: "5"
  },
  {
    name: "Morocco",
    continent: "Africa",
    region: "Northern Africa",
    alpha2code: "MA",
    numberOfSpots: "14"
  },
  {
    name: "Myanmar",
    continent: "Asia",
    region: "Southeast Asia",
    alpha2code: "MM",
    numberOfSpots: "9"
  },
  {
    name: "Nagorno-Karabakh",
    continent: "Asia",
    region: "Transcaucasia",
    alpha2code: "NK",
    numberOfSpots: "7"
  },
  {
    name: "Netherlands",
    continent: "Europe",
    region: "Western Europe",
    alpha2code: "NL",
    numberOfSpots: "3"
  },
  {
    name: "Oman",
    continent: "Asia",
    region: "Middle East",
    alpha2code: "OM",
    numberOfSpots: "23"
  },
  {
    name: "Palestine",
    continent: "Asia",
    region: "Middle East",
    alpha2code: "PS",
    numberOfSpots: "5"
  },
  {
    name: "Poland",
    continent: "Europe",
    region: "Eastern Europe",
    alpha2code: "PL",
    numberOfSpots: "2"
  },
  {
    name: "Portugal",
    continent: "Europe",
    region: "Southern Europe",
    alpha2code: "PT",
    numberOfSpots: "22"
  },
  {
    name: "Romania",
    continent: "Europe",
    region: "Eastern Europe",
    alpha2code: "RO",
    numberOfSpots: "36"
  },
  {
    name: "San Marino",
    continent: "Europe",
    region: "Southern Europe",
    alpha2code: "SM",
    numberOfSpots: "1"
  },
  {
    name: "Senegal",
    continent: "Africa",
    region: "Western Africa",
    alpha2code: "SN",
    numberOfSpots: "14"
  },
  {
    name: "Serbia",
    continent: "Europe",
    region: "Southern Europe",
    alpha2code: "RS",
    numberOfSpots: "2"
  },
  {
    name: "Singapore",
    continent: "Asia",
    region: "Southeast Asia",
    alpha2code: "SG",
    numberOfSpots: "1"
  },
  {
    name: "Slovakia",
    continent: "Europe",
    region: "Eastern Europe",
    alpha2code: "SK",
    numberOfSpots: "3"
  },
  {
    name: "Slovenia",
    continent: "Europe",
    region: "Southern Europe",
    alpha2code: "SI",
    numberOfSpots: "3"
  },
  {
    name: "Spain",
    continent: "Europe",
    region: "Southern Europe",
    alpha2code: "ES",
    numberOfSpots: "77"
  },
  {
    name: "Sri Lanka",
    continent: "Asia",
    region: "Southern and Central Asia",
    alpha2code: "LK",
    numberOfSpots: "10"
  },
  {
    name: "Switzerland",
    continent: "Europe",
    region: "Western Europe",
    alpha2code: "CH",
    numberOfSpots: "5"
  },
  {
    name: "Tajikistan",
    continent: "Asia",
    region: "Southern and Central Asia",
    alpha2code: "TJ",
    numberOfSpots: "10"
  },
  {
    name: "Thailand",
    continent: "Asia",
    region: "Southeast Asia",
    alpha2code: "TH",
    numberOfSpots: "11"
  },
  {
    name: "Transnistria",
    continent: "Europe",
    region: "Eastern Europe",
    alpha2code: "TA",
    numberOfSpots: "2"
  },
  {
    name: "Tunisia",
    continent: "Africa",
    region: "Northern Africa",
    alpha2code: "TN",
    numberOfSpots: "8"
  },
  {
    name: "Turkey",
    continent: "Asia",
    region: "Middle East",
    alpha2code: "TR",
    numberOfSpots: "26"
  },
  {
    name: "Ukraine",
    continent: "Europe",
    region: "Eastern Europe",
    alpha2code: "UA",
    numberOfSpots: "2"
  },
  {
    name: "United Arab Emirates",
    continent: "Asia",
    region: "Middle East",
    alpha2code: "AE",
    numberOfSpots: "4"
  },
  {
    name: "United Kingdom",
    continent: "Europe",
    region: "British Islands",
    alpha2code: "GB",
    numberOfSpots: "7"
  },
  {
    name: "United States",
    continent: "North America",
    region: "North America",
    alpha2code: "US",
    numberOfSpots: "7"
  },
  {
    name: "Uzbekistan",
    continent: "Asia",
    region: "Southern and Central Asia",
    alpha2code: "UZ",
    numberOfSpots: "11"
  },
  {
    name: "Vietnam",
    continent: "Asia",
    region: "Southeast Asia",
    alpha2code: "VN",
    numberOfSpots: "7"
  }
];

export default countriesBeenMock;
