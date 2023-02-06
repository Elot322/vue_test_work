import PlaceholderDatasource from "./datasource";
import {UserEntity} from "./entity";

interface IUserRepository {
    getUsers(): Promise<UserEntity[]>;
}

export class UserRepository implements IUserRepository {
    async getUsers(): Promise<UserEntity[]> {
        try{
         const users = await PlaceholderDatasource.getUsers();
         return users as Array<UserEntity>;
        } catch {
            throw Error('Repository error');
        }
    }
}

export default new UserRepository();
