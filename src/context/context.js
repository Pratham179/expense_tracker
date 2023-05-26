import React, { useReducer, createContext } from 'react';

import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [{"amount":500,"category":"Investments","type":"Income","date":"2023-05-20","id":"941c1736-cc30-4f9a-962f-9f00dc3d7d96"},{"amount":700,"category":"Clothes","type":"Expense","date":"2023-05-30","id":"a2b97afe-593c-450d-8559-ffc5d78bd0a0"},{"amount":100,"category":"Salary","type":"Income","date":"2023-05-29","id":"981f705d-37c7-465b-822d-425e767a2fbf"}];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    // Action Creator 
    const deleteTransaction = (id) => {
        dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    };

    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    };

    const balance = transactions.reduce((acc, currVal) => (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 0);

    


    return (
        <ExpenseTrackerContext.Provider value={{
            transactions,
            balance,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}