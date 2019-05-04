import { IAuthenticationController } from "./authentication-controller";

export class SignInManager {
  constructor(
    private readonly authenticationController: IAuthenticationController
  ) {}

  public async signIn(): Promise<boolean> {
    return await this.authenticationController.signIn();
  }
}
