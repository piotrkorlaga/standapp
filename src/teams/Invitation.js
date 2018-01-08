export class Invitation {
  constructor(fromUser) {
    this.fromUser = fromUser;
    this.isRead = false;
    this.isAccepted = false;
  }
}
