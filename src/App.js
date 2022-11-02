import React from 'react';
import './App.css';

function App() {
  const [task, setTask] = React.useState('');
  const [taskList, setTaskList] = React.useState([]);
  const [currentFilter, setCurrentFilter] = React.useState('All');

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const addTask = (task) => {
    const copyOfList = [...taskList, { id: taskList.length + 1, text: task, active: true }];
    setTaskList(copyOfList);
  };

  const handleClick = (e) => {
    e.preventDefault();
    addTask(task);
    setTask('');
  };

  const handleToogle = (e) => {
    const copyOfList = taskList.map((task) => {
      if (task.id == e.target.id) {
        task.active = !task.active;
        return task;
      }
      return task;
    })
    setTaskList(copyOfList);
  }

  const itemClass = (active) => {
    if (!active) {
      return 'doneTask';
    }
  };

  const filters = ['All', 'Active', 'Completed'];

  const mappedList = (list) => {
    let copyOfList = [];
    if (currentFilter === 'All') {
      copyOfList = list;
    } else if (currentFilter === 'Active') {
      copyOfList = list.filter(({ active }) => active === true);
    } else if (currentFilter === 'Completed') {
      copyOfList = list.filter(({ active }) => active === false);
    }
    return copyOfList.map(({ id, text, active }) => <li id={id} key={id} className={itemClass(active)} onClick={handleToogle}>{text}</li>)
  };

  return (
    <div className="App">
      <input onChange={handleChange} value={task} placeholder='Type task'></input>
      <button onClick={handleClick}>Add</button>
      <div>
        {filters.map((filter) => <button key={filter} onClick={() => setCurrentFilter(filter)}>{filter}</button>)}
      </div>
      <ul>{mappedList(taskList)}</ul>
    </div>
  );
}

export default App;
