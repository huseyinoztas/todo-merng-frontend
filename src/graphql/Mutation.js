import { gql } from "@apollo/client";

export const ADD_TODO = gql `

    mutation addTodo($title:String,$description:String,$date:Date){
        addTodo(title:$title,description:$description,date:$date){
            id,
            title,
            description,
            date
        }
    }
`;

export const DELETE_TODO = gql `
    mutation deleteTodo($id:ID) {
        deleteTodo(id:$id)
    }
`

export const UPDATE_TODO=gql `
    mutation todoUpdate($id:ID,$title:String,$description:String,$date:Date){
        todoUpdate(id:$id,title:$title,description:$description,date:$date){
            id,
            title,
            description,
            date
        }
    }

`