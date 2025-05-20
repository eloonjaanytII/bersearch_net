import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/ui/layout/Layout'
import {TOP_LISTS } from './constants';
import Movies from './components/pages/movies/Movies'
import MovieDetail from './components/pages/movieDetail/MovieDetail';
import Actor from './components/pages/actors/Actor';
import ActorDetail from './components/pages/actorDetail/ActorDetail';
import MovieListTop from './components/pages/movieListTop/MovieListTop';
import MovieMap from './components/pages/globalMap/MovieMap';
import Login from './components/pages/authorization/login/Login';
import SetupProfile from './components/pages/authorization/setupProfile/SetupProfile';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        ...TOP_LISTS.map(elem => ({
          path: elem.url,
          element: <MovieListTop />,
        })),
        ...TOP_LISTS.map(item => ({
          path: `${item.url}/:id`,
          element: <MovieDetail />
        })),
        {
          path: 'authorization',
          children: [
            {
              path: 'login',
              element: <Login />
            },
            {
              path: 'setup-profile',
              element: <SetupProfile />
            },
          ]
        },
        {
          path: 'movies',
          element: <Movies />,
        },
        {
          path: 'movies/:id',
          element: <MovieDetail />
        },
        {
          path: 'actors',
          element: <Actor />,
          children: [
            {
              path: ':id',
              element: <ActorDetail />
            }
          ]
        },
        {
          path: 'movie-map',
          element: <MovieMap />
        },
      ]
    },
    {
      path: '*',
      element: <div>Not found error</div>
    }
  ])
  return <RouterProvider router={router} />;
};

export default App
