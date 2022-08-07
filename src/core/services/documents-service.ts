import { IDocRepository } from "../interfaces/doc-repository";
import { AddDocumentCommand, DeleteDocumentCommand, GetDocumentQuery, GetDocumentsQuery, StoreDocumentCommand, UpdateDocumentCommand } from "../requests/commands";
import { AddDocumentResponse, AppResponse, GetDocumentResponse, GetDocumentsResponse, StoreDocumentResponse } from "../responses/responses";

export class DocumentsService
{
    constructor(private docRepository: IDocRepository)
    {

    }

    async update(command: UpdateDocumentCommand) {
        let response = new AppResponse();
        if(!command || !command.document)
        {
            response.code = 400;
            response.message = "command or document not defined";
            return response;
        }

        if(!command.userId)
        {
            response.code = 400;
            response.message = "command.userId not defined";
            return response;
        }

        if(!command.document.name)
        {
            response.code = 400;
            response.message = "command.document.name not defined";
            return response;
        }

        if(!command.document.collection)
        {
            response.code = 400;
            response.message = "command.document.collection not defined";
            return response;
        }

        if(!command.document.data)
        {
            response.code = 400;
            response.message = "command.document.data not defined";
            return response;
        }
            
        return await this.docRepository.update(command);
    }

    async store(command: StoreDocumentCommand) : Promise<StoreDocumentResponse> {
        let response = new StoreDocumentResponse();
        if(!command || !command.document)
        {
            response.code = 400;
            response.message = "command or document not defined";
            return response;
        }

        if(!command.userId)
        {
            response.code = 400;
            response.message = "command.userId not defined";
            return response;
        }

        if(!command.document.name)
        {
            response.code = 400;
            response.message = "command.document.name not defined";
            return response;
        }

        if(!command.document.collection)
        {
            response.code = 400;
            response.message = "command.document.collection not defined";
            return response;
        }

        if(!command.document.data)
        {
            response.code = 400;
            response.message = "command.document.data not defined";
            return response;
        }
        // check to see if record exists
        let documentId = "";
        if(this.docRepository.recordExists(command.document.id))
        {
            // update if it does exist
            let updateCommand = new UpdateDocumentCommand();
            updateCommand.document = command.document;
            updateCommand.userId = command.userId;
            await this.update(command);
            response.document = command.document;
            
        }else{
            // run add if it it does not exists
            let addCommand = new AddDocumentCommand();
            addCommand.document = command.document;
            addCommand.userId = command.userId;
            let addResponse = await this.add(addCommand);
            response.document = addResponse.document;
        }

        return response;

    }

    async add(command: AddDocumentCommand): Promise<AddDocumentResponse> {
        let response = new AddDocumentResponse();
        if(!command || !command.document)
        {
            response.code = 400;
            response.message = "command or document not defined";
            return response;
        }

        if(!command.userId)
        {
            response.code = 400;
            response.message = "command.userId not defined";
            return response;
        }

        if(!command.document.name)
        {
            response.code = 400;
            response.message = "command.document.name not defined";
            return response;
        }

        if(!command.document.collection)
        {
            response.code = 400;
            response.message = "command.document.collection not defined";
            return response;
        }

        if(!command.document.data)
        {
            response.code = 400;
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
            response.code = 400;
            response.message = "command not defined";
            return response;
        }

        if(!command.userId)
        {
            response.code = 400;
            response.message = "command.userId not defined";
            return response;
        }

        if(!command.recordId)
        {
            response.code = 400;
            response.message = "command.recordId not defined";
            return response;
        }

        return await this.docRepository.delete(command);
    }

    async get(command: GetDocumentQuery): Promise<GetDocumentResponse> {
        let response = new GetDocumentResponse();
        if(!command)
        {
            response.code = 400;
            response.message = "command not defined";
            return response;
        }

        if(!command.userId)
        {
            response.code = 400;
            response.message = "command.userId not defined";
            return response;
        }

        if(!command.recordId)
        {
            response.code = 400;
            response.message = "command.recordId not defined";
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