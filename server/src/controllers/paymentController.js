import { instance } from "../server.js";
import crypto from "crypto"
import { db } from "../config/database.js";

export const checkout = async (req,res)=>{
      try {
        const options = {
            "amount": Number(req.body.amount * 100),
            "currency":"INR",
        }
        const {packageId, start_date,members,amount} = req.body;
    
    
       const response = await instance.orders.create(options);
       if(!response){
           return res.status(200).json({
            success:false,
            message:"Some error occured , order not created!"
           })
       }
       const touristid = req.user.id
       const orderid = response.id;
       const bookquery = `INSERT INTO BOOKINGS(TouristID,PackageID,FromDate,NetPayableAmount,OrderID) VALUES (?,?,?,?,?)`;
       const [bookingResult]= await db.query(bookquery,[touristid,packageId,start_date,amount,orderid]);
       const BookingID = bookingResult.insertId;

    const memberQuery = `INSERT INTO members (BookingID, MemberName, Age,Gender) VALUES (?, ?, ?,?)`;
    for (const member of members) {
      await db.query(memberQuery, [
        BookingID,
        member.name,
        member.age,
        member.gender,
      ]);
    }
       res.status(200).json({
           success:true,
           order : response
       })
      } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
      }
}

export const paymentVerification =  async(req,res)=>{
   try{
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;
    if(!razorpay_payment_id || !razorpay_signature){
        const orderid = razorpay_order_id;
        const delete_query = `DELETE FROM BOOKINGS WHERE ORDERID = ?`
        await db.query(delete_query,[orderid]);
        return res.redirect("http://localhost:5173/failure");
    }
    console.log(razorpay_order_id);
    const body = razorpay_order_id+"|"+razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256',process.env.RAZORPAY_API_SECRET).update(body.toString()).digest('hex');

    console.log("Received Signature :",razorpay_signature);
    console.log("Generated Signature :",expectedSignature);
    
    if(razorpay_signature === expectedSignature){
        const payment_id_query = `UPDATE BOOKINGS SET PaymentID = ?,Status=? WHERE ORDERID=? `
        await db.query(payment_id_query,[razorpay_payment_id,"VERIFIED",razorpay_order_id])
        return res.redirect(`http://localhost:5173/success/${razorpay_payment_id}`);

    }
    else{
        const orderid = razorpay_order_id;
        const delete_query = `DELETE FROM BOOKINGS WHERE ORDERID = ?`
        await db.query(delete_query,[orderid]);
        return res.redirect("http://localhost:5173/failure");
    }

}catch(error){
    console.log(error);
    res.status(500).json({
        success:false,
        message:"Internal Server Error!"
    })
}
}