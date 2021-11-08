// import todoList from "../data/todo.json";
// import categoriesList from "../data/category.json";
import exp from 'constants'
import {readFile} from 'fs/promises'
import { Todos } from  '../models/todo.model.js'


// let todos = JSON.parse(await readFile(
//     new URL ('../data/todo.json', import.meta.url)
// ))
let categoryList = JSON.parse(await readFile(
    new URL ('../data/category.json', import.meta.url)
))


// Start todos
export const getAllToDos = async (req, res) => {
    console.log("getting all todos")
    try {
        const todos = await Todos.find().lean().exec()
        res.status(200).json(todos)
    }
    catch (err) {
        console.log(err)
    }
    
}

export const getAllTodosByCategory = (req, res) => {
    try{
        Todos.find()
            .where({category: req.params.category})
            .exec((err, todos) => {
                console.log(todos)
                if(err) res.status(400).json({Message: `Couldn't find todo: ${err}`})
                res.status(200).json(todos)
            })
    }
    catch (err){
        res.status(400).json({Message: `Couldn't Query: ${err}`})
    }
}

export const getToDo = (req, res) => {
    const id = parseInt(req.params.id)
    try {
        Todos.find()
        .where({_id: req.params._id})
        .exec((err, todo) => {
            console.log(todo)
            if(err) res.status(400).json({Message: `Couldn't find todo: ${err}`})
            res.status(200).json(0)
        })
    }
    catch(err){
        res.status(400).json({Message: `Couldn't Query: ${err}`})
    }
    
}

export const postToDo = (req, res) => {
    const newTodo = new Todos({
        title: req.body.title,
        complete: false,
        category: ""
    })
    try{
        newTodo.save();
        res.status(200).json({Message: "Todo created successfully!"})
    }
    catch (err){
        res.status(400).json({Message: "Todo not created"})
    }
}

export const deleteToDo = async (req, res) => {
    try{
        Todos.findOneAndDelete({title: req.params.title}, (err, todo) => {
            console.log(todo)
            if (err) {
                res.status(400).json({Message: `Could not find todo to delete: ${err}`})
            }
            res.status(200).json({ Message: "Successfully deleted todo"})
        })
    }
    catch (err){
        res.status(400).json({ Message: `Could not delete todo: ${err}`})
    }
}

export const editToDo = async (req, res) => {
    let todo = {
        title: req.body.title,
        category: req.body.category,
        complete: req.body.complete
    }
    console.log(req.body.oldTitle)
    console.log(todo)
    try {
        const edit = await Todos.findOneAndUpdate({ title: req.body.oldTitle }, todo)
        res.status(200).json({ Message: "Updated todo"})
    }
    catch (err){
        res.status(400).json({ Message: "Couldn't update todo"})
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