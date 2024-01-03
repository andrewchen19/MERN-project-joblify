import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  AddJob,
  AllJobs,
  EditJob,
  Error,
  Landing,
  Layout,
  Login,
  Profile,
  Register,
  Stats,
} from "./pages";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * (1000 * 60), // 10 mins
      cacheTime: 5 * (1000 * 60), // 5 mins
    },
  },
});

// loaders
import { loader as statsLoader } from "./pages/Stats";
import { loader as profileLoader } from "./pages/Profile";
import { loader as addJobLoader } from "./pages/AddJob";
import { loader as allJobsLoader } from "./components/AllJobsFilter";
import { loader as editJobLoader } from "./pages/EditJob";

// actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as profileAction } from "./components/ProfileFilter";
import { action as addJobAction } from "./components/AddJobFilter";
import { action as editJobAction } from "./components/EditJobFilter";

// store
import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    // 共同部分
    element: <Layout />,
    // global error
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Stats />,
        loader: statsLoader(store, queryClient),
      },
      {
        path: "/all-jobs",
        element: <AllJobs />,
        loader: allJobsLoader(store, queryClient),
      },
      {
        path: "/edit-job/:id",
        element: <EditJob />,
        loader: editJobLoader(store),
        action: editJobAction(queryClient),
      },
      {
        path: "/add-job",
        element: <AddJob />,
        loader: addJobLoader(store),
        action: addJobAction(queryClient),
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: profileLoader(store),
        action: profileAction(store),
      },
    ],
  },
  // 這三個 route 沒有使用共同部分
  {
    path: "/landing",
    element: <Landing />,
    // global error
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    // global error
    errorElement: <Error />,
    action: registerAction,
  },
  {
    path: "/login",
    element: <Login />,
    // global error
    errorElement: <Error />,
    action: loginAction(store),
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

export default App;
