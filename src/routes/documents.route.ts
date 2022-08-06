import DocumentsController from '@/controllers/documents.controller';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';

class DocumentsRoute implements Routes {
  public path = '/documents';
  public router = Router();
  public documentsController = new DocumentsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/add-document`, this.documentsController.addDocument);
    this.router.post(`${this.path}/delete-document`, this.documentsController.deleteDocument);    
  }
}

export default DocumentsRoute;
