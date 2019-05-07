import React, { useState } from "react";
import { PulseLoader } from "react-spinners";
import { useAsync } from "react-use";
import styled from "styled-components";
import { IDocument } from "../../domain/document";
import { CreateDocument } from "./CreateDocument";
import { Documents } from "./Documents";
import { SignOut } from "./SignOut";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 80ex;
  max-width: 100%;
  margin: auto;

  > :first-child {
    flex: 1;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreateDocumentContainer = styled.div`
  position: relative;
`;

const CreateDocumentBackground = styled.div`
  background: darkkhaki;
  position: absolute;
  top: 0;
  left: -100vw;
  width: 200vw;
  height: 100%;
  z-index: -1;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.3);
`;

const SignOutContainer = styled.div`
  position: fixed;
  top: 0.5em;
  right: 0.5em;
`;

export interface IProps {
  createDocument: (text: string) => Promise<void>;
  listDocuments: () => Promise<IDocument[]>;
  listMoreDocuments: () => Promise<IDocument[]>;
  signOut: () => Promise<void>;
  updateDocument: (
    document: IDocument,
    text: string
  ) => Promise<IDocument | null>;
}

export const Home = ({
  createDocument,
  listDocuments,
  listMoreDocuments,
  signOut,
  updateDocument
}: IProps) => {
  const [documents, setDocuments] = useState<IDocument[] | null>(null);
  useAsync(async () => setDocuments(await listDocuments()), []);

  return (
    <Container>
      {documents ? (
        <Documents
          documents={documents}
          listMoreDocuments={async () =>
            setDocuments([...documents, ...(await listMoreDocuments())])
          }
          updateDocument={async (document: IDocument, text: string) => {
            const newDocument = await updateDocument(document, text);

            if (!newDocument) {
              setDocuments(
                documents.filter(
                  existingDocument => existingDocument.id !== document.id
                )
              );
              return;
            }

            setDocuments(
              documents.map(document =>
                document.id === newDocument.id ? newDocument : document
              )
            );
          }}
        />
      ) : (
        <LoaderContainer>
          <PulseLoader color="white" />
        </LoaderContainer>
      )}
      <CreateDocumentContainer>
        <CreateDocument
          createDocument={async (text: string) => {
            await createDocument(text);
            setDocuments(await listDocuments());
          }}
        />
        <CreateDocumentBackground />
      </CreateDocumentContainer>
      <SignOutContainer>
        <SignOut signOut={signOut} />
      </SignOutContainer>
    </Container>
  );
};
