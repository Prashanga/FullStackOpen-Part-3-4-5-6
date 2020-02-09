const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contacts')


app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))


// const generateID = () => {
//     let randID = () => Math.random().toString(36).substr(2,6)
//     return randID() + '-' + randID()+ '-' + randID() + '-' + randID() 
  
// }


//Creating custom Morgan tokens
morgan.token('body', function getId (req) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :response-time[3] ms :body'))


app.get('/api/persons', (req,res) => {
    Contact.find({}).then(contacts => {
        res.json(contacts.map(contact=>contact.toJSON()))
        
    })
})

app.get('/api/persons/:id', (req,res,next) => {
    const id = req.params.id;
    Contact.findById(id)
        .then(response=> {
            if(response){
                res.json(response)
               
            }
            else{
                res.status(404).json({error: 'contact not found'})
            }
           
            })
        .catch(err => {
                next(err)
                //res.status(400).send({ error: 'malformatted id' })
            })
})
//If next was called without a parameter, then the execution would simply move onto the next route or middleware. If the next function is called with a parameter, then the execution will continue to the error handler middleware.
  


app.get('/info', (req,res) => {
    Contact.find({}).then(result => {
        const reply = 
    `Phonebook has info for ${result.length} people
    <br>${new Date()}`
    
    res.send(reply)
    })
    .catch(err=>{
        res.status(500).end()
    })
})


app.delete('/api/persons/:id', (req,res) => {
    const id = req.params.id;
    Contact.deleteOne({_id:id})
    .then(response => {
        if(response.deletedCount===1){
            res.status(200).send(response)
        }
        else{
            res.status(404).json({error:"Contact not found"})
        }
        
    })
    .catch(err=>res.status(400).end())
    

})


app.post('/api/persons', (req,res) => {
    let body = req.body;
    if(!body.name || !body.number){
        return res.status(400).send("Name or Number Missing")
    }

    //If the Contact already exists
    // if(phoneBook.find(contact=>contact.name.toLowerCase() === body.name.toLowerCase())){
    //     return res.status(400).send("Contact already exists")
    // }
   
    let newPerson = new Contact({
        name: body.name,
        number: body.number,
        
    })

    newPerson.save().then(result => {
        res.json(result)
    })
    .catch(err=>console.log("Failed to enter into database"));
    
})


app.put('/api/persons/append', (req,res) => {
    const name = req.body.name;
    const number = req.body.number;
    Contact.findOneAndUpdate(
        {name:name},                //Find COnditions
        {number:number},            //Update number
        {
        new: true,                       // return updated doc
        runValidators: true              // validate before update
      })
      .then((doc) => {
          
            if(doc){
            console.log("Doc found",doc)
            res.status(200).json(doc)
            }
            else{
                console.log("not found")
                res.status(404).end()
            } 
             
        })
      .catch(err => {
        res.status(400).end()
      })
        

    // const contactInDb = phoneBook.find(contact=> contact.name === name);
    // if(contactInDb){
    //     console.log("contact Found:    ",contactInDb)
    //     let appendedContact = {
    //         ...contactInDb,
    //         number: req.body.number
    //     }
    //    phoneBook = phoneBook.map(contacts => 
    //           contacts.id === contactInDb.id?appendedContact:contacts  )
    //     return res.status(200).json(appendedContact);
    // }
    // else{
    //     res.status(404).send('not found')
    // } 
})

//*****************************************MOngoDB Updates above this line ****** */



const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}
  
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})