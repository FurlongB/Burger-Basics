import React, {Component} from 'react'
import classes from './Modal.css'
import Aux from '../../../hoc/auxiliary'
import BackDrop from '../BackDrop/BackDrop'


class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate(){
        console.log('[Modal] Will Update')
    }

    render(){
        return(
            <Aux>
        <BackDrop show={this.props.show} closed={this.props.closed}/>
        <div className={classes.Modal}
            style={{transform: this.props.show ? 'translateY(0)': 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
            }}>
            {this.props.children}
        </div> 
        
    </Aux>
        );

    }
}

export default Modal