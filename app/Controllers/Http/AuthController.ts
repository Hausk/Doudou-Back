import SocialToken from '../../Models/SocialToken'
import User from '../../Models/User'
import CreateUserValidator from '../../Validators/CreateUserValidator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    public async redirect({ ally }: HttpContextContract) {
        return ally.use('google').stateless().redirect()
    }
    public async handleCallback({ ally, auth, response }: HttpContextContract) {
        try {
            const google = ally.use("google").stateless();
            /**
             * User has explicitly denied the login request
             */
            if (google.accessDenied()) {
                return "Access was denied";
            }
            /**
             * Unable to verify the CSRF state
             */
            if (google.stateMisMatch()) {
                return "Request expired. try again";
            }
            /**
             * There was an unknown error during the redirect
             */
            if (google.hasError()) {
                return google.getError();
            }
            /**
             * Managing error states here
             */
            const user = await google.user();

            const { token } = user;

            const findUser = await User.findBy('email', user.email);

            if (!findUser) {
                return response.json({
                    status: 404,
                    message: "Compte inexistant",
                });
            }
            let socialToken = await SocialToken.query()
                .where("id", findUser.id)
                .first();
            socialToken = socialToken ? socialToken : new SocialToken();
            socialToken.user_id = findUser.id;
            socialToken.token = token.token;
            socialToken.type = token.type;
            socialToken.expiresAt = token.expiresAt?.toString() as string;

            await socialToken.save();
            const userToken = await auth.use("api").generate(findUser, {
                expiresIn: "90 mins",
            });
            response.json({ /* newUser, */ userToken /* , socialToken */ });
        } catch (err) {
            response.json({
                status: false,
                message: err.message,
            });
        }
    }
    public async logout({ auth, response }: HttpContextContract) {
        await auth.use("api").revoke();
        return response.json({
            revoked: true,
        });
    }
    /* A supprimer */
    public async status({ auth, response }: HttpContextContract) {
        const isLoggedIn = await auth.use("api").check();
        return response.json({
            isLoggedIn
        });
    }
}
