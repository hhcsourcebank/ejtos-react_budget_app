import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const AllocationForm = (props) => {
    const { dispatch,remaining, currency} = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');
    const [hoveredText, setHoveredText] = useState('Currency'); 

    const handleHover = (event) => {
        const currencyText = event.target.getAttribute('data-text');
        setHoveredText(currencyText); // Handler for hover events
    };

    const handleSelectionChange = (event) => {
        dispatch({ type: 'CHG_CURRENCY', payload: event.target.value }); // Handler for currency selection change
    }; 

    useEffect(() => {
        // Additional effects can be placed here for currency change, if any
    }, [currency]); 
    
    
    const submitEvent = () => {

            if(cost > remaining) {
                alert(`The value cannot exceed remaining funds ${currency}${remaining}`);
                setCost("");
                return;
            }

        const expense = {
            name: name,
            cost: parseInt(cost),
        };
        if(action === "Reduce") {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
                dispatch({
                    type: 'ADD_EXPENSE',
                    payload: expense,
                });
            }
    };

    return (
        <div>      
            <div className='row' style={{ marginRight: '10rem'}}>
                <div className="input-group mb-3" style={{ marginRight: '1rem'}}>
                    <div className="input-group-prepend" >
                        <label className="input-group-text" htmlFor="inputGroupSelect03">Currency</label>
                    </div>  
                    {/* Currency label */}
                    <select 
                        id="currencyDropdown"
                        className="custom-select"
                        style={{ backgroundColor: 'lightgreen', color: 'white', marginRight: '1rem'}}
                        onChange={handleSelectionChange}
                    >
                        <option value="" disabled selected>Choose...</option>
                        <option value="$" data-text="Currency ($ Dollar)" onMouseOver={handleHover}>Dollar ($)</option>
                        <option value="£" data-text="Currency (£ Pound)" onMouseOver={handleHover}>Pound (£)</option>
                        <option value="€" data-text="Currency (€ Euro)" onMouseOver={handleHover}>Euro (€)</option>
                        <option value="₹" data-text="Currency (₹ Ruppee)" onMouseOver={handleHover}>Ruppee (₹)</option>
                    </select>
        


                    <div className="input-group-prepend" style={{marginRight: '0rem' }}>
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
                    </div>
                    <select className="custom-select" style={{ marginRight: '1rem' }} id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}>
                        <option defaultValue>Choose...</option>
                        <option value="Marketing" name="marketing"> Marketing</option>
                        <option value="Sales" name="sales">Sales</option>
                        <option value="Finance" name="finance">Finance</option>
                        <option value="HR" name="hr">HR</option>
                        <option value="IT" name="it">IT</option>
                    </select>
                   


                    <div className="input-group-prepend" style={{ marginLeft: '0rem' }}>
                        <label className="input-group-text" htmlFor="inputGroupSelect02">Allocation</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect02" style={{ marginRight: '1rem' }} onChange={(event) => setAction(event.target.value)}>
                        <option defaultValue value="Add" name="Add">Add</option>
                        <option value="Reduce" name="Reduce">Reduce</option>
                    </select>

                    <div className="input-group-append" style={{ marginRight: '0rem' }}>
                        <span className="input-group-text">{currency}</span> {/* Currency prefix */}
                    </div>
                    <input
                        required='required'
                        type='number'
                        id='cost'
                        value={cost}
                        style={{size: 6}}
                        onChange={(event) => setCost(event.target.value)}>
                    </input>

                    <button className="btn btn-primary" onClick={submitEvent}>
                        Save
                    </button>
                </div>
            </div>

            <div>{hoveredText}</div>
        </div>
    );
};

export default AllocationForm;
