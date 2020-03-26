import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

//path="/" Definirá a rota o qual ele acessará
//BrowserRoute e o Switch faz com que mais de uma requisição não seja feita
//Ou seja, ele controla as rotas
//Exact faz com que o caminha seja estritamente o que está em path
export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />

                <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} />

            </Switch>
        </BrowserRouter>
    );
}