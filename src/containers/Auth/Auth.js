import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {updateObject, checkValidity} from '../../shared/utility'

class Auth extends Component {
    state = {
        controls:{
            email:{
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password:{
                elementType: 'input',
                elementConfig:{
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignedUp: true
    }

    componentDidMount(){
        if(!this.props.buildBurger && this.props.onSetRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, ControlName) =>{
        const updatedControls = updateObject(this.state.controls, {
            [ControlName]:updateObject(this.state.controls[ControlName],{
                 value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[ControlName].validation),
                touched: true
            })
        })
        this.setState({controls: updatedControls});
        
    }

    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignedUp)
    }

    signUpHandler = () =>{
        this.setState(prevState =>{
            return{isSignedUp: !prevState.isSignedUp}
        })
    }
    
    render(){
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]

            });
        }
        let form = formElementsArray.map(formElement =>(
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
        ))
        
        if(this.props.loading){
            form = <Spinner/>
        }

        let errorMessage = null

        if(this.props.error){
            errorMessage = (<p>{this.props.error.message}</p>);
        }

        let onRedirect = null;
        if(this.props.isAuthenticated){
            onRedirect = <Redirect to={this.props.onSetRedirectPath} />
        }

        return(
            <div className={classes.Auth}>
                {onRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.signUpHandler}>Switch To {this.state.isSignedUp ? 'Sign In' : 'Sign Up'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildBurger: state.burgerBuilder.building,
        onSetRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email, password, isSignUp) => dispatch (actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);