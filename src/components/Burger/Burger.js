import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {

    let transformedIngs = Object.keys(props.ingredients).map(igKey =>{
        return [...Array(props.ingredients[igKey])].map((_,i) => {
             return <BurgerIngredients key={igKey+i} type={igKey}/>
         })
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, [])
    if(transformedIngs.length === 0){
        transformedIngs = <p>Please Start adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {transformedIngs}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );
}

export default burger;