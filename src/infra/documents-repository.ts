import { IDocRepository } from "@/core/interfaces/doc-repository";
import { AddDocumentCommand, DeleteDocumentCommand, GetDocumentQuery, GetDocumentsQuery } from "@/core/requests/commands";
import { AddDocumentResponse, AppResponse, GetDocumentResponse, GetDocumentsResponse } from "@/core/responses/responses";
var fs = require('fs');

export class DocumentsFileRepository implements IDocRepository
{
    async add(command: AddDocumentCommand): Promise<AddDocumentResponse> {
        let response = new AddDocumentResponse();
    
        let doc = command.document;
        doc.createdAt = Date.now();

        let fileName = command.document.id + ".json";
        let jsonString = JSON.stringify(command.document);

        await fs.writeFileAsync(fileName, jsonString, 'text');

        return response;
    }

    delete(command: DeleteDocumentCommand): Promise<AppResponse> {
        throw new Error("Method not implemented.");
    }
    get(command: GetDocumentQuery): Promise<GetDocumentResponse> {
        throw new Error("Method not implemented.");
    }
    getDocuments(command: GetDocumentsQuery): Promise<GetDocumentsResponse> {
        throw new Error("Method not implemented.");
    }

}