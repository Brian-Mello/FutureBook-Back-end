import { UserGateway } from '../../gateways/userGateway';
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";

export class LoginUC{
    constructor(
        private userGateway: UserGateway,
        private authenticationGateway: AuthenticationGateway,
        private cryptographyGateway: CryptographyGateway,
        private refreshTokenGateway: RefreshTokenGateway
    ){}

    public async execute(input: LoginUCInput): Promise<LoginUCOutput>{

        if(input.email.indexOf("@") === -1 || input.password.length < 6){
            throw new Error("Invalid password or email");
        };

        const user = await this.userGateway.login(input.email);

        if(!user){
            throw new Error("User not found!");
        };

        const compare = await this.cryptographyGateway.compare(input.password, user.getPassword())

        if(!compare) {
            throw new Error("invalid password or email");
        };

        const accessToken = this.authenticationGateway.generateToken({
            id: user.getId(),
            type: user.getType()
        }, process.env.ACCESS_TOKEN_TIME as string)

        const refreshToken = this.authenticationGateway.generateToken({
            id: user.getId(),
            userDevice: input.device
        }, process.env.REFRESH_TOKEN_TIME as string)

        const refreshTokenForUserAndDevice = await this.refreshTokenGateway.getRefreshToken(
            input.device,
            user.getId()
        )

        if(refreshTokenForUserAndDevice){
            await this.refreshTokenGateway.deleteRefreshToken(input.device, user.getId())
        }

        await this.refreshTokenGateway.createRefreshToken({
            token: refreshToken,
            userId: user.getId(),
            device: input.device
        })

        return {
            message: "User Logged Successfully",
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }
}

export interface LoginUCInput{
    email: string;
    password: string;
    device: string;
}

export interface LoginUCOutput{
    message: string;
    accessToken: string;
    refreshToken: string;
}