import { gql, useQuery } from "urql";
import { useParams } from "react-router-dom";

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

const query = gql`
  query PersonPage($id: ID) {
    person(id: $id) {
      birthYear
      species {
        averageHeight
      }
      filmConnection {
        films {
          producers
          title
          releaseDate
          planetConnection {
            planets {
              surfaceWater
            }
          }
        }
      }
    }
  }
`;
const PersonPage = () => {
  const { personId } = useParams();
  const [result] = useQuery({ query, variables: { id: personId } });
  const { data, error, fetching } = result;

  console.log(result);

  if (error) return <>Error</>;
  if (fetching) return <>Loading...</>;
  
  return (
    <div>
      <h1>Person</h1>
      <div>{`Birth year ${data?.person.birthYear}`}</div>
      <div>{`Average height ${data?.person.birthYear}`}</div>
    </div>
  );
};

export default PersonPage;
