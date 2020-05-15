import { Request, Response } from "express";
import { LikePostUC } from "../../../bussiness/usecase/Post/likePost";
import { PostDB } from "../../../data/postDataBase";
import { JwtAuthorizer } from "../../../presentation/lambda/services/jwtAuthorizer";

export const LikePostEndPoint = async(req: Request, res: Response) => {

    try{
        const likePostUC = new LikePostUC(new PostDB(), new JwtAuthorizer);

        const auth = req.headers.Authorization || req.headers.authorization;

        const result = await likePostUC.execute({
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