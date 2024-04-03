import { Opportunities } from "./components/Opportunities";
import { Accounts } from "./components/Accounts";
import { Account } from "./components/Account";
import { Home } from "./components/Home";

const AppRoutes = [
    {
        index: true,
        element: <Home />
     },
    {
        path: '/accounts',
        element: <Accounts />
    },
    {
        path: '/account/:id',
        element: <Account />
    },
    {
        path: '/opportunities',
        element: <Opportunities />
    }
];

export default AppRoutes;
