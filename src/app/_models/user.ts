import { BaseVO } from './base-vo';

export class User extends BaseVO {
    uuid: string;
    email: string;
    firstName: string;
    lastName: string;
    nickName: string;

    public toString = (): string => {
        return `User [
            uuid: ${this.uuid},
            email: ${this.email},
            firstName: ${this.firstName},
            lastName: ${this.lastName},
            nickName: ${this.nickName}
        ]`;
    }
}
