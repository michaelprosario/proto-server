import { IDocRepository } from "@/core/interfaces/doc-repository";
import { AddDocumentCommand, DeleteDocumentCommand, GetDocumentQuery, GetDocumentsQuery } from "@/core/requests/commands";
import { AddDocumentResponse, AppResponse, GetDocumentResponse, GetDocumentsResponse } from "@/core/responses/responses";
import { json } from "envalid";
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
        response.documents = [];

        try{
            let selectResponse = await knex('docs')
            .select({
                id: 'id',
                createdBy: 'createdBy',
                createdAt: 'createdAt',
                name: 'name',
                collection: 'collection',
                data: 'data'    
            })

            for(let record of selectResponse)
            {
                record.data = JSON.parse(record.data);
                response.documents.push(record);
            }

            console.log(selectResponse);

        }
        catch(e)
        {
            console.log(e);
            response.code = 500;
            response.message = "error on list operation"
        }

        return response;
    }

}