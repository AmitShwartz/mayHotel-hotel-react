import React from "react";
import styled from "styled-components";
import moment from "moment";

const Container = styled.div`
  width: 300px;
  position:fixed;
  top:100px;
  left:0;
  z-index:1000;
  opacity:.8;
  transition:opacity .2s;
  &:hover{
      opacity:1;
  }
  border:1px solid #173b5f;
  border-radius:4px;
  color:#fff;
`;

const Item = styled.div`
  background-color: #2196f3;
  padding:10px;
  &:not(:last-child) {
      border-bottom:1px solid #173b5f;
  }
`;

const Top = styled.div`
text-align:center;
font-size:18px;
background-color: #2196f3;
padding:10px;
`;

export default ({ number, user, guest_amount, startdate, enddate }) => {
  return (
    <Container>
      <Top>חדר {number}</Top>
      <Item>ת.ז אורח:{` ${user}`}</Item>
      <Item>מס' אורחים:{` ${guest_amount}`}</Item>
      <Item>תאריך כניסה:{` ${moment(startdate).format("DD/MM/YYYY")}`}</Item>
      <Item>תאריך יציאה:{` ${moment(enddate).format("DD/MM/YYYY")}`}</Item>
    </Container>
  );
};
