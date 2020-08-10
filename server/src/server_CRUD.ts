import express from 'express';

const app = express();

app.use(express.json());

app.get("/users", (request, response) =>{

    // console.log(request.query)

    const users =[
        {name: 'Diogo', age:25},
        {name: 'Ana', age:25},
    ]
    return response.json(users)
});

app.post("/users", (request, response) =>{

    // console.log(request.body)

    const users =[
        {name: 'Diogo', age:25},
        {name: 'Ana', age:25},
    ]
    return response.json(users)
});

app.delete("/users/:id", (request, response) =>{

    // console.log(request.params)

    const users =[
        {name: 'Diogo', age:25},
        {name: 'Ana', age:25},
    ]
    return response.json(users)
});

app.listen(3333);