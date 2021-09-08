import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signin from './components/Auth/Signin/Signin'
import Register from './components/Auth/Register/Register'
import PrivateRoute from './components/Auth/PrivateRoute'
import AdminRoute from './components/Auth/AdminRoute'
import CustomerSARoute from './components/Auth/CustomerSARoute'
import Customer from './components/Customer/CustomerDashboard/CustomerDashboard'
import CustomerSA from './components/CustomerSA/CustomeSADashboard/CustomerSADashboard'
import Admin from './components/Admin/AdminDashboard/AdminDashboard'
import CustomerEditTicket from './components/CustomerSA/CustomerEditTicket'
import NewTicket from './components/Admin/AdminManage/NewTicket'
import NewUser from './components/Admin/AdminManage/NewUser'
import ViewUsers from './components/Admin/ViewUsers'
import App from './App'
import TicketInfo from './components/Customer/TicketInfo/TicketInfo'

const Routes = () =>{
    return(
        <BrowserRouter>
            <Switch>
            <Route path="/" exact >
                    <App />
            </Route>
                <Route path='/signin' exact component={Signin} />
                <Route path='/register' exact component={Register} />
                <PrivateRoute path='/customer/dashboard' exact component={Customer} />
                <PrivateRoute path='/customer/ticketInfo/:ticketId' exact component={TicketInfo} />
                <CustomerSARoute path='/customersa/dashboard' exact component={CustomerSA} />
                <CustomerSARoute path='/customersa/editTicket/:ticketId' exact component={CustomerEditTicket} />
                <CustomerSARoute path='/customersa/ticketInfo/:ticketId' exact component={TicketInfo} />
                <AdminRoute path='/admin/ticketInfo/:ticketId' exact component={TicketInfo} />
                <AdminRoute path='/admin/dashboard' exact  component={Admin} />
                <AdminRoute path='/admin/createTicket' exact component={NewTicket} />
                <AdminRoute path='/admin/createUser' exact component={NewUser} />
                <AdminRoute path='/admin/editTicket/:ticketId' exact component={CustomerEditTicket} />

            </Switch>
        </BrowserRouter>
    )
}

export default Routes