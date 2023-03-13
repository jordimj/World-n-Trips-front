interface Ephemeris {
  dayId: number;
  date: string;
  sleptAt: string;
  trip: string;
  city: string;
  state: string;
  country: {
    name: string;
    alpha3code: string;
  };
}

export interface EphemerisList extends Array<Ephemeris> {}
