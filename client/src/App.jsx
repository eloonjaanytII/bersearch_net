import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/ui/layout/Layout'
import {TOP_LISTS } from './constants';
import Movies from './components/pages/movies/Movies'
import MovieDetail from './components/pages/movieDetail/MovieDetail';
import Actor from './components/pages/actors/Actor';
import ActorDetail from './components/pages/actorDetail/ActorDetail';
import MovieListTop from './components/pages/movieListTop/MovieListTop';
import Registration from './components/pages/registration/Registration';
import AvatarSelect from './components/pages/registration/AvatarSelect';
import PersonalSelect from './components/pages/registration/PersonalSelect';
import PrivateRouter from './components/ui/privateRouter/PrivateRouter';
import PublicRouter from './components/ui/publicRouter/PublicRouter';
import AuthProvider from './components/ui/authProvider/AuthProvider';
import UserPage from './components/pages/userPage/UserPage';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/', element: <Layout />,
      children: [
        {
          path: '', element: <Movies />
        },
        {
          element: <PrivateRouter />,
          children: [
            ...TOP_LISTS.map(elem => ({
            path: elem.url,
            element: <MovieListTop />,
            })),
            ...TOP_LISTS.map(item => ({
            path: `${item.url}/:id`,
            element: <MovieDetail />})),
            {
              path: 'movies/:id', element: <MovieDetail />
            },
            {
              path: 'user/:id', element: <UserPage />
            },
            {
              path: 'actor/:id', element: <ActorDetail />,
            },
          ]
        },
      ]
    },
    {
      path: '/authorization',
      element: <PublicRouter />,
      children: [
        {path: 'register', element: <Registration />},
        {path: 'avatar-select', element: <AvatarSelect />},
        {path: 'personal-select', element: <PersonalSelect />}
      ]
    },
    {
      path: '*', element: <div>Not found error</div>
    }
  ])
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App
