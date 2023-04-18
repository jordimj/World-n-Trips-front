import React from 'react';
import { Chart } from 'react-google-charts';
import { CHART_COLORS } from '../../../../countries/components/Country/Statistics/Expenses/ExpensesChart';

// export const data = [
//   [
//     {
//       type: 'date',
//       id: 'Date',
//     },
//     {
//       type: 'number',
//       id: 'Trip',
//     },
//   ],
//   [new Date(2012, 3, 13), 1],
//   [new Date(2012, 3, 14), 1],
//   [new Date(2012, 3, 15), 1],
//   [new Date(2012, 3, 16), 1],
//   [new Date(2012, 3, 17), 1],
//   // Many rows omitted for brevity.
//   [new Date(2013, 9, 4), 1],
//   [new Date(2013, 9, 5), 1],
//   [new Date(2013, 9, 12), 1],
//   [new Date(2013, 9, 13), 1],
//   [new Date(2013, 9, 19), 1],
//   [new Date(2013, 9, 23), 1],
//   [new Date(2013, 9, 24), 1],
//   [new Date(2013, 9, 30), 1],
// ];

// const trips = [
//   {
//     id: 24,
//     name: 'GENEVAN AGAIN',
//     worktrip: true,
//     telework: false,
//     picture:
//       'https://www.sbb.ch/content/dam/internet/upload/raw/images/Paleo-Festival-Nyon.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
//     arrivalDate: {
//       dayId: 936,
//       date: '2022-07-18T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 939,
//       date: '2022-07-21T00:00:00+00:00',
//     },
//     hasJournals: true,
//   },
//   {
//     id: 23,
//     name: 'MEXICAN',
//     worktrip: false,
//     telework: false,
//     picture: 'https://mxcity.mx/wp-content/uploads/2021/05/edzna-1-768x482.png',
//     arrivalDate: {
//       dayId: 917,
//       date: '2022-05-20T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 935,
//       date: '2022-06-07T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 22,
//     name: 'CYPRIOT',
//     worktrip: false,
//     telework: true,
//     picture:
//       'https://img.freepik.com/free-photo/landmarks-cyprus-lala-mustafa-pasha-mosque-st-nicholas-cathedral-ancient-famagusta-town_287743-946.jpg',
//     arrivalDate: {
//       dayId: 907,
//       date: '2022-04-10T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 916,
//       date: '2022-04-19T00:00:00+00:00',
//     },
//     hasJournals: true,
//   },
//   {
//     id: 21,
//     name: 'GENEVAN',
//     worktrip: true,
//     telework: false,
//     picture:
//       'https://a.cdn-hotels.com/gdcs/production125/d882/347f73d7-bd57-44cf-b3fa-0837c96cb193.jpg',
//     arrivalDate: {
//       dayId: 902,
//       date: '2022-02-21T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 906,
//       date: '2022-02-25T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 20,
//     name: 'ICELANDIC',
//     worktrip: false,
//     telework: false,
//     picture:
//       'https://www.regent-holidays.co.uk/upload-files/blog-sections/section-154_1062.jpg',
//     arrivalDate: {
//       dayId: 893,
//       date: '2021-12-06T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 900,
//       date: '2021-12-13T00:00:00+00:00',
//     },
//     hasJournals: true,
//   },
//   {
//     id: 19,
//     name: 'EGYPTIAN',
//     worktrip: false,
//     telework: false,
//     picture: 'https://cdn.mos.cms.futurecdn.net/YMa7Wx2FyjQFUjEeqa72Rm-1200-80.jpg',
//     arrivalDate: {
//       dayId: 877,
//       date: '2021-10-09T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 892,
//       date: '2021-10-24T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 18,
//     name: 'KOSOVAN',
//     worktrip: false,
//     telework: false,
//     picture:
//       'https://wander-lush.org/wp-content/uploads/2021/09/Emily-Lush-Prizren-Kosovo-river-bridge-hero.jpg',
//     arrivalDate: {
//       dayId: 867,
//       date: '2021-09-04T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 876,
//       date: '2021-09-13T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 17,
//     name: 'EL HIERRO',
//     worktrip: false,
//     telework: false,
//     picture: 'https://elhierro.travel/sites/default/files/2018-04/El-Bajon-El-Hierro.png',
//     arrivalDate: {
//       dayId: 858,
//       date: '2020-10-10T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 866,
//       date: '2020-10-18T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 16,
//     name: 'CAMINO DE SANTIAGO',
//     worktrip: false,
//     telework: false,
//     picture:
//       'https://a.cdn-hotels.com/gdcs/production24/d1493/38448f6b-50cb-4edb-ba1b-41e72a2d0db7.jpg',
//     arrivalDate: {
//       dayId: 827,
//       date: '2020-08-28T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 901,
//       date: '2020-09-28T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 15,
//     name: 'MENORCA',
//     worktrip: false,
//     telework: false,
//     picture: 'https://cdn.cooltra.com/uploads/2021/05/menorca.png',
//     arrivalDate: {
//       dayId: 817,
//       date: '2020-07-04T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 826,
//       date: '2020-07-13T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 14,
//     name: 'ALGERIAN',
//     worktrip: false,
//     telework: false,
//     picture:
//       'https://thumbs.dreamstime.com/b/sidi-m-cid-bridge-across-rhummel-river-constantine-algeria-sidi-m-cid-bridge-across-rhummel-river-canyon-constantine-120508753.jpg',
//     arrivalDate: {
//       dayId: 801,
//       date: '2020-02-21T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 816,
//       date: '2020-03-07T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 13,
//     name: 'LISBOA & MADEIRA',
//     worktrip: false,
//     telework: false,
//     picture: 'https://elviajerofeliz.com/wp-content/uploads/2021/07/madeira.jpg',
//     arrivalDate: {
//       dayId: 791,
//       date: '2019-12-05T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 800,
//       date: '2019-12-14T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 12,
//     name: 'INDONESIAN',
//     worktrip: false,
//     telework: false,
//     picture:
//       'https://cdn.kimkim.com/files/a/content_articles/featured_photos/ffe773317a34bfdf3d59012e28fdb4f9819f485a/big-c331df89b53060a4dcbdfe5256a3a452.jpg',
//     arrivalDate: {
//       dayId: 773,
//       date: '2019-10-04T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 790,
//       date: '2019-10-21T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 11,
//     name: 'MALTESE',
//     worktrip: false,
//     telework: false,
//     picture:
//       'https://www.flyblueair.com/media/default/destinations/malta_main_6b8bbaa8017448f46e7803bec147d007.jpg',
//     arrivalDate: {
//       dayId: 767,
//       date: '2018-10-10T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 772,
//       date: '2018-10-15T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 10,
//     name: 'TUNISIAN',
//     worktrip: false,
//     telework: false,
//     picture:
//       'https://www.focusonafrica.info/wp-content/uploads/2019/11/tunisia-aaa-1920x1080.jpg',
//     arrivalDate: {
//       dayId: 756,
//       date: '2019-03-29T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 766,
//       date: '2019-04-08T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 9,
//     name: 'SENEGAMBIAN',
//     worktrip: false,
//     telework: false,
//     picture:
//       'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/colorful-boats-saint-louis-senegal-clifton-facey.jpg',
//     arrivalDate: {
//       dayId: 734,
//       date: '2018-10-30T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 755,
//       date: '2018-11-20T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 8,
//     name: 'LEBANESE',
//     worktrip: false,
//     telework: false,
//     picture:
//       'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/95/74/27/mohammad-al-amin-mosque.jpg?w=1200&h=-1&s=1',
//     arrivalDate: {
//       dayId: 725,
//       date: '2018-06-01T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 733,
//       date: '2018-06-09T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 7,
//     name: 'CAMI DE RONDA',
//     worktrip: false,
//     telework: false,
//     picture:
//       'https://media.traveler.es/photos/613770c3ea50dbd37eadfacd/16:9/w_2000,h_1125,c_limit/127157.jpg',
//     arrivalDate: {
//       dayId: 721,
//       date: '2018-05-18T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 724,
//       date: '2018-05-21T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 6,
//     name: 'PROVENCE',
//     worktrip: false,
//     telework: false,
//     picture:
//       'https://rivierabarcrawltours.com/wp-content/uploads/2020/04/provence-pic.jpg',
//     arrivalDate: {
//       dayId: 714,
//       date: '2017-12-30T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 720,
//       date: '2018-01-05T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 5,
//     name: 'THIRD WORLD TRIP',
//     worktrip: false,
//     telework: false,
//     picture: 'https://wantsee.world/wp-content/uploads/2020/05/Iran-Travel.jpg',
//     arrivalDate: {
//       dayId: 530,
//       date: '2017-03-19T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 713,
//       date: '2017-09-18T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 4,
//     name: 'GENOVESE',
//     worktrip: false,
//     telework: false,
//     picture:
//       'https://a.cdn-hotels.com/gdcs/production49/d1536/974d5bb2-79bb-44fb-94b5-95db4c37e207.jpg?impolicy=fcrop&w=800&h=533&q=medium',
//     arrivalDate: {
//       dayId: 527,
//       date: '2017-01-02T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 529,
//       date: '2017-01-04T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 3,
//     name: 'SECOND WORLD TRIP',
//     worktrip: false,
//     telework: false,
//     picture:
//       'https://whc.unesco.org/uploads/thumbs/site_0668_0067-1200-630-20151104115852.jpg',
//     arrivalDate: {
//       dayId: 218,
//       date: '2015-11-16T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 526,
//       date: '2016-09-19T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 2,
//     name: 'UKRAINE & BERLIN',
//     worktrip: false,
//     telework: false,
//     picture:
//       'https://upload.wikimedia.org/wikipedia/commons/3/3c/Ukraine-kiev-church.jpg',
//     arrivalDate: {
//       dayId: 206,
//       date: '2015-10-26T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 217,
//       date: '2015-11-06T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 1,
//     name: 'NIMES',
//     worktrip: false,
//     telework: false,
//     picture:
//       'https://upload.wikimedia.org/wikipedia/commons/6/67/Arenes_de_Nimes_panorama.jpg',
//     arrivalDate: {
//       dayId: 203,
//       date: '2015-10-06T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 205,
//       date: '2015-10-08T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
//   {
//     id: 0,
//     name: 'FIRST WORLD TRIP',
//     worktrip: false,
//     telework: false,
//     picture: 'https://wallpaperaccess.com/full/449149.jpg',
//     arrivalDate: {
//       dayId: 0,
//       date: '2015-02-17T00:00:00+00:00',
//     },
//     departureDate: {
//       dayId: 202,
//       date: '2015-09-07T00:00:00+00:00',
//     },
//     hasJournals: false,
//   },
// ];

