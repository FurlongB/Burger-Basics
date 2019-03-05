import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state={
        sideDrawerClose: false
    }

    sideDrawerClosedHandler = () =>{
        this.setState({sideDrawerClose: false})
    }

    sideDrawerToggleHandler = () =>{
        this.setState( (prevState) => {
            return {sideDrawerClose: !prevState.sideDrawerClose};
        })
    }

    render(){
        return(
            <Aux>
                <Toolbar 
                isAuth={this.props.isAuthenicated}
                toggleClicked = {this.sideDrawerToggleHandler}/>
                <SideDrawer 
                isAuth={this.props.isAuthenicated}
                open={this.state.sideDrawerClose} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main> 
             </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return{
        isAuthenicated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);