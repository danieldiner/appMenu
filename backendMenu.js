const express = require('express');
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
const Food = require('./mongooseMenu');
const Buy = require('./mongooseBuy')
const PORT = process.env.PORT || 8000

//Crear un backend CRUD completo
//Hace un backend de un restaurant CRUD completo para el MENU y para ORDENES
//y una peticion para crear el total por id de orden

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
Estan en un papeleria
Document: Items
Hacer el CRUD completo para items
Crear una peticion POST para realizar compras y generar
una 
factura: Precio unitario, IVA, Precio con IVA
*/

//Create Menu
app.post('/menu/nuevoProducto',(req,res)=>{
    const {food,description,price} = req.body
    let newFood = Food({
        food,
        description,
        price,
        url
    });
    newFood.save((err,food)=>{
        if (err) throw err;
        res.status(201).send(food);
    });
});

//Todas las comidas
app.get('/menu',(req,res)=>{
    Food.find().exec().then(foods => {
        res.send(foods)
    }).catch((err)=>{
        res.status(400).send(err)
    })
});


//App get home browser
app.get('/',(req,res)=>{
   
        res.send("Hola Nuevo Restaurante Freims")

    });




//Traer un usuario por su id
app.get('/food/:uid',(req,res)=>{
    const {uid} = req.params
    Food.findById(uid).exec().then(food =>{
        res.send(food)
    }).catch(err =>{
        res.status(404).send(err)
    });
});


// por nombres
app.get(`/menu/find`,(req,res) => {
    const {food} = req.query
    Food.find({food:food}).exec()
   // Food.find({'tags.text': {$in: tagTexts}}, function(err, users)
    //console.log(Food.find({food:comida})
    .then(resp => res.status(200).send(resp))
    .catch(err=> res.send(err)) 
})








app.delete('/api/v1/food/:uid',(req,res)=>{
    const {uid} = req.params
    Food.findByIdAndRemove(uid).exec().then(
        food => res.send({message:'Comida Borrada'})
    ).catch(err=> res.send(err));
});
//Actualizar por partes
app.patch('/api/v1/food/:uid',(req,res)=>{
    const {uid} = req.params
    Food.findByIdAndUpdate(uid,req.body,(err,food)=>{
        Food.findById(uid).exec()
        .then(comida =>res.send(comida))     
    }).catch( err => res.send(err));
});

//Busqueda por nombre
//api/v1/find?nombre=Oscar
app.get('/api/v1/find',(req,res)=>{
    const {food} = req.query
    Food.find({food}).exec()
        .then(foods => res.send(foods))
        .catch(err => res.send(err))
});

app.put('/food/:uid', (req,res) => {
    const {uid} = req.params
    Food.findByIdAndUpdate(uid,{$set:req.body}).exec()
    .then((food) => res.send(food)
    ).catch((err) =>  res.send(err)
    )
})

//Hace una compra
//Hace El formato de una compra
app.post('/orden/nueva',(req,res)=>{
    //Gets the Id of the products 
    const buy_list = req.body.buy_list
    //console.log(req.body)
    var buy_order = []
    var prices = []
    var pricesum = 0
    var datos = {}
    //Gets Array with product objects
    //  for(i=0; i<buy_list.lenght; i++){ 
    //   buy_order.push.apply(buy_order, Food.findById(buy_list[i]).exec()
    //     .then((buy) => res.send(buy)
    //      ).catch((err) =>  res.send(err)   
    //     )
    // )};

        buy_list.map((element,index)=>{
        Food.findById(element).exec()
        //.then ((food) => console.log(`este es un precio  ${food.price}`))
        .catch((err) =>  console.log(err))

    });

 //Calculates final price
    for(i=0; i<buy_list.lenght; i++){
      prices.push(Food.findById(buy_list[i]).exec()
        .then((buy) => prices[i].push(buy.price)
         ).catch((err) =>  res.send(err)   
        )
    )};


console.log(prices)


              buy_list.map((element,index)=>{
        Food.findById(element).exec()
        .then ((food) => buy_order.push(food))
        .catch((err) =>  console.log(err))

    });



    // // formato de compra para hacerlo con map
    // buy_list.map((element,index)=>{
    //     Food.findById(element).exec()
    //     .then ((food) => console.log(food))
    //     .catch((err) =>  console.log(err))

    // });


 //.then ((food) => console.log(food._id))
//.then ((food) => buy_order.push(food))
   

    // //Calculates final price
    // for(i=0; i<buy_list.lenght; i++){
    //   price.push.apply(price, Food.findById(buy_list[i]).exec()
    //     .then((buy) => res.send(buy)
    //      ).catch((err) =>  res.send(err)   
    //     )
    // )};



    buy_list.map((element,index)=>{
       Food.findById(element).exec()
        .then ((food) => prices.push(food.price))
        .catch((err) =>  console.log(err))

    });
    console.log(prices)

        //Calculates final price by map
    //   buy_list.map((element, index)=>{
    //     Food.findById(element).exec()
    //     .then ((price) => prices.push(price))
    //     .catch((err) =>  console.log(err))

    // });
    // function getSum(total, num) {
    // return total + num;
    // }
    // function myFunction(item) {
    // document.getElementById("demo").innerHTML = numbers.reduce(getSum);
    // }


     prices.map((precio, index)=>{
     pricesum = (pricesum + precio);
     console.log(precio)
     });


    final_price = pricesum; 


    let newBuy = Buy({
       
     buy_list,
     buy_order, 
     final_price

    });
    newBuy.save((err,buy)=>{
        if (err) throw err;
        res.status(201).send(buy);
    });
});




//Traer una orden por su ID
app.get('/orden/id/:uid',(req,res)=>{
    const {uid} = req.params
    Buy.findById(uid).exec().then(buy =>{
        res.send(buy)
    }).catch(err =>{
        res.status(404).send(err)
    });
});






app.listen(PORT,()=>{
    console.log(`Server on ${PORT} `)
});