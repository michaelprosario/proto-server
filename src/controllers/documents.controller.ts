import { AddDocumentCommand, DeleteDocumentCommand } from '@/core/requests/commands';
import { DocumentsService } from '@/core/services/documents-service';
import { DocumentsFileRepository } from '@/infra/documents-repository';
import { NextFunction, Request, Response } from 'express';

class DocumentsController {
  public documentsService : DocumentsService;

  constructor(){
    let repo = new DocumentsFileRepository();
    this.documentsService = new DocumentsService(repo);
  }

  public addDocument = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const command: AddDocumentCommand = req.body;
      const response = await this.documentsService.add(command);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  public deleteDocument = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const command: DeleteDocumentCommand = req.body;
      const response = await this.documentsService.delete(command);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

}

export default DocumentsController;
