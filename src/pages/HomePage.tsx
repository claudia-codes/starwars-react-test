import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "urql";

const query = gql`
  query Home {
    allPeople {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

/* 
  This page should list all the people from the Star Wars API. Each person should
  be linked to its own page.

*/

const HomePage = () => {
  const [result] = useQuery({ query });
  const {data, error, fetching} = result;
  const navigate = useNavigate();

  if (error) return <>Error</>;
  if (fetching) return <>Loading...</>;

  console.log(result?.data.allPeople.edges);
  const handleClick = (personId: string) => navigate(`person/${personId }`);

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {data?.allPeople.edges.map(({ node: { name, id } }) => (
          <li key={id} onClick={() => handleClick(id)}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
