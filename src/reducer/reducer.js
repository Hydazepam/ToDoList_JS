export const initialState = {
    tasks: [],
    current: '',
    filter: 'All',
};

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'SET-CURRENT':
            return { ...state, current: payload };
        case 'ADD-CURRENT':
            if (state.current === '') {
                return state;
            }
            return { ...state, tasks: [...state.tasks, { isFinished: false, title: state.current }], current: '' };
        case 'SET-FILTER':
            return { ...state, filter: payload };
        case 'TOOGLE':
            return { 
                ...state,
                tasks: state.tasks.map((task, i) => payload === i ? { ...task, isFinished: !task.isFinished } : task)
            }
        default:
            throw new Error(`unhandled type:${type}`);
    }
};