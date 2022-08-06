import { Doc } from "../entities/doc";

export class AddDocumentCommand
{
    userId: string;
    document: Doc;
}

export class UpdateDocumentCommand
{
    userId: string;
    document: Doc;
}

export class DeleteDocumentCommand
{
    userId: string;
    recordId: string;
}

export class GetDocumentQuery
{
    userId: string;
    recordId: string;
}

export class GetDocumentsQuery
{
    userId: string;
    query: any;
    collect: string;
}
