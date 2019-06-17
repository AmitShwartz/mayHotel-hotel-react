import React, { useEffect } from "react";
import Box from "./Box";
import PageHeading from "./PageHeading";
import RouteList from "./RouteList";
import Rooms from "./Rooms";
import AvailableRooms from "./AvailableRooms";
import Checkout from "./Checkout";
import Checkin from "./Checkin";

const pageLinks = [
  {
    title: "חדרים",
    component: Rooms,
    path: "/reception/rooms"
  },
  {
    title: "חדרים פנויים",
    component: AvailableRooms,
    path: "/reception/availablerooms"
  },
  {
    title: "צ'ק אין",
    component: Checkin,
    path: "/reception/checkin"
  },
  {
    title: "צ'ק אאוט",
    component: Checkout,
    path: "/reception/checkout"
  }
];

const nestedRoutes = pageLinks.map(link => ({
  path: link.path,
  component: link.component
}));

const ReceptionView = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <PageHeading title="קבלה" links={pageLinks} />
      <Box className="reception-view" content>
        <RouteList routes={nestedRoutes} />
      </Box>
    </>
  );
};

export default ReceptionView;
