import { Router } from "express";
import { getAllToDos,
        getAllTodosByCategory,
        getToDo, 
        postToDo, 
        deleteToDo, 
        editToDo, 
        getCategory,
        postCategory,
        deleteCategory,
        editCategory } 
    from "../controllers/api.controller.js";


const apiRouter = Router();

apiRouter.get("/todos", getAllToDos)
apiRouter.get("/todoCategory/:category", getAllTodosByCategory)
apiRouter.get("/todoSelect/:id", getToDo)
apiRouter.post("/todosAdd", postToDo)
apiRouter.delete("/delete/:id", deleteToDo)
apiRouter.put("/todosEdit/:id", editToDo)

apiRouter.get("/categorySelect/:id", getCategory)
apiRouter.post("/categoryAdd", postCategory)
apiRouter.delete("/deleteCategory/:id", deleteCategory)
apiRouter.put("/categoryEdit/:id", editCategory)

export default apiRouter;