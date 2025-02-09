import { AppError } from "@utils/appError";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.110:3333",
  timeout: 300, // define o tempo máximo de espera por uma resposta
});

// intercepta todas as respostas da API (sucesso ou erro)
api.interceptors.response.use(
  (response) => {
    // se a resposta for um sucesso, simplesmente retorna a resposta
    return response;
  },
  (error) => {
    // se houver um erro na resposta...
    if (error.response && error.response.data) {
      // se o erro contém dados específicos, cria um AppError com a mensagem retornada
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      // se não houver dados no erro, retorna o erro original
      return Promise.reject(error);
    }
  }
);

export { api };
