const fs = require( 'fs' )
const express = require( 'express' )
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require( 'cors' )
const app = express()

const changes = []
const listDate = []

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use( cors() )
app.use("/", router)

class NewDate {
   constructor(date) {
      this.value = date
   }
}

const files = fs.readdirSync( 'src/changes' )
files.forEach( (file, i) => {
   changes.push( JSON.parse( fs.readFileSync( 'src/changes/' + file ).toString( 'utf-8' ) ) )
   changes[i] && listDate.push( new NewDate (changes[i][0].date) )
} )

listDate.sort((a, b) => {
   let aDate = a.value.split('.')
   let bDate = b.value.split('.')
   aDate = [aDate[1], aDate[0], aDate[3]].join('')
   bDate = [bDate[1], bDate[0], bDate[3]].join('')

   return new Date(bDate) - new Date(aDate)
} )

// Вернуть массив изменений по выбранной дате
router.post('/api/changes',(request,response) => {
   response.send( changes.find(el => el && el[0].date === request.body.value) )
})

// Вернуть массив всех изменений
app.get( '/api/getdates', (req, res, next) => {
   res.json( changes )
} )

// Вернуть массив всех дат
app.get( '/api/getlistdate', (req, res, next) => {
   res.json( listDate )
} )


app.listen( 3000, function () {
   console.log( 'CORS-enabled web server listening on port 3000' )
} )