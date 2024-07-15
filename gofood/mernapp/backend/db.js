const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/goFood';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected successfully");

    const fetched_data = await mongoose.connection.db.collection("foodData").find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

    global.foodData = fetched_data;
    global.foodCategory = foodCategory;

    console.log("Food Data:", foodData);
    console.log("Food Category:", foodCategory);
    
    console.log("Data fetched successfully");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = mongoDB;
