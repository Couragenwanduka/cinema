import { connect } from "mongoose";

const connectDb  = async() => {
    try {
        const db = await connect(process.env.MONGODB_URI!);
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDb;