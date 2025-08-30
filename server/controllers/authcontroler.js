
export  const home =async (req , res)=>{
    try {
       return res.status(200).send("we are on the home page of rest api")
    } catch (error) {
        console.log(error);
        
    }
}