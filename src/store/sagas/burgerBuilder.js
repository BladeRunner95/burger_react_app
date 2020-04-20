import axios from "../../axios-orders";
import {fetchIngredientsFailed, setIngredients} from "../actions/burgerBuilder";
import {put} from "redux-saga/effects";
import * as actions from '../actions';

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get('https://react-my-burger-70ffa.firebaseio.com/ingredients.json');
        yield put(actions.setIngredients(response.data));
    } catch (error) {
        yield put(actions.fetchIngredientsFailed());
    }
}