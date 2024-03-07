export class PlayerEntity {
  constructor(
    playerId: number,
    playerUserName: string,
    playerPassword: string,
    playerFirstName: string,
    playerLastName: string,
    playerPhoneNumber: string,
    playerEmail: string,
    playerBirthDate: Date,
    playerImage: string,
    playerGender: string,
    playerDistrict: string,
    playerRegistrationDate: Date,
    playerAvailability: boolean,
    playerSubscription: boolean,
    playerSearchStatus: boolean,
  ) {
    this.playerId = playerId;
    this.playerUserName = playerUserName;
    this.playerPassword = playerPassword;
    this.playerFirstName = playerFirstName;
    this.playerLastName = playerLastName;
    this.playerPhoneNumber = playerPhoneNumber;
    this.playerEmail = playerEmail;
    this.playerBirthDate = playerBirthDate;
    this.playerImage = playerImage;
    this.playerGender = playerGender;
    this.playerDistrict = playerDistrict;
    this.playerRegistrationDate = playerRegistrationDate;
    this.playerAvailability = playerAvailability;
    this.playerSubscription = playerSubscription;
    this.playerSearchStatus = playerSearchStatus;
  }

  playerId: number;
  playerUserName: string;
  playerPassword: string;
  playerFirstName: string;
  playerLastName: string;
  playerPhoneNumber: string;
  playerEmail: string;
  playerBirthDate: Date;
  playerImage: string;
  playerGender: string;
  playerDistrict: string;
  playerRegistrationDate: Date;
  playerAvailability: boolean;
  playerSubscription: boolean;
  playerSearchStatus: boolean;
}
