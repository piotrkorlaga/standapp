export class Invitation {
  constructor(fromUser, id?, isRead?, isAccepted?) {
    this.fromUser = fromUser;
    this.id = id;
    this.isRead = isRead || false;
    this.isAccepted = isAccepted || false;
  }
}
