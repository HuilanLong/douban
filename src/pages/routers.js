import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Detail from './detail';
import Home from './home';


export default function MyRouter() {
    return <Router>
        <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/detail" component={Detail}></Route>
        </Switch>
    </Router>
}