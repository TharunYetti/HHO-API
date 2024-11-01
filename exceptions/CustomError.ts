export class ValidationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "Insufficient parameters";
    }
  }
  
export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "The document already exist";
  }
}

export class NotFoundError extends Error{
    constructor(message: string){
        super(message);
        this.name = "The requested document not found";
    }
}