import { UserModel } from "./model";

interface IDatasourceUsers {
//
//Получение списка пользователей
//
getUsers(): Promise<Array<UserModel>>;
}

export class PlaceholderDatasource implements IDatasourceUsers {
    getUsers(): Promise<Array<UserModel>> {
        return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json().then(data => {console.log(data as UserModel); return data as Array<UserModel>});
          })       
    }
}

export default new PlaceholderDatasource();
