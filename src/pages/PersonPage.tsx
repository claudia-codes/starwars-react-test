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
import { Carousel, Container, ListGroup } from "react-bootstrap";

const getAllProducersWorkCount = (
  films: Film[] | undefined | null
): Record<string, number> => {
  let producerCounts: any = {};

  films?.map((film: Film) => {
    film?.producers?.forEach((producer) => {
      if (producer) {
        
        producerCounts[producer] = !producerCounts[producer]
        ? 1
        : producerCounts[producer] + 1;

      }
    });
  });
  console.log(producerCounts);
  return producerCounts;
};
const getCountOfPlanetsNoWater = (planets: Planet[]) => {
  let count = 0;
  planets?.forEach((planet: Planet) => {
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
  const [currentFilmIndex, setCurrentFilmIndex] = useState(0);

  const handleFilmSelect = (selectedIndex: number) =>
    setCurrentFilmIndex(() => selectedIndex);

  useEffect(() => {
    const validFilms = data?.person?.filmConnection?.films;
    setProducers(()=>getAllProducersWorkCount(validFilms));
  }, [data]);

  if (error) return <Container>Error</Container>;
  if (fetching) return <Container>Loading...</Container>;

  return (
    <Container style={{ width: "50vw", textAlign: "center" }}>
      {!data?.person ? (
        ""
      ) : (
        <>
          <h2 className="bg-body-primary" style={{ textAlign: "center" }}>
            {data?.person.name}
          </h2>
          <br />
          <div>{`Birth year: ${data?.person.birthYear}`}</div>
          <div>{`Average height: ${
            data?.person.species?.averageHeight || 0
          }`}</div>

          <br />
          <h5>List of producers:</h5>
          <ListGroup
            style={{
              width: "20rem",
              margin: "0 auto",
            }}
            variant="flush"
          >
            {Object.entries(producers).map(([producerName, collaborationsCount]) => (
              <ListGroup.Item>{`${producerName} - ${collaborationsCount} collaborations`}</ListGroup.Item>
            ))}
          </ListGroup>

          <br />
          <h4>Films: </h4>
          <Carousel
            interval={null}
            activeIndex={currentFilmIndex}
            onSelect={handleFilmSelect}
          >
            {data?.person?.filmConnection?.films?.map((film, index) => (
              <Carousel.Item
                key={index}
                className="bg-dark text-light"
                style={{
                  height: "20rem",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Container
                  style={{
                    height: "20rem",
                    marginTop: "7rem",
                  }}
                >
                  <h5>{film?.title}</h5>
                  <p>{film?.releaseDate}</p>
                  <p>
                    Number of planets without water:{" "}
                    {getCountOfPlanetsNoWater(film?.planetConnection?.planets)}
                  </p>
                </Container>
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      )}
    </Container>
  );
};

export default PersonPage;
