import { AddDocumentCommand, DeleteDocumentCommand, GetDocumentQuery, GetDocumentsQuery } from "../requests/commands";
import { AddDocumentResponse, AppResponse, GetDocumentResponse, GetDocumentsResponse } from "../responses/responses";

export interface IDocRepository
{
    add(command: AddDocumentCommand) : Promise<AddDocumentResponse>;
    delete(command: DeleteDocumentCommand) : Promise<AppResponse>;
    get(command: GetDocumentQuery) : Promise<GetDocumentResponse>;
    getDocuments(command: GetDocumentsQuery) : Promise<GetDocumentsResponse>;
}