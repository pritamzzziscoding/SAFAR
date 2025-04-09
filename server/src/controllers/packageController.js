import { getPackageById } from "../models/packageModel.js";
import { db } from "../config/database.js";
import { getImageUrl } from "./uploadController.js";
import { delete_local_file } from "./uploadController.js";
export const getPackageDetails = async (req, res) => {
  try {
    const { packageID } = req.params;
    console.log("PackageID:",packageID);
    const packageData = await getPackageById(packageID);

    if (!packageData) {
      return res
        .status(200)
        .json({ success: false, message: "Package not found" });
    }
    // console.log(packageData);
    const facilities = await getfacilities(packageID);
    packageData["facilities"] = facilities; 
    console.log(packageData);
    res.status(200).json({
      success:true,
      message:"Package Details fetched successfully!",
      packageData});
  } catch (error) {
    console.error("Error fetching package:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



export const PackageAdder = async (req,res)=>{
  try {
          const userId  =req.user.id;
          // const userType = req.user.type;
          const {packagename,address,description,destination,duration,price,facilities} = req.body;
          const arrayfacilities  = JSON.parse(facilities);
          // console.log(caption,location,description);
          console.log(address,description,destination,duration,price,packagename,arrayfacilities);
          let [result] = [];
          let imgUrl = "";
          if(req.file){
              imgUrl = await getImageUrl(req.file.path);
              const query = `INSERT INTO PACKAGES (AgencyID,Description,Price,Duration,Address,ImgURL,Title,Destination) VALUES(?,?,?,?,?,?,?,?)`
              result = await db.query(query,[userId,description,price,duration,address,imgUrl,packagename,destination]);
              console.log(result[0].insertId)
              delete_local_file(req.file.path);
          }
          else{
            const query = `INSERT INTO PACKAGES (AgencyID,Description,Price,Duration,Address,Title,Destination) VALUES(?,?,?,?,?,?,?)`
            result = await db.query(query,[userId,description,price,duration,address,packagename,destination]);
          }

          const PackageID = result[0].insertId;
          if (!PackageID) {
              throw new Error("Failed to retreive PackageID.!");
                }

              if (Array.isArray(arrayfacilities) && arrayfacilities.length > 0) {
                  const detail = `INSERT INTO Details(PackageID, Facilities) VALUES(?, ?)`;
                  for (const facility of arrayfacilities) {
                    await db.query(detail, [PackageID, facility]);
                      }
                  }
          return res.status(200).json({
              success:true,
              message:"Package successfully inserted into the database! "
          })
  
      } catch (error) {
          console.log(error);
          res.status(500).json({
              success:false,
              message:"Internal Server Error!"
          })
      }
}


export const getPackages = async (req,res)=>{
  try {
      const id = req.user.id;
      const query = `SELECT * FROM PACKAGES WHERE AGENCYID = ?`;
      const result = await db.query(query,[id]);
      // console.log(result[0]);
      for(let i = 0;i<result[0].length;i++){
      const facilities = await getfacilities(result[0][i].PackageID);
      result[0][i]["facilities"] = facilities;
      }
      // console.log(result[0][0]);
      res.status(200).json({
        success:true,
        message:"Fetched all the packages of this agency successfully!",
        package:result[0]
      })
  } catch (error) {
     console.log(error);
     res.status(500).json({
      success:false,
      message:"Internal Server Error!"
     })
  }
}

export const updateStatus = async (req,res)=>{
  try {
    const {PackageID,IsActive} = req.body;
    const query = `UPDATE PACKAGES SET IsActive = ? WHERE PACKAGEID = ? `;
    await db.query(query,[IsActive,PackageID]);
    return res.status(200).json({
      success:true,
      message:"Package toggled successfully!"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Internal Server Error !"
    })
  }
}

export const deletePackage = async (req,res)=>{
  try {
    const {PackageID} = req.body;
    const query = `DELETE FROM  PACKAGES WHERE PACKAGEID = ? `;
    await db.query(query,[PackageID]);
    return res.status(200).json({
      success:true,
      message:"Package deleted successfully!"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Internal Server Error !"
    })
  }
}

const getfacilities = async (packageID)=>{
  const fetch_query = `SELECT Facilities FROM DETAILS where PACKAGEID = ?`;
  const result = await db.query(fetch_query,[packageID]);
  // console.log(result[0]);
  const final_result = result[0].map((obj)=>{
      return obj.Facilities
  })
  // console.log(final_result);
  return final_result;
}

export const updatePackage = async (req,res)=>{
try {
const {PackageID,packagename,destination,price,duration,address,description,facilities} = req.body;
    let imgURL = "";
    // const userId = req.user.id;
    // const userType = req.user.type;
    const arrayfacilities  = JSON.parse(facilities);
    if(req.file){
        imgURL = await getImageUrl(req.file.path);
        const query = `UPDATE PACKAGES SET Description=?,Price=?,Duration=?,Address=?,ImgURL=?,Title=?,Destination=? WHERE PackageID=?`
        await db.query(query,[description,price,duration,address,imgURL,packagename,destination,PackageID]);
        delete_local_file(req.file.path);
    }
    else{
      const query = `UPDATE PACKAGES SET Description=?,Price=?,Duration=?,Address=?,Title=?,Destination=? WHERE PackageID=?`
      await db.query(query,[description,price,duration,address,packagename,destination,PackageID]);
    }
    const delete_query = `DELETE FROM DETAILS WHERE PACKAGEID=?`;
    await db.query(delete_query,[PackageID]);
    if(arrayfacilities.length>0){
      const detail = `INSERT INTO Details(PackageID, Facilities) VALUES(?, ?)`;
      for (let i = 0;i<arrayfacilities.length;i++) {
        await db.query(detail, [PackageID, arrayfacilities[i]]);
          }
    }
    return res.status(200).json({
        success:true,
        message:"Package updated successfully!"
    })

} catch (error) {
console.log(error);
res.status(500).json({
  success:false,
  message:"Internal Server Error!"
})
}
}


export const filterData = async (req,res)=>{
   try {
       let {destination, rating,maximum,sort} = req.body;
       console.log(req.body)
       destination = destination===""? "":destination;
       const minRating = rating===""? 0:rating;
       const maxPrice = maximum===""? 50000000:maximum;
       const filterquery = `
       SELECT P.PACKAGEID, P.AgencyID, P.Description, P.Price, P.Duration, 
              P.Address, P.ImgURL, P.Title, P.Destination, 
              COALESCE(Q.TotalRating, 0) AS TotalRating
       FROM PACKAGES P 
       LEFT JOIN 
           (SELECT PACKAGEID, AVG(RATING) AS TotalRating 
            FROM REVIEWS 
            GROUP BY PACKAGEID) Q 
       ON P.PACKAGEID = Q.PACKAGEID
       WHERE P.DESTINATION LIKE ? 
       AND (Q.TotalRating IS NULL OR Q.TotalRating >= ?) 
       AND P.PRICE <= ?
       AND P.ISACTIVE = 1
       ${sort ? "ORDER BY P.PRICE ASC, Q.TotalRating DESC" : ""}
   `;
   
   const result = await db.query(filterquery, [`${destination}%`, minRating, maxPrice]);
   for(let i = 0;i<result[0].length;i++){
   
    const facilities = await getfacilities(result[0][i].PACKAGEID);
    result[0][i]["facilities"] = facilities;
    }
    res.status(200).json({
      success:true,
      message:"Fetched all the packages fulfilling these conditions successfully!",
      package:result[0]
    })


   } catch (error) {
      console.log(error);
      res.status(500).json({
        success:false,
        message:"INternal Server Error!"
      })
   }
}



const getRating = async (PackageID)=>{
      const query = `Select  AVG(Rating) AS TOTALRATING FROM REVIEWS GROUP BY PACKAGEID HAVING PACKAGEID = ?`;
      const result  = await db.query(query,[PackageID]);
      return result[0].TOTALRATING;
}