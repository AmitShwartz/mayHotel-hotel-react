import React, { useState, useEffect, useCallback } from "react";
import "react-table/react-table.css";
import {Icon} from 'semantic-ui-react'
import ReactTable from "react-table";
import { RoomApi } from "../apis/api";
import Loader from "react-loader";
import { Switch } from "@material-ui/core";
import UserRoomData from "./UserRoomData";
import Box from "./Box";

const columns = [
  {
    Header: "מספר חדר",
    accessor: "number"
  },
  {
    Header: "כמות אכלוס",
    accessor: "capacity"
  },
  {
    Header: "ניקיון",
    accessor: "clean",
    Cell: props => {
      if(props.row.clean){
        return <Icon name='checkmark' color='green'></Icon>
      }else{
        return <Icon name='times' color='red'></Icon>
      }
      // return <Switch checked={props.row.clean} color="primary" />;
    }
  },
  {
    Header: "פנוי",
    accessor: "available",
    Cell: props => {
      if(props.row.available){
        return <Icon name='checkmark' color='green'></Icon>
      }else{
        return <Icon name='times' color='red'></Icon>
      }
      // return <Switch checked={props.row.available} color="primary" />;
    }
  }
].reverse();

const Rooms = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomIdx, setRoomIdx] = useState();
  const [roomsData, setRoomsData] = useState();

  const rowSettings = (state, rowInfo) => {
    if (rowInfo && rowInfo.row) {
      const _room = data[rowInfo.index];
      const isAvailable = _room.available;
      return {
        onClick: e => {
          if (isAvailable) return;
          setRoomIdx(rowInfo.index);
        },
        style: {
          background:
            rowInfo.index === roomIdx && !isAvailable ? "#2ecc71" : "white",
          color: rowInfo.index === roomIdx && !isAvailable ? "white" : "black"
        }
      };
    } else {
      return {};
    }
  };

  useEffect(() => {
    let cancel = false;
    (async () => {
      const result = await RoomApi.getAll();
      setRoomsData(result.data.data);
      const _data = result.data.data.map(room => ({
        number: room.number,
        capacity: room.capacity,
        clean: room.room_service.clean.is_handle,
        available: !Boolean(room.user)
      }));
      if (cancel) return;
      setData(_data);
      setLoading(false);
    })();

    return () => {
      cancel = true;
    };
  }, []);

  const _selectedRoom = data[roomIdx];
  const _roomData = _selectedRoom
    ? (roomsData || []).find(r => r.number === _selectedRoom.number)
    : null;

  return (
    <Loader loaded={!loading}>
      <Box>
        {_roomData
          ? `מציג מידע על חדר ${_roomData.number}`
          : "למידע על הזמנה, בחר חדר תפוס"}
      </Box>
      {_roomData ? <UserRoomData {..._roomData} /> : <></>}
      <ReactTable
        columns={columns}
        data={data}
        minRows={1}
        getTrProps={rowSettings}
      />
    </Loader>
  );
};

export default Rooms;
