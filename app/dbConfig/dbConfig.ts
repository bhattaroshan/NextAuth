import mongoose from 'mongoose';

export async function connect(){
    try{
        console.log("Trying to connect to mongodb .....");
        await mongoose.connect(process.env.MONGO_URI!,{
            dbName: 'userLogin'
        });
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log('MongoDB connected successfully');
        })

        connection.on('error',(error)=>{
            console.log("MongoDB connection error");
            console.log(error)
            process.exit();
        })
    }catch(error){
        console.log('There was a error ', error);
    }
}