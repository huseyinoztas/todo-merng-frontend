import Form from './Form';
import List from './List';
import { useState } from 'react';
import {TodoContext} from './TodoContext'

function App() {

  const [chooseId, setChooseId] = useState(0);
  return (
    <TodoContext.Provider value={{chooseId,setChooseId}}>
      <Form />
      <List />
    </TodoContext.Provider>
  );
}

export default App;
