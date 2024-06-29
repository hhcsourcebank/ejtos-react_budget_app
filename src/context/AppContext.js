import React, { createContext, useReducer} from 'react';

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
    let budget = 0;
    switch (action.type) {
        case 'ADD_EXPENSE':
            let total_budget = 0;
            total_budget = state.expenses.reduce(
                (previousExp, currentExp) => {
                    return previousExp + currentExp.cost
                },0
            );
            total_budget = total_budget + action.payload.cost;
            action.type = "DONE";
            if(total_budget <= state.budget) {
                total_budget = 0;
                state.expenses.map((currentExp)=> {
                    if(currentExp.name === action.payload.name) {
                        currentExp.cost = action.payload.cost + currentExp.cost;
                    }
                    return currentExp
                });
                return {
                    ...state,
                };
            } else {
                alert("Cannot increase the allocation! Out of funds");
                return {
                    ...state
                }
            }
            case 'RED_EXPENSE':
            const updatedExpenses = state.expenses.map(expense => {
                if (expense.name === action.payload.name && expense.cost >= action.payload.cost) {
                    return {
                        ...expense,
                        cost: expense.cost - action.payload.cost
                    };
                }
                return expense;
            });

            return {
                ...state,
                expenses: updatedExpenses,
                budget: state.budget + action.payload.cost // Adjust budget here
            };
            case 'DELETE_EXPENSE':
            const deletedExpense = state.expenses.find(expense => expense.name === action.payload);
            const remainingExpenses = state.expenses.filter(expense => expense.name !== action.payload);

            return {
                ...state,
                expenses: remainingExpenses,
                budget: state.budget + deletedExpense.cost // Adjust budget here
            };

        case 'SET_BUDGET':
            action.type = "DONE";
            return {
                ...state,
                budget: action.payload,
            };
        case 'CHG_CURRENCY':
            action.type = "DONE";
            return {
                ...state,
                currency: action.payload,
            }
        default:
            return state;
    }
};

// 1. Sets the initial state when the app loads
const initialState = {
    budget: 20000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '$'
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
    // 4. Sets up the app state. takes a reducer, and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);
    let remaining = 0;

    if (state.expenses) {
            const totalExpenses = state.expenses.reduce((total, item) => {
            return (total = total + item.cost);
        }, 0);
        remaining = state.budget - totalExpenses;
    }

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining: remaining,
                dispatch,
                currency: state.currency,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
