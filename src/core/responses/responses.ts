import { Doc } from "../entities/doc";

export class AppResponse
{
    code: number;
    message: string;
    errors: Array<string>;

    constructor(){
        this.code = 200;
        this.message = "ok";
        this.errors = [];
    }
}

export class AddDocumentResponse extends AppResponse
{
    document: Doc;

    constructor()
    {
        super()
    }
}

export class StoreDocumentResponse extends AppResponse
{
    document: Doc;

    constructor()
    {
        super()
    }
}

export class GetDocumentResponse extends AppResponse
{
    document: Doc;
}

export class GetDocumentsResponse extends AppResponse
{
    documents: Array<Doc>;
}
