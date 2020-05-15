import { UserGateway } from "../../gateways/userGateway";
import { v4 } from "uuid";
import { UserType, User } from "../../entities/User";
import { InvalidParameterError } from "../../error/InvalidParams";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";

export class SignUpUC{
    constructor(
        private userGateway: UserGateway,
        private authenticationGateway: AuthenticationGateway,
        private cryptographyGateway: CryptographyGateway,
        private refreshTokenGateway: RefreshTokenGateway
    ){}

    public async execute(input: SignUpUCInput): Promise<SignUpUCOutput>{
        const id = v4();

        let type = UserType.user;

        if (input.type === "admin") {
            type = UserType.admin;
        } else if (input.type !== "user") {
            throw new InvalidParameterError("Invalid type");
        }

        if(input.password.length < 6){
            throw new Error("Minimun password length is 6");

        } else if (input.email.indexOf("@") === -1){
            throw new Error("Invalid email");

        } else {

            const hashPassword = await this.cryptographyGateway.encrypt(input.password);

            const user = new User(
                id,
                input.name,
                input.email,
                hashPassword,
                type
            )

            await this.userGateway.singUp(user)

            const accessToken = this.authenticationGateway.generateToken({
                id: user.getId(),
                type: user.getType()
            }, process.env.ACCESS_TOKEN_TIME as string)

            const refreshToken = this.authenticationGateway.generateToken({
                id: user.getId(),
                userDevice: input.device
            }, process.env.REFRESH_TOKEN_TIME as string)

            await this.refreshTokenGateway.createRefreshToken({
                token: refreshToken,
                userId: user.getId(),
                device: input.device
            })
            return {
                message: "User Created Successfully",
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        }

    }
}

export interface SignUpUCInput{
    name: string;
    email: string;
    password: string;
    type: string;
    device: string;
}

export interface SignUpUCOutput{
    message: string;
    accessToken: string;
    refreshToken: string;
}