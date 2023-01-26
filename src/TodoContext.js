
import { createContext } from "react";

export const TodoContext = createContext(null);



// This error message is indicating that the date format being passed to the form is not in the correct format.
// The date format "2023-01-20T00:00:00.000Z" is in the format of ISO-8601, but the required format is "yyyy-MM-dd".
// You can use the moment.js library to convert this date format to the required format, by using the moment(date).format("YYYY-MM-DD") method.
// You can update the line where you set the todo state with the data from the query to this :
// setTodo(data?.todoGetir? {...data.todoGetir, tarih: moment(data.todoGetir.tarih).format("YYYY-MM-DD") }: {})

// This will convert the date format to the required format before setting the state.