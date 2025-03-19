const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, '../public')))
const public = path.join(__dirname,'../public')


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/go_green', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }, // Ensure email is unique
  password: String
});


const submissionSchema = new mongoose.Schema({
  email: String,
  message: String,
});

// for the submission of the data on the home page

const Submission = mongoose.model('Submission', submissionSchema);


// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

// Endpoint for retrieving all users
app.get('/users', async (req, res) => {
  try {
    // Retrieve all users from the 'users' collection
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

app.get('/',(req,res)=>{
  res.sendFile(public+"/home.html")
})

app.get('/signup',(req,res)=>{
  res.sendFile(public+'/signup.html');
})



// For using the session of express

// Write the code for using the express session

// Path for the form submission in the code
// Kyuki submission file ki toh koi html file banegi nahi sirf txt file ban sakti hai jaha store karwaye unke feedback toh woh kaise aayega??

// Endpoint for user signup
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body)
  // Validate and insert user data into the 'users' collection
  try {
    const user = new User({ name, email, password });
    await user.save();



    console.log('User saved successfully.');
    res.json({ message: `${user}` });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/login',async(req,res)=>{
  let {email,password}  = req.body;
  console.log(req.body);
  let user = await User.findOne({email,password});
  if(user){
    res.json({message:"Logged In",name:user.name});
  }else{
    res.status(404).json({error:"Invalid credentials"});
  }
})


// for the form submission on the home page footer

app.post('/submit-form', async (req, res) => {
  console.log("Hi")
  const { email, message } = req.body;
  // yaha console.log kar rahe hai toh display nahi ho raha hai mongoDB mei.

  try {
    const submission = new Submission({ email, message });
    await submission.save();
    console.log('Submission saved successfully.');
    res.json({ message: 'Submission saved successfully.' });
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});


//For the Welcome name display of the user



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
