import * as firebase from "firebase";
import React from "react";
import { render } from "react-dom";
import { ApplicationInitializer } from "../../application/application-initializer";
import { DocumentCreator } from "../../application/document-creator";
import { DocumentLister } from "../../application/document-lister";
import { DocumentUpdater } from "../../application/document-updater";
import { SignInManager } from "../../application/sign-in-manager";
import { SignOutManager } from "../../application/sign-out-manager";
import { IDocument } from "../../domain/document";
import { App } from "./App";
import { GlobalStyle } from "./style";

export class ReactRenderer {
  constructor(
    private readonly applicationInitializer: ApplicationInitializer,
    private readonly signInManager: SignInManager,
    private readonly signOutManager: SignOutManager,
    private readonly documentCreator: DocumentCreator,
    private readonly documentLister: DocumentLister<
      firebase.firestore.DocumentSnapshot
    >,
    private readonly documentUpdater: DocumentUpdater
  ) {}

  public render(element: HTMLElement): void {
    render(
      <>
        <App
          createDocument={(text: string) => this.documentCreator.create(text)}
          initialize={() => this.applicationInitializer.initialize()}
          listDocuments={() => this.documentLister.list()}
          listMoreDocuments={() => this.documentLister.listMore()}
          signIn={() => this.signInManager.signIn()}
          signOut={() => this.signOutManager.signOut()}
          updateDocument={(document: IDocument, text: string) =>
            this.documentUpdater.update(document, text)
          }
        />
        <GlobalStyle />
      </>,
      element
    );
  }
}
