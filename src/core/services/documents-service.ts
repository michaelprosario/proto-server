import { IDocRepository } from "../interfaces/doc-repository";
import { AddDocumentCommand, DeleteDocumentCommand, GetDocumentQuery, GetDocumentsQuery } from "../requests/commands";
import { AddDocumentResponse, AppResponse, GetDocumentResponse, GetDocumentsResponse } from "../responses/responses";

export class DocumentsService
{
    constructor(private docRepository: IDocRepository)
    {

    }

    async add(command: AddDocumentCommand): Promise<AddDocumentResponse> {
        let response = new AddDocumentResponse();
        if(!command || command.document)
        {
            response.code = 401;
            response.message = "command or document not defined";
            return response;
        }

        if(!command.userId)
        {
            response.code = 401;
            response.message = "command.userId not defined";
            return response;
        }

        if(!command.document.name)
        {
            response.code = 401;
            response.message = "command.document.name not defined";
            return response;
        }

        if(!command.document.data)
        {
            response.code = 401;
            response.message = "command.document.data not defined";
            return response;
        }
            
        // populate document id if it's not defined.
        if(!command.document.id)
        {
            let recordId = Math.floor(Math.random()*1000000);
            command.document.id = recordId + "";
        }

        return await this.docRepository.add(command);
    }

    async delete(command: DeleteDocumentCommand): Promise<AppResponse> {
        let response = new AppResponse();
        if(!command)
        {
            response.code = 401;
            response.message = "command not defined";
            return response;
        }

        if(!command.userId)
        {
            response.code = 401;
            response.message = "command.userId not defined";
            return response;
        }

        return await this.docRepository.delete(command);
    }

    async get(command: GetDocumentQuery): Promise<GetDocumentResponse> {
        let response = new GetDocumentResponse();
        if(!command)
        {
            response.code = 401;
            response.message = "command not defined";
            return response;
        }

        if(!command.userId)
        {
            response.code = 401;
            response.message = "command.userId not defined";
            return response;
        }

        return await this.docRepository.get(command);
    }

    async getDocuments(command: GetDocumentsQuery): Promise<GetDocumentsResponse> {
        let response = new GetDocumentsResponse();
        if(!command)
        {
            response.code = 401;
            response.message = "command not defined";
            return response;
        }

        if(!command.userId)
        {
            response.code = 401;
            response.message = "command.userId not defined";
            return response;
        }

        return this.docRepository.getDocuments(command);
    }
}