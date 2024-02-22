-- CreateTable
CREATE TABLE "Sport" (
    "SportId" SERIAL NOT NULL,
    "SportName" VARCHAR(30) NOT NULL,
    "SportDescription" VARCHAR(255) NOT NULL,
    "SportImage" VARCHAR(255) NOT NULL,

    CONSTRAINT "Sport_pkey" PRIMARY KEY ("SportId")
);

-- CreateTable
CREATE TABLE "GameMode" (
    "GameModeId" SERIAL NOT NULL,
    "GameModeName" VARCHAR(30) NOT NULL,
    "GameModeDescription" VARCHAR(255) NOT NULL,
    "SportId" INTEGER NOT NULL,

    CONSTRAINT "GameMode_pkey" PRIMARY KEY ("GameModeId")
);

-- CreateTable
CREATE TABLE "SportField" (
    "sportFieldId" SERIAL NOT NULL,
    "sportFieldName" VARCHAR(100) NOT NULL,
    "sportFieldAddress" VARCHAR(255) NOT NULL,

    CONSTRAINT "SportField_pkey" PRIMARY KEY ("sportFieldId")
);

-- CreateTable
CREATE TABLE "Match" (
    "matchId" SERIAL NOT NULL,
    "matchDate" DATE NOT NULL,
    "matchTime" TIMETZ NOT NULL,
    "matchDistrict" VARCHAR(50) NOT NULL,
    "matchRegistrationDate" TIMESTAMPTZ NOT NULL,
    "stateField" BOOLEAN NOT NULL DEFAULT false,
    "SportId" INTEGER NOT NULL,
    "GameModeId" INTEGER NOT NULL,
    "SportFieldId" INTEGER NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("matchId")
);

-- CreateTable
CREATE TABLE "player" (
    "playerId" SERIAL NOT NULL,
    "playerUserName" VARCHAR(100) NOT NULL,
    "playerPassword" VARCHAR(100) NOT NULL,
    "playerFirstName" VARCHAR(100) NOT NULL,
    "playerLastName" VARCHAR(100) NOT NULL,
    "playerPhoneNumber" CHAR(9) NOT NULL,
    "playerEmail" VARCHAR(100),
    "playerBirthDate" DATE NOT NULL,
    "playerImage" VARCHAR(255) NOT NULL,
    "playerGender" VARCHAR(20) NOT NULL,
    "playerDistrict" VARCHAR(50) NOT NULL,
    "playerRegistrationDate" TIMESTAMPTZ NOT NULL,
    "playerAvailability" BOOLEAN NOT NULL DEFAULT false,
    "playerSubscription" BOOLEAN NOT NULL DEFAULT false,
    "playerSearchStatus" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "player_pkey" PRIMARY KEY ("playerId")
);

-- CreateTable
CREATE TABLE "Team" (
    "teamId" SERIAL NOT NULL,
    "teamName" VARCHAR(100) NOT NULL,
    "teamLogo" VARCHAR(255) NOT NULL,
    "teamRegistrationDate" TIMESTAMPTZ NOT NULL,
    "teamSearchStatus" CHAR(1) NOT NULL,
    "SportId" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("teamId")
);

-- CreateTable
CREATE TABLE "SearchParameters" (
    "searchParametersId" SERIAL NOT NULL,
    "searchParametersMatchDate" DATE NOT NULL,
    "searchParametersMatchStartTime" TIMETZ NOT NULL,
    "searchParametersMatchEndTime" TIMETZ NOT NULL,
    "searchParametersDistrict" VARCHAR(50) NOT NULL,
    "SportId" INTEGER NOT NULL,
    "GameModeId" INTEGER NOT NULL,
    "TeamId" INTEGER NOT NULL,

    CONSTRAINT "SearchParameters_pkey" PRIMARY KEY ("searchParametersId")
);

-- CreateTable
CREATE TABLE "TeamplateQuestions" (
    "teamplateQuestionsId" SERIAL NOT NULL,
    "Question" VARCHAR(255) NOT NULL,
    "SportId" INTEGER NOT NULL,

    CONSTRAINT "TeamplateQuestions_pkey" PRIMARY KEY ("teamplateQuestionsId")
);

-- CreateTable
CREATE TABLE "answer" (
    "answerId" SERIAL NOT NULL,
    "answer" VARCHAR(255) NOT NULL,
    "teamplateQuestionsId" INTEGER NOT NULL,

    CONSTRAINT "answer_pkey" PRIMARY KEY ("answerId")
);

