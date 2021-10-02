import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 70%;
  margin: auto;
`;
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: blue;
  text-decoration: underline;
`;
const Table = styled.table`
  border: 1px solid black;
  margin: 0;
`;
const Row = styled.tr`
  border: 1px solid black;

  &:hover {
    background:#CAC9C9 ;
  }
`;
const TD = styled.td`
  border: 1px solid black;
`;
const TH = styled.th`
  border: 1px solid black;
`;
const SubContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function TeamTable({ list }) {
  let history = useHistory();

  useEffect(() => {
    history.push("/teams");
  }, []);

  function updateChosenIndex(groupIndex) {
    history.push(`/teams/${groupIndex}`);
  }
  return (
    <Container>
      <Title>Football Teams: </Title>
      <SubContainer>
        <Table>
          <Row>
            <TH>Name</TH>
            <TH>Founded</TH>
            <TH>Address</TH>
          </Row>
          {list.map((item) => {
            return (
              <Row onClick={() => updateChosenIndex(item.id)}>
                <TD>{item.name}</TD>
                <TD>{item.founded}</TD>
                <TD>{item.address}</TD>
              </Row>
            );
          })}
        </Table>
      </SubContainer>
    </Container>
  );
}