import { AddDocumentCommand, DeleteDocumentCommand, GetDocumentQuery, GetDocumentsQuery, UpdateDocumentCommand } from "../requests/commands";
import { AddDocumentResponse, AppResponse, GetDocumentResponse, GetDocumentsResponse } from "../responses/responses";

export interface IDocRepository
{
    update(command: UpdateDocumentCommand): Promise<AppResponse>;
    add(command: AddDocumentCommand) : Promise<AddDocumentResponse>;
    delete(command: DeleteDocumentCommand) : Promise<AppResponse>;
    get(command: GetDocumentQuery) : Promise<GetDocumentResponse>;
    getDocuments(command: GetDocumentsQuery) : Promise<GetDocumentsResponse>;
    recordExists(recordId: string): Promise<boolean>;
}