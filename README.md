# BookMark

## See the live version [here](https://limitless-crag-13210.herokuapp.com/)

This is a MERN stack application. The front end is built with React, it uses Redux for state management and Styled Components for styling. 
The front end actions make requests to a backend REST API on an Express server that is connected to a MongoDB database where each book is stored based on a Mongoose Schema.

Users are able to create, update and delete books and book notes based on RESTful API conventions. The backend also has verification and error handling which combines with
frontend verification on the forms users input the data.

If you want to run this on your own machine, clone the repository and:

**To run a development environment on both the front and backend, in the root of the project, enter in your terminal**
```
npm run dev
```

**To run a development environment on the front end alone, in the client folder enter in your terminal**
```
npm start
```

**To run a development environment on the backend alone, in the root of the project, enter in your terminal**
```
npm run server
```

If you wish to connect BookMark to your own database, follow these instructions:

1. **If you haven't already, create a cluster in MongoDB Atlas.**

2. **Click 'CONNECT' and select 'Connect your application'**

3. **Set the driver as Node.js and copy the connection string that looks like**
```
mongodb+srv://user:<password>@clusterName.lozij.mongodb.net/<dbname>?retryWrites=true&w=majority

```

4. **In the ./Config folder, add a new file called '_default.json_'**

5. **In that file, add in your connection string inside brackets as such**
```.javascript
{
    "mongoURI": "mongodb+srv://user:<password>@clusterName.lozij.mongodb.net/<dbname>?retryWrites=true&w=majority"
}

```

You will then see in the ./Config/db.js file that it uses 
```javascript
const config = require('config')
const db = config.get('mongoURI')
```
Which will get your connection string from the ./Config/default.json file.

And then connects to the database through the following function.
```javascript
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log('MongoDB Connected!')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}
```
You should see the result of
```javascript
console.log('MongoDB Connected!')
```
in the console when connected successfully.



