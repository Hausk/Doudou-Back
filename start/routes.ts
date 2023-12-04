import Route from '@ioc:Adonis/Core/Route'

//Gestion des utilisateurs
Route.get("/google/redirect", "AuthController.redirect");
Route.get("/google/callback", "AuthController.handleCallback");
//Temporaire
Route.get("/status", "AuthController.status");
Route.post('/auth/register', 'AuthController.register')
Route.post("/logout", "AuthController.logout");

//Gestion du dashboard
Route.group(() => {
    Route.group(() => {
        Route.get("", "WorksController.showAll").middleware('coadmin')
        Route.get("/:id", "WorksController.show")
        Route.post("/create", "WorksController.create").middleware('coadmin')
        Route.delete("/delete/:id", "WorksController.delete").middleware('admin')
    }).prefix("works")
    Route.group(() => {
        Route.get("", "UsersController.showAll").middleware('coadmin')
        Route.get("/:id", "UsersController.show").middleware('coadmin')
        Route.post("/create", "UsersController.create").middleware('admin')
        Route.delete("/delete/:id", "UsersController.delete").middleware('admin')
    }).prefix("account")
    Route.post("/image/upload", "ImagesController.upload").middleware('coadmin')
    Route.delete("/image/delete", "ImagesController.delete").middleware('admin')
}).prefix("dashboard").middleware('auth')
Route.get("/test", "UsersController.test")


