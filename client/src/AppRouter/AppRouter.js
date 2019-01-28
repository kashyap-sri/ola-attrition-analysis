import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import ConsContainer from '../components/ConsContainer';
import ProsContainer from '../components/ProsContainer';
import Summary from '../components/Summary';
import Comparison from '../components/Comparison';
import Landing from '../components/Landing';
import EndPage from '../components/EndPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch> 

                <Route path="/" component={Landing} exact={true}/>
                <Route path="/summaryOla" component={Summary} exact={true}/>
                <Route path="/pros" component={ProsContainer} exact={true}/>
                <Route path="/cons" component={ConsContainer} exact={true}/>
                <Route path="/summaryUber" component={() => <Summary company="uber" />} exact={true}/>
                <Route path="/comparison" component={Comparison} exact={true}/>
                <Route path="/endpage" component={EndPage} exact={true}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;