import { createContext, ReactNode, useEffect, useState } from "react";
import { UserDTO } from "@dtos/userDTO";
import { api } from "@services/api";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";

// define o formato dos dados que o contexto de autenticação fornecerá
export type AuthContextDataProps = {
  user: UserDTO; // armazena os dados do usuário autenticado
  signIn: (email: string, password: string) => Promise<void>; // função para autenticar o usuário
  signOut: () => Promise<void>; // função para deslogar o usuário
  isLoadingUserStorageData: boolean; // indica se os dados do usuário estão sendo carregados
};

// define as propriedades que o provedor do contexto aceitará
type AuthContextProviderProps = {
  children: ReactNode; // os componentes filhos que terão acesso ao contexto
};

// cria o contexto de autenticação com um valor inicial vazio do tipo AuthContextDataProps
export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  // estado que armazena os dados do usuário autenticado
  const [user, setUser] = useState({} as UserDTO);

  // estado para controlar o carregamento dos dados do usuário no armazenamento local
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  // função que atualiza o usuário e o token no cabeçalho da API
  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // define o token no cabeçalho da API
    setUser(userData); // atualiza o estado do usuário
  }

  // função que salva o usuário e o token no armazenamento local
  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStorageData(true); // define o estado de carregamento como verdadeiro

      await storageUserSave(userData); // salva os dados do usuário no armazenamento local
      await storageAuthTokenSave(token); // salva o token no armazenamento local
    } catch (error) {
      throw error; // lança um erro caso algo dê errado
    } finally {
      setIsLoadingUserStorageData(false); // define o estado de carregamento como falso
    }
  }

  // função para autenticar o usuário
  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password }); // faz a requisição de login

      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token); // salva o usuário e o token no armazenamento local
        userAndTokenUpdate(data.user, data.token); // atualiza o estado do usuário e o cabeçalho da API
      }
    } catch (error) {
      throw error; // lança um erro caso algo dê errado
    } finally {
      setIsLoadingUserStorageData(false); // define o estado de carregamento como falso
    }
  }

  // função para deslogar o usuário
  async function signOut() {
    try {
      setIsLoadingUserStorageData(true); // define o estado de carregamento como verdadeiro
      setUser({} as UserDTO); // limpa os dados do usuário no estado

      await storageUserRemove(); // remove os dados do usuário do armazenamento local
      await storageAuthTokenRemove(); // remove o token do armazenamento local
    } catch (error) {
      throw error; // lança um erro caso algo dê errado
    } finally {
      setIsLoadingUserStorageData(false); // define o estado de carregamento como falso
    }
  }

  // função que carrega os dados do usuário do armazenamento local ao iniciar o app
  async function loadUserData() {
    try {
      const userLogged = await storageUserGet(); // recupera os dados do usuário do armazenamento local
      const token = await storageAuthTokenGet(); // recupera o token do armazenamento local

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token); // atualiza o estado do usuário e o cabeçalho da API
      }
    } catch (error) {
      throw error; // lança um erro caso algo dê errado
    } finally {
      setIsLoadingUserStorageData(false); // define o estado de carregamento como falso
    }
  }

  // executa a função loadUserData assim que o componente for montado
  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isLoadingUserStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
