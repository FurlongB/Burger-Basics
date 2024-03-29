import React from 'react'

import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem  link="/" exact>Burger Builder</NavigationItem>
        {props.isAuthenicated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        { !props.isAuthenicated 
        ? <NavigationItem link="/auth">Authentication</NavigationItem>
        : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems