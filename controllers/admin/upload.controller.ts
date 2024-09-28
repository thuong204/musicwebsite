import { Request,Response } from "express"
export const upload =async(req:Request,res:Response) =>{
    console.log(req.body)
    res.json({
        location:req.body.file
    })

}