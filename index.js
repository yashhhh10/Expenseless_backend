const connectToMongo=require('./db');
const express = require('express')
const cors=require('cors')

connectToMongo();

const app = express()
const port = process.env.PORT|| 5000

app.use(cors())
app.use(express.json());

app.use('/api/auth',require('./routes/auth'))
app.use('/api/accounts',require('./routes/accounts'))
app.use('/api/expenses',require('./routes/expenses'))
app.use('/api/incomes',require('./routes/incomes'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

  