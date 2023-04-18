// Continents and regions with their code for Google Charts Geo
const CONTINENTS_AND_REGIONS = [
  {
    name: 'All',
    code: '000',
  },
  {
    name: 'Europe',
    code: '150',
    regions: [
      {
        name: 'Northern Europe',
        code: '154',
      },
      {
        name: 'Western Europe',
        code: '155',
      },
      {
        name: 'Eeastern Europe',
        code: '151',
      },
      {
        name: 'Southern Europe',
        code: '039',
      },
    ],
  },
  {
    name: 'Asia',
    code: '142',
    regions: [
      {
        name: 'Central Asia',
        code: '143',
      },
      {
        name: 'Eastern Asia',
        code: '030',
      },
      {
        name: 'Southern Asia',
        code: '034',
      },
      {
        name: 'South-Eastern Asia',
        code: '035',
      },
      {
        name: 'Western Asia',
        code: '145',
      },
    ],
  },
  {
    name: 'Africa',
    code: '002',
    regions: [
      {
        name: 'Northern Africa',
        code: '015',
      },
      {
        name: 'Western Africa',
        code: '011',
      },
      {
        name: 'Middle Africa',
        code: '017',
      },
      {
        name: 'Eeastern Africa',
        code: '014',
      },
      {
        name: 'Southern Africa',
        code: '018',
      },
    ],
  },
  {
    name: 'America',
    code: '019',
    regions: [
      {
        name: 'Northern America',
        code: '021',
      },
      {
        name: 'Caribbean',
        code: '029',
      },
      {
        name: 'Central America',
        code: '013',
      },
      {
        name: 'Southern America',
        code: '005',
      },
    ],
  },
  {
    name: 'Oceania',
    code: '009',
    regions: [
      {
        name: 'Australia and New Zealand',
        code: '053',
      },
      {
        name: 'Melanesia',
        code: '054',
      },
      {
        name: 'Micronesia',
        code: '057',
      },
      {
        name: 'Polynesia',
        code: '061',
      },
    ],
  },
];

export default CONTINENTS_AND_REGIONS;

// Continents and regions as categorized in the DB
export const DATABASE_REGIONS = {
  Africa: ['Central Africa', 'Northern Africa', 'Western Africa', 'Southern Africa'],
  Antarctica: ['Antarctica'],
  Asia: [
    'Eastern Asia',
    'Middle East',
    'Southeast Asia',
    'Southern and Central Asia',
    'Transcaucasia',
  ],
  Europe: [
    'Baltic Countries',
    'British Islands',
    'Eastern Europe',
    'Nordic Countries',
    'Southern Europe',
    'Western Europe',
  ],
  'North America': ['Caribbean', 'Central America', 'North America'],
  Oceania: [
    'Australia and New Zealand',
    'Melanesia',
    'Micronesia',
    'Micronesia / Caribbean',
    'Polynesia',
  ],
  'South America': ['South America'],
};
