/* 
  This page should list all the people from the Star Wars API. Each person should
  be linked to its own page.
*/
import { useNavigate } from "react-router-dom";
import { useQuery } from "urql";
import { HomeQuery, HomeDocument } from "../generated/graphql";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "react-bootstrap";

const HomePage = () => {
  const [result] = useQuery<HomeQuery>({ query: HomeDocument });
  const { data, error, fetching } = result;
  const navigate = useNavigate();

  if (error) return <Container>Error</Container>;
  if (fetching) return <Container>Loading...</Container>;

  const handleClick = (personId: string | undefined) =>
    navigate(`person/${personId}`);

  return (
    <Container>
      <h2 style={{ textAlign: "center" }}>
        People
      </h2>

      <Row className="mt-3">
        {data?.allPeople?.edges?.map((edge, id) => (
          <Col key={id} sm={12} md={6} lg={4} xl={3}>
            <Card
              key={id}
              onClick={() => handleClick(edge?.node?.id)}
              style={{
                width: "20rem",
                height: "5rem",
                margin: "1rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card.Title>{edge?.node?.name}</Card.Title>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
