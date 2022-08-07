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
    this.router.post(`${this.path}/add`, this.documentsController.addDocument);
    this.router.post(`${this.path}/update`, this.documentsController.updateDocument);
    this.router.post(`${this.path}/store`, this.documentsController.storeDocument);
    this.router.post(`${this.path}/delete`, this.documentsController.deleteDocument);
    this.router.post(`${this.path}/get`, this.documentsController.getDocument);    
    this.router.post(`${this.path}/list-all`, this.documentsController.getDocuments);
  }
}

export default DocumentsRoute;
