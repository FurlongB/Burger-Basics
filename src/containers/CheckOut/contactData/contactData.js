import React, {Component} from 'react';
import axios from '../../../axios';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './contactData.css'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject, checkValidity} from '../../../shared/utility';

class contactData extends Component{
    state={
        orderForm:{
            name:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            street:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Eircode'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email:{
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig:{
                    options:[
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const orderData = {};
        for (let formID in this.state.orderForm){
            orderData[formID] = this.state.orderForm[formID].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            formData: orderData,
            userId: this.props.userID
        }
        this.props.orderBurger(order, this.props.token);
        
    }

    inputChangedHandler = (event, eventID) => {
        const orderFormUpdate = updateObject(this.state.orderForm[eventID],{
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[eventID].validation),
            touched: true
        })

        const updatedOrderForm = updateObject(this.state.orderForm,{
            [eventID]: orderFormUpdate
        })
        
        let formIsValid = true;
        for (let inputID in updatedOrderForm){
            formIsValid = updatedOrderForm[inputID].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render(){
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]

            });
        }
        let form =(<form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement =>(
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value = {formElement.config.value}
                    invalid = {!formElement.config.valid}
                    shouldValidate = {formElement.config.validation}
                    touched = {formElement.config.touched}
                    changed = {(event) => this.inputChangedHandler(event, formElement.id)}
                />
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
        </form>);
           if(this.props.loading){
               form = <Spinner />;
           }
        return(        
            <div className={classes.ContactData}>
            <h4>Enter your Contact Details</h4>
            {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userID: state.auth.userID
    };
}

const mapDispatchToProps = dispatch  => {
   return{
        orderBurger: (orderData, token) =>{dispatch(actions.purchaseOrderStart(orderData, token))}
   }
 
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(contactData, axios));