import { db } from "../config/database.js";
export const getAllBookings = async (req,res)=>{
    try {
        if(req.user.type === "tourist"){
            return res.redirect("http://localhost:5173/home")
        }
        const pkgid = req.params.id ;
        const packageQuery = `SELECT AgencyID from packages where packageID = ?`
        const packageResult = await db.query(packageQuery,[pkgid])
        if(req.user.id != packageResult[0][0]["AgencyID"]){
            return res.redirect("http://localhost:5173/packages")
        }
        const bookingQuery = `SELECT BookingID,TouristID,FromDate,NetPayableAmount,BookingDate FROM BOOKINGS WHERE PACKAGEID = ? AND STATUS = ?`
        const bookingResult = await db.query(bookingQuery,[pkgid,"VERIFIED"])
        for(let i=0;i<bookingResult[0].length;i++){
        const touristQuery = `SELECT FirstName,LastName,email FROM TOURIST WHERE TOURISTID = ?`
        
        const touristResult = await db.query(touristQuery,[bookingResult[0][i]["TouristID"]])
        bookingResult[0][i]["firstname"] = touristResult[0][0]["FirstName"]
        bookingResult[0][i]["lastname"] = touristResult[0][0]["LastName"]
        bookingResult[0][i]["email"] = touristResult[0][0]["email"]
        
        // console.log(bookingResult[0]);
        // console.log(touristResult[0]);
        const member_query = `SELECT MemberName,age,gender FROM MEMBERS WHERE BOOKINGID = ?`
        const member_result = await db.query(member_query,[bookingResult[0][i]["BookingID"]]);
        // console.log(member_result);
        bookingResult[0][i]["members"] = member_result[0]
        }
        console.log(bookingResult[0]);

        return res.json({
            success:true,
            result:bookingResult[0]
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error!"
        })
    }
}