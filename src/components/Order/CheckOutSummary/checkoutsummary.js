import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './checkoutsummary.css';

const checkOutSummary = (props) =>{
    return(
        <div className={classes.checkOutSummary}>
            <h1>We Hope it tastes perfect</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.checkOutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkOutContinued}>CONTINUE</Button>
            
        </div>
    )
}

export default checkOutSummary