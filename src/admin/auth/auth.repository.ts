import { Repository, EntityRepository, getConnection } from "typeorm";
import { User } from '../user/user.entity';
import { RegisterDTO } from './dtos/register.dto';
import { RoleRepository } from '../role/role.repository';
import { Role } from '../role/role.entity';
import { genSalt, hash } from "bcryptjs";

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
    

    async register( user: RegisterDTO ) {

        const { userName, password } = user;

        const newUser = new User();

        const roleRepo: RoleRepository = await getConnection().getRepository(Role);

        const role: Role = await roleRepo.findOne({ where: { name: 'Administrator' } });

        newUser.userName = userName;
        newUser.role = role;

        const salt = await genSalt(10);
        newUser.password = await hash( password, salt);

        await newUser.save();

        return {
            ok: true,
            message: 'User successfully registered',
            User: newUser
        }

    }

}