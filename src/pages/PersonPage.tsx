/*
This page should contain overview of the player
- List of producers the person has worked with and how many times.
- Birth year
- Person species average height.
- Paginated list of person films containing:
  - Title.
  - Release Date.
  - Number of planets without water in the film.
*/

import { useQuery } from "urql";
import { useParams } from "react-router-dom";
import {
  Film,
  PersonDocument,
  PersonQuery,
  Planet,
} from "../generated/graphql";
import { useEffect, useState } from "react";

const getAllProducersWorkCount = (films: Film[]): {} | Object => {
  const producerCounts = films?.reduce((acc, film) => {
    film.producers?.forEach((producer) => {
      if (producer) {
        acc[producer] = (acc[producer] || 0) + 1;
      }
    });
    return acc;
  }, {});
  return producerCounts || {};
};
const getCountOfPlanetsNoWater = (planets: Planet[]) => {
  let count = 0;
  planets?.forEach((planet) => {
    if (!planet?.surfaceWater) {
      count += 1;
    }
  });
  return count;
};

const PersonPage = () => {
  const { personId } = useParams();
  const [result] = useQuery<PersonQuery>({
    query: PersonDocument,
    variables: { id: personId },
  });
  const { data, error, fetching } = result;
  const [producers, setProducers] = useState({});

  useEffect(() => {
    setProducers(getAllProducersWorkCount(data?.person?.filmConnection?.films));
  }, []);

  if (error) return <>Error</>;
  if (fetching) return <>Loading...</>;

  return (
    <div>
      {!data?.person ? (
        ""
      ) : (
        <>
          <h1>{`${data?.person.name}`}</h1>
          <div>{`Birth year ${data?.person.birthYear}`}</div>
          <div>{`Average height ${data?.person.species?.averageHeight}`}</div>
          <div>{`Producers ${producers}`}</div>
          <div>
            {data?.person?.filmConnection?.films[0]?.title}
            {data?.person?.filmConnection?.films[0]?.releaseDate}
            Planets no water{" "}
            {getCountOfPlanetsNoWater(
              data?.person?.filmConnection?.films[1]?.planetConnection?.planets
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PersonPage;
