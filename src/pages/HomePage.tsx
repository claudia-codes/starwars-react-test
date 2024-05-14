/* 
  This page should list all the people from the Star Wars API. Each person should
  be linked to its own page.
*/
import { useNavigate } from "react-router-dom";
import { useQuery } from "urql";
import { HomeQuery, HomeDocument } from "../generated/graphql";

const HomePage = () => {
  const [result] = useQuery<HomeQuery>({ query: HomeDocument });
  const { data, error, fetching } = result;
  const navigate = useNavigate();

  if (error) return <>Error</>;
  if (fetching) return <>Loading...</>;

  const handleClick = (personId: string) => navigate(`person/${personId}`);

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
