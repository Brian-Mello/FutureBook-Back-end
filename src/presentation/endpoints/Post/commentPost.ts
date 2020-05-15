import { Request, Response } from "express";
import { PostDB } from "../../../data/postDataBase";
import { CommentPostUC } from "../../../bussiness/usecase/Post/commentPost";
import { JwtAuthorizer } from "../../../presentation/lambda/services/jwtAuthorizer";

export const CommentPostEndPoint = async(req: Request, res: Response) => {

    try{
        const commentPostUC = new CommentPostUC(new PostDB(), new JwtAuthorizer());

        const auth = req.headers.Authorization || req.headers.authorization;

        const result = await commentPostUC.execute({
            token: auth as string,
            postId: req.body.postId,
            comment: req.body.comment
        })

        res.status(200).send(result)
    } catch(err){
        res.status(400).send({
            message: err.message
        })
    }
}