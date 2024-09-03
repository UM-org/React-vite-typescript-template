import React, { lazy, Suspense } from "react";
import CustomLoadingOverlay from "../components/customLoading/CustomLoadingOverlay";
import { PATH_APP } from "./paths";
import { useRoutes } from "react-router-dom";

const Loadable = (Component: React.FC) => (props: typeof Component.propTypes) => {

    return (
        <Suspense fallback={<CustomLoadingOverlay />}>
            <Component {...props} />
        </Suspense>
    );
};

export default function AppRoutes() {

    return useRoutes([
        {
            path: PATH_APP.general.landing,
            element: (
                <Landing />
            )
        },
        {
            path: "*",
            element: (
                <Page404 />
            )
        }
    ])
};


const Landing = Loadable(lazy(() => import('@pages/landing/LandingPage')));
const Page404 = Loadable(lazy(() => import('@pages/errors/Page404')));