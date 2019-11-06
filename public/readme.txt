This is a readme file!

In this project we have build these api end points so we can manage genres movies customers and rentals

/api/genres
/api/movies
/api/customers
/api/rentals

Authentication - A user can only read details

Authorization - In order to create or update movie user needs to be authenticate first
Second Level Authorization - Only admin users can delete the data

Register : POST /api/users
Login(Authentication) : POST /api/auth

Authorization:
Only authenticated user can create and update genres (In Order to access these routes first user needs to provide JWT received from Login(Authentication))
Only admin users can delete data 
