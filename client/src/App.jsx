import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/ui/layout/Layout'
import {TOP_LISTS } from './constants';
import Movies from './components/pages/movies/Movies'
import MovieDetail from './components/pages/movieDetail/MovieDetail';
import Actor from './components/pages/actors/Actor';
import ActorDetail from './components/pages/actorDetail/ActorDetail';
import MovieListTop from './components/pages/movieListTop/MovieListTop';
import Login from './components/pages/registration/Login';
import AvatarSelect from './components/pages/registration/AvatarSelect';
import PersonalSelect from './components/pages/registration/PersonalSelect';
import PrivateRouter from './components/ui/privateRouter/PrivateRouter';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Movies />
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
                }]
            },
          ]
        },
        {
          path: 'authorization',
          children: [
            {
              path: 'login',
              element: <Login />
            },
            {
              path: 'avatar-select',
              element: <AvatarSelect />
            },
            {
              path: 'personal-select',
              element: <PersonalSelect />
            }
          ]
        }
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
