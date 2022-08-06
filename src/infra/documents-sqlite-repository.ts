import { IDocRepository } from "@/core/interfaces/doc-repository";
import { AddDocumentCommand, DeleteDocumentCommand, GetDocumentQuery, GetDocumentsQuery } from "@/core/requests/commands";
import { AddDocumentResponse, AppResponse, GetDocumentResponse, GetDocumentsResponse } from "@/core/responses/responses";
const knexConfig = require('../../db/knexfile');
const knex = require('knex')(knexConfig["development"])

export class DocumentsSqliteRepository implements IDocRepository {
    async add(command: AddDocumentCommand): Promise<AddDocumentResponse> {
        let response = new AddDocumentResponse();

        let doc = command.document;
        doc.createdAt = Date.now();

        try
        {
            let insertResponse = await knex('docs').insert(doc)
        }
        catch(e)
        {
            console.log(e);
            response.code = 500;
            response.message = "error on insert";
        }

        return response;
    }

    async delete(command: DeleteDocumentCommand): Promise<AppResponse> {
        let response = new AppResponse();

        return response;
    }
    async get(command: GetDocumentQuery): Promise<GetDocumentResponse> {
        let response = new GetDocumentResponse();

        return response;
    }

    async getDocuments(command: GetDocumentsQuery): Promise<GetDocumentsResponse> {
        let response = new GetDocumentsResponse();
        // create empty list
        // list all json files
        // load entities from file system  
        return response;
    }

}