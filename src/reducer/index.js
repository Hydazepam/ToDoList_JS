import React, { useReducer, useMemo, useCallback } from "react";
import { reducer, initialState } from "./reducer";
import '../App.css';
import { Input, Button, ButtonGroup, List, ListItem, Checkbox } from '@mui/material';

const FILTERS = ['All', 'Active', 'Completed'];

function ReducerExample() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const visibleItems = useMemo(() => state.tasks.filter((task) => {
        switch (state.filter) {
            case 'All':
                return true;
            case 'Active':
                return !task.isFinished;
            case 'Completed':
                return task.isFinished;
        }
    }), [state.filter, state.tasks]);

    const onCurrChange = useCallback((e) => {
        dispatch({ type: 'SET-CURRENT', payload: e.target.value });
    }, [dispatch]);

    const onSetFilterAll = useCallback(() => dispatch({ type: 'SET-FILTER', payload: 'All' }));
    const onSetFilterActive = useCallback(() => dispatch({ type: 'SET-FILTER', payload: 'Active' }));
    const onSetFilterCompleted = useCallback(() => dispatch({ type: 'SET-FILTER', payload: 'Completed' }));

    const onChangeFilter = [onSetFilterAll, onSetFilterActive, onSetFilterCompleted];

    const addTask = useCallback(() => {
        dispatch({ type: 'ADD-CURRENT' });
    }, [dispatch]);

    const onToogle = useCallback((index) => {
        dispatch({ type: 'TOOGLE', payload: index });
    }, [dispatch]);

    return (
        <div className="App">
            <div className="Input">
                <Input className="Field" placeholder="Type new task" value={state.current} onChange={onCurrChange}></Input>
                <Button className="Button" variant="contained" onClick={addTask}>Add</Button>
            </div>
            <div className="Filters">
                <ButtonGroup disableElevation variant="contained">
                    {FILTERS.map((filter, i) => <Button className="Filter" key={filter} onClick={onChangeFilter[i]}>{filter}</Button>)}
                </ButtonGroup>
            </div>
            <div className="Tasks">
                <List>
                    {visibleItems.map((task, i) => <ListItem className="Task" key={i}>{task.title}<Checkbox className="Checkbox" checked={task.isFinished} onChange={() => onToogle(i)}/></ListItem>)}
                </List>
            </div>
        </div>
  
    )
}

export default ReducerExample;

{/* <div className="App">
<div className="Input">
    <Input className="Field" placeholder="Type new task" value={state.current} onChange={onCurrChange}></Input>
    <Button className="Button" variant="contained" onClick={addTask}>Add</Button>
</div>
<ButtonGroup className="Filters" disableElevation variant="contained">
    {FILTERS.map((filter, i) => <Button className="Filter" key={filter} onClick={onChangeFilter[i]}>{filter}</Button>)}
</ButtonGroup>
<List className="Tasks" >
    {visibleItems.map((task, i) => <ListItem className="Task" key={i}>{task.title}<Checkbox checked={task.isFinished} onChange={() => onToogle(i)}/></ListItem>)}
</List>
</div> */}