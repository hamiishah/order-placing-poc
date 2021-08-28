import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './Components/Login/index';
import 'antd/dist/antd.css';
import Resetpassword from "./Components/User/resetPassword";
import Layout from "./Components/Page/layout";
import Admin from "./Components/Admin/index";
import Header from './Components/Page/header/index'
import User from './Components/User/index'
import Assistant from './Components/assistant/index'
import Order from './Components/Admin/order';

function App() {
  return (
    <div>
        <Router>
            <Switch>
                <Route path="/" exact component={LoginPage} />
                <Route path="/resetpassowrd" exact component={Resetpassword} />
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
