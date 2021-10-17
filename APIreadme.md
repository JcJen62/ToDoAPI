# API DOCUMENTATION

-Get All ToDo's: simply add /todos to the end of url and it will grab all todo's
-Get All ToDo's by Category: /todoCategory/:category typing the category after the url will get you all todos that have that category
-Get A ToDo: /todoSelect/:id placing the id of the todo you want at the end of the url will return that one todo
-Adding a ToDo: /todosAdd following the format set in place in the JSON file add a new todo in the body and make the post request
-Delete A ToDo: /delete/:id adding the id of the todo you wish to delete at the end of the url with delete that todo
-Edit A ToDo: /todosEdit/:id add the id at the end of the url and passing the edited todo in the body with a put request will edit the todo


-Get A Category: /categorySelect/:id add the id of the category to the end of the URL will return the category
-Add A Category: /categoryAdd following the format set in place in the JSON file for categories add the new category to the body and make the post request
-Delete A Category: /deleteCategory/:id adding the id to the end of the URL and making a delete request will delete the category
-Edit A Category: /categoryEdit/:id adding the id to the end of the URL and passing the edited category in the body will edit the category