export const options = {
  // title: 'Timeline of my trips',
  // legend: {
  //   display: 'none',
  // },
  colorAxis: {
    colors: Object.values(CHART_COLORS),
  },
  calendar: {
    cellSize: 22,
    underMonthSpace: 12,
    underYearSpace: 20,
    yearLabel: {
      color: 'black',
      bold: true,
    },
    yAxis: {
      textStyle: {
        color: '#525b60',
        fontSize: '30',
      },
    },

    // cellColor: {
    //   stroke: 'red', // Color the border of the squares.
    //   strokeOpacity: 0.5, // Make the borders half transparent.
    //   strokeWidth: 2, // ...and two pixels thick.
    // },
  },
};

function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate);

  const dates = [];

  while (date <= new Date(endDate)) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

export default function TravelTimeline({ trips }) {
  const newData = [
    [
      {
        type: 'date',
        id: 'Date',
      },
      {
        type: 'number',
        id: 'Trip',
      },
    ],
    ...trips
      .map((trip) => {
        const tripDates = getDatesInRange(trip.arrivalDate.date, trip.departureDate.date);
        return tripDates.map((date) => [date, trip.id]);
      })
      .flat(),
  ];

  console.log({ newData });

  return (
    <Chart
      chartType="Calendar"
      width="100%"
      height="1700px"
      data={newData}
      options={options}
    />
  );
}
