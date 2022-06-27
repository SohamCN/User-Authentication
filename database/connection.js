const mongoose = require('mongoose'); //using mongoose module the application can be connected to the mongoDB database
const connectDB = async() => {
    try {
        //mongodb connection string
        const con = await mongoose.connect(process.env.DATABASE
            /*,{
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        useFindAndModify: false,
                        useCreateIndex: true
                    }*/
        )
        console.log('MongoDB connected:' + con.connection.host+':' + con.connection.port);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://SohamCN:<capital@2022>@cluster0.yllx6.mongodb.net/?retryWrites=true&w=majority"
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const connectAtlasDB = async () => {
    try {
      await mongoose.connect(process.env.ATLAS, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true
      });
      console.log("mongoDB connected!");
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  };


module.exports = {connectDB, connectAtlasDB}