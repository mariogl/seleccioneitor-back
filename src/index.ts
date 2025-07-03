// Example TypeScript file to test oxc linter
console.log("Hello from seleccioneitor-back!");

export interface User {
  id: number;
  name: string;
  email: string;
}

export class UserService {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}

const userService = new UserService();
export default userService;
