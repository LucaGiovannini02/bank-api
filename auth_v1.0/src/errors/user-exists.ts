export class UserExistsError extends Error {
  constructor() {
    super();
    this.name = 'UserExists';
    this.message = 'This user already exists';
  }
}