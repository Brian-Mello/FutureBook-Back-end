import { Request, Response } from "express";
import { PostDB } from "../../../data/postDataBase";
import { DeleteCommentPostUC } from "../../../bussiness/usecase/Post/deleteCommentPost";
import { JwtAuthorizer } from "../../../presentation/lambda/services/jwtAuthorizer";

export const DeleteCommentPostEndpoint = async(req: Request, res: Response) => {

    try{
        const deleteCommentPostUC = new DeleteCommentPostUC(new PostDB(), new JwtAuthorizer());

        const auth = req.headers.Authorization || req.headers.authorization;

        const result = await deleteCommentPostUC.execute({
            token: auth as string,
            postId: req.body.postId,
            comment: req.body.comment,
        })

        res.status(200).send(result)
    } catch(err){
        res.status(400).send({
            message: err.message
        })
    }
}