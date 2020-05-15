import { Request, Response } from "express";
import { UnfollowUserUC } from "../../../bussiness/usecase/Relations/unfollowUser";
import { UserRelationsDB } from "../../../data/relationDataBase";
import { JwtAuthorizer } from "../../../presentation/lambda/services/jwtAuthorizer";

export const UnfollowUserEndpoint = async (req: Request, res: Response) => {
    try{
        const unfollowUserUC = new UnfollowUserUC(new UserRelationsDB(), new JwtAuthorizer());

        const auth = req.headers.Authorization || req.headers.authorization;

        const result = await unfollowUserUC.execute({
            token: auth as string,
            friendAddedId: req.body.friendAddedId
        })
    
        res.status(200).send(result)
    }catch(err){
        res.status(400).send({
            message: err.message
        })
    }
}