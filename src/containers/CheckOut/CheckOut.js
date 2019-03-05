import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckOutSummary from '../../components/Order/CheckOutSummary/checkoutsummary'
import ContactData from './contactData/contactData'


class CheckOut extends Component {
    
    checkOutCancelHandler = () =>{
        this.props.history.goBack();
    }

    checkOutContinueHandler = () => {
        this.props.history.replace('checkout/contact-data')
    }

    render(){
        let summary = <Redirect to="/" />
        if(this.props.ings){
            console.log('[this.props.purchased - checkOut]', this.props.purchased)
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (<div>
                    {purchasedRedirect}
                    <CheckOutSummary ingredients={this.props.ings}
                    checkOutCancelled = {this.checkOutCancelHandler} checkOutContinued={this.checkOutContinueHandler}/>
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                  </div>);
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
}

export default connect(mapStateToProps)(CheckOut);