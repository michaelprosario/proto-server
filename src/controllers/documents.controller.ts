import { AddDocumentCommand, DeleteDocumentCommand, GetDocumentQuery, GetDocumentsQuery } from '@/core/requests/commands';
import { DocumentsService } from '@/core/services/documents-service';
import { DocumentsSqliteRepository } from '@/infra/documents-sqlite-repository';
import { NextFunction, Request, Response } from 'express';

class DocumentsController {
  public documentsService : DocumentsService;

  constructor(){
    let repo = new DocumentsSqliteRepository();
    this.documentsService = new DocumentsService(repo);
  }

  public addDocument = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const command: AddDocumentCommand = req.body;
      const response = await this.documentsService.add(command);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public deleteDocument = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const command: DeleteDocumentCommand = req.body;
      const response = await this.documentsService.delete(command);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public getDocument = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const command: GetDocumentQuery = req.body;
      const response = await this.documentsService.get(command);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };  

  public getDocuments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const command: GetDocumentsQuery = req.body;
      const response = await this.documentsService.getDocuments(command);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

}

export default DocumentsController;
