import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios';
import Aux from '../../hoc/auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

export class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount (){
        this.props.onInitIngredients()
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey];
            })
            .reduce((sum, el) =>{
                return sum +el;
            }, 0);
        return sum > 0;
    }
  
    purchasedHandler = () =>{
        if(this.props.isAutheticated){
            this.setState({purchasing: true});
        }else{
            this.props.onSetRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
        

    }

    purchasedCancelHandler = () =>{
        this.setState({purchasing: false});

    }

    purchasedContinueHandler = () =>{
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        let orderSummary = null;
        if(this.props.ings){
            burger = (
            <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                    addIngredient={this.props.onIngredientsAdded}
                    removeIngredient={this.props.onIngredientsRemove}
                    disabled = {disabledInfo}
                    purchasable = {this.updatePurchaseState(this.props.ings)}
                    ordered = {this.purchasedHandler}
                    isAuth = {this.props.isAutheticated}
                    price={this.props.price}/>
            </Aux>
            );
            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            price={this.props.price}
            canceled={this.purchasedCancelHandler}
            continued={this.purchasedContinueHandler}/>;
        }
        return(
            <Aux>
                <Modal  show = {this.state.purchasing} closed={this.purchasedCancelHandler}>
                    {orderSummary}
                </Modal>
                    {burger}
            </Aux>  
        );
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAutheticated: state.auth.token !== null
        
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientsAdded: (ingName) =>dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientsRemove: (ingName) =>dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onPurchaseInit:() => dispatch(burgerBuilderActions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));