import React, { useReducer, useMemo, useCallback } from "react";
import { reducer, initialState } from "./reducer";
import { Divider, Paper, InputBase, Grid, Badge, IconButton, List, ListItem, Checkbox, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import ClearAllRoundedIcon from '@mui/icons-material/ClearAllRounded';

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

    const addTaskPressEnter = useCallback((e) => {
        if (e.key !== 'Enter') {
            return;
        }
        e.preventDefault();
        dispatch({ type: 'ADD-CURRENT' });
    }, [dispatch])

    const removeTask = useCallback((index) => {
        dispatch({ type: 'REMOVE-CURRENT', payload: index });
    }, [dispatch]);

    const removeCompleted = useCallback(() => {
        dispatch({ type: 'REMOVE-COMPLETED' });
    }, [dispatch]);

    const onToogle = useCallback((index) => {
        dispatch({ type: 'TOOGLE', payload: index });
    }, [dispatch]);

    const onDoneAll = useCallback(() => {
        dispatch({ type: 'DONE-ALL' });
    }, [dispatch]);

    return (
        <Paper sx={{ m: '10px 10px', p: '10px', height: "95vh" }}>
            <Typography variant="h2" color="primary" align="center">mytodos</Typography>
            <Grid container>
                <Grid columns={{ xs: 4, sm: 8, md: 12 }} container display="flex" justifyContent="center" alignItems="center">
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
                    >
                        <Grid item xs={0.5} sm={0.75} md={1}>
                            <IconButton sx={{ p: '10px' }} color={state.tasks.every(({ isFinished }) => isFinished) && state.tasks.length > 0 ? "primary" : "default"} aria-label="done all" onClick={onDoneAll}>
                                <DoneAllRoundedIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={3} sm={6.5} md={10}>
                            <InputBase
                                value={state.current} 
                                onChange={onCurrChange}
                                onKeyDown={addTaskPressEnter}
                                sx={{ ml: 1, flex: 1, width: '100%' }}
                                placeholder="What needs to be done?"
                                inputProps={{ 'aria-label': 'add task' }}
                            />
                        </Grid>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <Grid item xs={0.5} sm={0.75} md={1}>
                            <IconButton onClick={addTask} type="button" sx={{ p: '10px' }} aria-label="add">
                                <AddIcon />
                            </IconButton>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                    <List sx={{ width: "100%", p: '2px 4px' }}>
                        {visibleItems.map((task, i) => (
                            <ListItem
                                className="Task"
                                key={i}
                                disablePadding
                            >
                                <Grid item xs={0.5} sm={0.75} md={1}>
                                    <Checkbox className="Checkbox" checked={task.isFinished} onChange={() => onToogle(i)}/>
                                </Grid>
                                <Grid item xs={3} sm={6.5} md={10}>
                                    <Typography color="default" variant="body1">{task.title}</Typography>
                                </Grid>
                                <Grid item xs={0.5} sm={0.75} md={1}>
                                    <IconButton sx={{ p: '10px' }} onClick={() => removeTask(i)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                        </ListItem>))}
                    </List>
                </Grid>
                <Grid columns={{ xs: 4, sm: 8, md: 12 }} sx={state.tasks.length === 0 ? { display: 'none' } : { p: '2px 4px' }} container display="flex" justifyContent="center" alignItems="center">
                    <Grid item sx={{ p: '10px' }} xs={0.5} sm={0.75} md={1}>
                        <Badge badgeContent={state.tasks.filter((task) => !task.isFinished).length} color="primary">
                            <ListRoundedIcon color="action" />
                        </Badge>
                    </Grid>
                    <Grid item textAlign={'center'} xs={3} sm={6.5} md={10}>
                        <ToggleButtonGroup
                            color="primary"
                            value={state.filter}
                            exclusive
                            size="small"
                            aria-label="Filters"
                        >
                            {FILTERS.map((filter, i) => <ToggleButton className="Filter" key={filter} value={filter} onClick={onChangeFilter[i]}>{filter}</ToggleButton>)}
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={0.5} sm={0.75} md={1}>
                        <IconButton sx={state.tasks.filter((task) => task.isFinished).length === 0 ? { display: 'none' } : { p: '10px' }} aria-label="clear completed" onClick={removeCompleted}>
                            <ClearAllRoundedIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ReducerExample;
