import React, { useEffect } from "react";
import Box from "./Box";
import PageHeading from "./PageHeading";
import RouteList from "./RouteList";
import AddTherepist from "./AddTherepist";
import SpaDateForm from "./SpaDateForm";
import SpaList from "./SpaList";
import { Route } from 'react-router-dom';

const pageLinks = [
  {
    title: "הוסף מטפל",
    component: AddTherepist,
    path: "/spa/therepist"
  },
  {
    title: "הזמנות קיימות",
    component: SpaDateForm,
    path: "/spa/search"
  }
];

const nestedRoutes = pageLinks.map(link => ({
  path: link.path,
  component: link.component
}));

const EventView = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <PageHeading title="ספא" links={pageLinks} />
      <Box className="reception-view" content>
        <RouteList routes={nestedRoutes} />
      </Box>
      <Route path="/spa/appointments" component={SpaList} />
    </>
  );
};

export default EventView;
