import { Request, Response } from "express";
import { PostDB } from "../../../data/postDataBase";
import { UnlikePostUC } from "../../../bussiness/usecase/Post/unlikePost";
import { JwtAuthorizer } from "../../../presentation/lambda/services/jwtAuthorizer";

export const UnlikePostEndPoint = async(req: Request, res: Response) => {

    try{
        const unlikePostUC = new UnlikePostUC(new PostDB(), new JwtAuthorizer());

        const auth = req.headers.Authorization || req.headers.authorization;

        const result = await unlikePostUC.execute({
            token: auth as string,
            postId: req.body.postId
        })

        res.status(200).send(result)
    } catch(err){
        res.status(400).send({
            message: err.message
        })
    }
}