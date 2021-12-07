import { Fragment, useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import routes from './routes/routes';

import Layout from './components/layout/Layout';

import { useDispatch } from 'react-redux';
import { setCurrentEmployee } from './store/employeeSlice';

import axiosInstance from './helpers/axiosInstance';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get('/employees')
      .then((response) => {
        if (response) {
          dispatch(
            setCurrentEmployee(
              response.data.employees.find((item) => item.empId === 1)
            )
          );
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <Fragment>
      <Layout>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component isLoading={loading} />}
            />
          ))}
        </Routes>
      </Layout>
    </Fragment>
  );
}

export default App;
