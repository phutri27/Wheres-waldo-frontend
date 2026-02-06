import Homepage from "./components/Homepage/Homepage";
import SpecificMap from "./components/Map/SpecificMap";

const routes = [
    {
        path: "/",
        element: <Homepage />
    },
    {
        path: "/:map_id",
        element: <SpecificMap />
    }
]

export default routes