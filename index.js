const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')


const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))

let phoneBook = [
    {
        name: "Arto Hellas",
        number: "010-39482615",
        id: 1
    }, {
        name: "Ada Lovelace",
        number: "22-12-34567897",
        id: 2
    }, {
        name: "Dan Abramov",
        number: "56-43-24562145",
        id: 3
    }, {
        name: "Mary Poppendieck",
        number: "30-94-30449721",
        id: 4 }
]

const generateID = () => {
    let randID = () => Math.random().toString(36).substr(2,6)
    return randID() + '-' + randID()+ '-' + randID() + '-' + randID() 
  
}

//Creating custom Morgan tokens
morgan.token('body', function getId (req) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :response-time[3] ms :body'))


app.get('/', (req,res) => {
    res.send("<h3>Hello From Server</h3>");
})

app.get('/api/persons', (req,res) => {
    res.json(phoneBook);

})

app.get('/info', (req,res) => {
    const total = phoneBook.length;
    const reply = 
    `Phonebook has info for ${total} people
    <br>${new Date()}`
    
    res.send(reply)
})

app.get('/api/persons/:id', (req,res) => {
    const id = req.params.id;
    const person = phoneBook.find(personTemp=>personTemp.id === id);
    if(person){
        res.json(person)
    }
    else{
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req,res) => {
    const id = req.params.id;
    const person = phoneBook.find(personTemp=>personTemp.id == id);
    if(person){
        phoneBook = phoneBook.filter(person=>person.id!==id);
        res.status(204).end();
    }else{
        res.status(404).end();
    }

})

app.post('/api/persons', (req,res) => {
    let body = req.body;
    if(!body.name || !body.number){
        return res.status(400).send("Name or Number Missing")
    }
    if(phoneBook.find(contact=>contact.name.toLowerCase() === body.name.toLowerCase())){
        return res.status(400).send("Contact already exists")
    }
   
    let newPerson = {
        name: body.name,
        number: body.number,
        id: generateID()
     }
     
     phoneBook = phoneBook.concat(newPerson)
     res.status(200).json(newPerson)
})


app.put('/api/persons/append', (req,res) => {
    const name = req.body.name;
    const contactInDb = phoneBook.find(contact=> contact.name === name);
    if(contactInDb){
        console.log("contact Found:    ",contactInDb)
        let appendedContact = {
            ...contactInDb,
            number: req.body.number
        }
       phoneBook = phoneBook.map(contacts => 
              contacts.id === contactInDb.id?appendedContact:contacts  )
        return res.status(200).json(appendedContact);
    }
    else{
        res.status(404).end()
    }

    

})



const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})