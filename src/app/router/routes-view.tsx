import { createRoutesView } from "atomic-router-react";
import { routes } from "@/pages";

export const RoutesView = createRoutesView({
    routes: routes.map(({route, view}) => ({ route, view })),
});