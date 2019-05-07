import { IDocument } from "../domain/document";

export interface IDocumentRepository<C> {
  create(document: IDocument): Promise<void>;
  delete(documentID: string): Promise<void>;
  list(limit: number): Promise<IListResult<C>>;
  listFromCursor(cursor: C, limit: number): Promise<IListResult<C>>;
  update(document: IDocument): Promise<void>;
}

export interface IListResult<C> {
  documents: IDocument[];
  cursor: C | null;
}
