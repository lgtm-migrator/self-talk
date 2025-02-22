import { expect, beforeEach, it, Mock, vi } from "vitest";
import { IAuthenticationController } from "./authentication-controller";
import { SignInManager } from "./sign-in-manager";

let signInMock: Mock;
let signInManager: SignInManager;

beforeEach(() => {
  signInMock = vi.fn();
  signInManager = new SignInManager({
    signIn: signInMock,
  } as unknown as IAuthenticationController);
});

it("signs in", async () => {
  await signInManager.signIn();
  expect(signInMock.mock.calls).toHaveLength(1);
});
