// import todoList from "../data/todo.json";
// import categoriesList from "../data/category.json";
import exp from 'constants'
import {readFile} from 'fs/promises'

let todos = JSON.parse(await readFile(
    new URL ('../data/todo.json', import.meta.url)
))
let categoryList = JSON.parse(await readFile(
    new URL ('../data/category.json', import.meta.url)
))

// Start todos
export const getAllToDos = (req, res) => {
    console.log("getting all todos")
    res.status(200).json(todos)
}

export const getAllTodosByCategory = (req, res) => {
    const category = req.params.category
    let results = todos.filter(cate => cate.category === category)
    res.status(200).json(results)
}

export const getToDo = (req, res) => {
    const id = parseInt(req.params.id)
    let filterToDo = todos.filter(elm => elm.id === id)
    res.status(200).json(filterToDo)
}

export const postToDo = (req, res) => {
    const todo = req.body
    todos.push(todo)
    res.status(200).json("Success")
}

export const deleteToDo = (req, res) => {
    let _id = parseInt(req.params.id)
    todos = todos.filter(({id}) => id !== _id)
    res.status(200).json(todos)
}

export const editToDo = (req, res) => {
    let id = parseInt(req.params.id)
    let todo = req.body.todo
    let index = todos.findIndex(elm => elm.id === id)

    if(index >= 0){
        todos[index].category = todo.category
        todos[index].title = todo.title
        todos[index].complete = todo.complete
        res.status(200).json("Success")
    } else {
        res.status(404).json("Not a Success")
    }
}

// Start Category
export const getCategory = (req, res) => {
    const id = parseInt(req.params.id)
    let filterCategory = categoryList.filter(elm => elm.id === id)
    res.status(200).json(filterCategory)
}

export const postCategory = (req, res) => {
    const category = req.body
    categoryList.push(category)
    res.status(200).json("Success")
}

export const deleteCategory = (req, res) => {
    let _id = parseInt(req.params.id)
    categoryList = categoryList.filter(({id}) => id !== _id)
    res.status(200).json(categoryList)
}

export const editCategory = (req, res) => {
    let id = parseInt(req.params.id)
    let category = req.body.category
    let index = categoryList.findIndex(elm => elm.id === id)

    if(index >= 0){
        categoryList[index].category = category.category
        res.status(200).json("Success")
    } else {
        res.status(404).json("Not a success")
    }
}