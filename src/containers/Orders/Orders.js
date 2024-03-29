import React, {Component} from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';

import axios from '../../axios';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{
    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userID);
    }
    
    render(){
        let orders = <Spinner />
        if(!this.props.loading){
            orders = this.props.order.map(order =>(
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} 
                />
            ))
        }
        return(
            <div>
                {orders}
            </div>
        );
    }

}

const mapStateToProps = state =>{
    return{
        order: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userID: state.auth.userID
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrders : (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));