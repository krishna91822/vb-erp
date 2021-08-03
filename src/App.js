import { Route, Switch, Redirect } from 'react-router-dom';

import Templates from './pages/Templates';

import Layout from './components/layout/Layout'

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/templates' />
        </Route>
        <Route path='/templates' exact>
          <Templates />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
