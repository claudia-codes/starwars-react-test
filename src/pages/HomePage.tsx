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

const HomePage = () => {
  const [result] = useQuery({ query });

  if (result.error) return <>Error</>;
  if (result.fetching) return <>Loading...</>;

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {result?.data.allPeople.edges.map(({ node: { name } }) => (
          <li>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
