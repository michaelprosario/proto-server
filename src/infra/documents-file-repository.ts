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

    async delete(command: DeleteDocumentCommand): Promise<AppResponse> {
        let response = new AppResponse();

        let fileName = command.recordId + ".json";
        await fs.unlink(fileName);
        return response;
    }
    async get(command: GetDocumentQuery): Promise<GetDocumentResponse> {
        let response = new GetDocumentResponse();
        let fileName = command.recordId + ".json";
        let fsGetResponse = await fs.readFile(fileName); 
        console.log(fsGetResponse);

        return response;
    }

    getDocuments(command: GetDocumentsQuery): Promise<GetDocumentsResponse> {
        // create empty list
        // list all json files
        // load entities from file system  

        throw new Error("Method not implemented.");
    }

}