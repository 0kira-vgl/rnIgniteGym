// classe para criar erros personalizados
export class AppError {
  // define a propriedade "message" que armazenará a mensagem de erro
  message: string;

  // ao criar um novo AppError, recebe e salva a mensagem
  constructor(message: string) {
    this.message = message;
  }
}
