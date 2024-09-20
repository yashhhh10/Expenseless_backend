const mongoose=require('mongoose');
// const mongoURI="mongodb://localhost:27017/expenseless";
const mongoURI="mongodb+srv://kmainibe22:JEtTNwnxghX8yLyp@cluster0.rzylnzz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

async function connectToMongo() {
    await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
}
  
module.exports = connectToMongo;