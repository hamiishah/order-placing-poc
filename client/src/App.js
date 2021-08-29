import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './Components/Login';
import 'antd/dist/antd.css';
import Resetpassword from "./Components/User/resetPassword";
import Layout from "./Components/Page/layout";
import Admin from "./Components/Admin";
import Header from './Components/Page/header'
import User from './Components/User'
import Assistant from './Components/assistant'
import Order from './Components/Admin/order';

function App() {
  return (
    <div>
        <Router>
            <Switch>
                <Route path="/" exact component={LoginPage} />
                <Route path="/forgetpassword" exact component={Resetpassword} />
                <Route path="/layout" exact component={Layout} />
                <Route path="/admin" exact component={Admin} />
                <Route path="/admin/orders" exact component={Order} />
                <Route path='/header' exact component={Header}/>
                <Route path='/user' exact component={User}/>
                <Route path='/assistant' exact component={Assistant}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
