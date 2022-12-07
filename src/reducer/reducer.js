export const initialState = {
    tasks: [],
    current: '',
    filter: 'All',
    doneAll: false,
    error: '',
};

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'SET-CURRENT':
            return { ...state, current: payload };
        case 'ADD-CURRENT':
            if (state.current === '') {
                return state;
            }
            return {
                ...state,
                doneAll: false,
                tasks: [...state.tasks, { isFinished: false, title: state.current }],
                current: ''
            };
        case 'REMOVE-CURRENT':
            return {
                ...state,
                tasks: state.tasks.filter((_, i) => payload !== i),
            }
        case 'SET-FILTER':
            return { ...state, filter: payload };
        case 'TOOGLE':
            return { 
                ...state,
                tasks: state.tasks.map((task, i) => payload === i ? { ...task, isFinished: !task.isFinished } : task),
            }
        case 'DONE-ALL':
            return { 
                ...state,
                doneAll: !state.doneAll,
                tasks: state.tasks.map((task) => ({ ...task, isFinished: !state.doneAll })),
            }
        case 'REMOVE-COMPLETED':
            return {
                ...state,
                doneAll: false,
                tasks: state.tasks.filter((task) => !task.isFinished)
            }
        default:
            throw new Error(`unhandled type:${type}`);
    }
};