export class User {
    token: string;
    ok: boolean;
    user: any = {
        document: 0,
        email: '',
        image: '',
        lastName: '',
        name: '',
        password: '',
        role: ''
    };
    constructor() {
        this.token = '';
        this.ok = false;
      this.user = {};
    }
}
