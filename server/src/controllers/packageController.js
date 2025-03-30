import { getPackageById } from "../models/packageModel.js";
import { db } from "../config/database.js";
import { getImageUrl } from "./uploadController.js";
import { delete_local_file } from "./uploadController.js";
export const getPackageDetails = async (req, res) => {
  try {
    const { packageID } = req.params;
    const packageData = await getPackageById(packageID);

    if (!packageData) {
      return res
        .status(200)
        .json({ success: false, message: "Package not found" });
    }
    res.json(packageData);
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
    console.log("LUND", req.body)
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