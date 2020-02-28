import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandling from "../../hoc/withErrorHandling/withErrorHandling";
import * as burgerBuilderAction from '../../store/actions/index';
import axios from '../../axios-orders';


class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        // console.log(this.props)

    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
               return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disableInfo = {
          ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if ( this.props.ings ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved = {this.props.onIngredientRemoved}
                        disabled = {disableInfo}
                        purchasable = {this.updatePurchaseState(this.props.ings)}
                        ordered = {this.purchaseHandler}
                        price = {this.props.price}/>
                </Aux>
            );
                orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}/>;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>

        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
  return {
      onIngredientAdded: (ingName) => dispatch(burgerBuilderAction.addIngredient(ingName)),
      onIngredientRemoved: (ingName) => dispatch(burgerBuilderAction.removeIngredient(ingName))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(BurgerBuilder, axios));