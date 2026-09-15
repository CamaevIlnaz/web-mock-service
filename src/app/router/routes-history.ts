import { createHistoryRouter } from "atomic-router";
import { createBrowserHistory } from "history";
import { routes } from "@/pages";

export const router = createHistoryRouter({
  routes: routes.map(({path, route}) => ({ path, route }))
});
    
router.setHistory(createBrowserHistory());