-- CreateTable
CREATE TABLE "sportPlayer" (
    "SportId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "sportPlayer_pkey" PRIMARY KEY ("SportId","playerId")
);

-- CreateTable
CREATE TABLE "preferences" (
    "playerId" INTEGER NOT NULL,
    "SportId" INTEGER NOT NULL,
    "answerId" INTEGER NOT NULL,

    CONSTRAINT "preferences_pkey" PRIMARY KEY ("playerId","SportId","answerId")
);

-- CreateTable
CREATE TABLE "members" (
    "playerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "memberRole" VARCHAR(1) NOT NULL,
    "memberRegistrationDate" TIMESTAMPTZ NOT NULL,
    "memberStatus" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "members_pkey" PRIMARY KEY ("playerId","teamId")
);

-- CreateTable
CREATE TABLE "teamMatch" (
    "teamId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,
    "statusNFU" BOOLEAN NOT NULL DEFAULT false,
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "teamMatch_pkey" PRIMARY KEY ("teamId","matchId")
);

-- CreateTable
CREATE TABLE "membersMatch" (
    "playerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,

    CONSTRAINT "membersMatch_pkey" PRIMARY KEY ("playerId","teamId","matchId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Match_SportId_key" ON "Match"("SportId");

-- CreateIndex
CREATE UNIQUE INDEX "Match_GameModeId_key" ON "Match"("GameModeId");

-- CreateIndex
CREATE UNIQUE INDEX "SearchParameters_SportId_key" ON "SearchParameters"("SportId");

-- CreateIndex
CREATE UNIQUE INDEX "SearchParameters_GameModeId_key" ON "SearchParameters"("GameModeId");

-- CreateIndex
CREATE UNIQUE INDEX "teamMatch_playerId_key" ON "teamMatch"("playerId");

-- AddForeignKey
ALTER TABLE "GameMode" ADD CONSTRAINT "GameMode_SportId_fkey" FOREIGN KEY ("SportId") REFERENCES "Sport"("SportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_SportId_fkey" FOREIGN KEY ("SportId") REFERENCES "Sport"("SportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_GameModeId_fkey" FOREIGN KEY ("GameModeId") REFERENCES "GameMode"("GameModeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_SportFieldId_fkey" FOREIGN KEY ("SportFieldId") REFERENCES "SportField"("sportFieldId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_SportId_fkey" FOREIGN KEY ("SportId") REFERENCES "Sport"("SportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchParameters" ADD CONSTRAINT "SearchParameters_SportId_fkey" FOREIGN KEY ("SportId") REFERENCES "Sport"("SportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchParameters" ADD CONSTRAINT "SearchParameters_GameModeId_fkey" FOREIGN KEY ("GameModeId") REFERENCES "GameMode"("GameModeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchParameters" ADD CONSTRAINT "SearchParameters_TeamId_fkey" FOREIGN KEY ("TeamId") REFERENCES "Team"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamplateQuestions" ADD CONSTRAINT "TeamplateQuestions_SportId_fkey" FOREIGN KEY ("SportId") REFERENCES "Sport"("SportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_teamplateQuestionsId_fkey" FOREIGN KEY ("teamplateQuestionsId") REFERENCES "TeamplateQuestions"("teamplateQuestionsId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sportPlayer" ADD CONSTRAINT "sportPlayer_SportId_fkey" FOREIGN KEY ("SportId") REFERENCES "Sport"("SportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sportPlayer" ADD CONSTRAINT "sportPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preferences" ADD CONSTRAINT "preferences_playerId_SportId_fkey" FOREIGN KEY ("playerId", "SportId") REFERENCES "sportPlayer"("playerId", "SportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preferences" ADD CONSTRAINT "preferences_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "answer"("answerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teamMatch" ADD CONSTRAINT "teamMatch_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teamMatch" ADD CONSTRAINT "teamMatch_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("matchId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teamMatch" ADD CONSTRAINT "teamMatch_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membersMatch" ADD CONSTRAINT "membersMatch_playerId_teamId_fkey" FOREIGN KEY ("playerId", "teamId") REFERENCES "members"("playerId", "teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membersMatch" ADD CONSTRAINT "membersMatch_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("matchId") ON DELETE RESTRICT ON UPDATE CASCADE;
