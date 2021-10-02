import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import apis from "../api";

function randomNum() {
  return Math.floor(Math.random() * 100);
}

const Container = styled.div`
  width: 70%;
  margin: auto;
`;
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: blue;
  text-decoration: underline;
  padding-right: 0.5em;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
`;
const Image = styled.div`
  background: ${(props) => `url(${props.icon})`};
  background-size: contain;
  background-repeat: no-repeat;
  width: 5em;
  height: 5em;
  display: flex;
  justify-content: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Text = styled.p`
  text-align: center;
`;
const Link = styled.a`
  text-align: center;
  display: flex;
  justify-content: center;
`;

const Item = styled.li`
  list-style: none;
  text-align: left;
  border: 1px solid black;
`;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Table = styled.table`
  border: 1px solid black;
  margin: 0;
`;
const Row = styled.tr`
  border: 1px solid black;
`;

const TD = styled.td`
  border: 1px solid black;
  text-align: center;
`;

const TH = styled.th`
  border: 1px solid black;
`;
export default function TeamDetails() {
  let { id } = useParams();
  const [team, setTeam] = useState({});

  useEffect(() => {
    apis
      .getTeamById(id)
      .then((res) => {
        let team = res.data;
        let { name, address, website, crestUrl, founded } = team;
        console.log(team);
        let squadArr = team.squad.slice(0, 10);
        setTeam({ name, address, crestUrl, website, founded, squadArr });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <TitleContainer>
        <Title>{team.name}</Title>
        <ImageContainer>
          <Image icon={team.crestUrl}> </Image>
        </ImageContainer>
      </TitleContainer>
      <Text>founded: {team.founded}</Text>
      <Link href={team.website}>go to site</Link>
      <Text>{team.address}</Text>
      <Title>Players</Title>
      <TableContainer>
        <Table>
          <Row>
            <TH>Name</TH>
            <TH>Shirt Number</TH>
          </Row>
          {team.squadArr &&
            team.squadArr.map((player) => {
              return (
                <Row>
                  <TD>{player.name}</TD>
                  <TD>{player.shirtNumber || randomNum()}</TD>
                </Row>
              );
            })}
        </Table>
      </TableContainer>
    </Container>
  );
}
