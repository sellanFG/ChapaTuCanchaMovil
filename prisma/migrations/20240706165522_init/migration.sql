-- CreateTable
CREATE TABLE "Sport" (
    "sportId" SERIAL NOT NULL,
    "sportName" VARCHAR(30) NOT NULL,
    "sportDescription" VARCHAR(255) NOT NULL,
    "sportImage" VARCHAR(255) NOT NULL,

    CONSTRAINT "Sport_pkey" PRIMARY KEY ("sportId")
);

-- CreateTable
CREATE TABLE "GameMode" (
    "gameModeId" SERIAL NOT NULL,
    "gameModeName" VARCHAR(30) NOT NULL,
    "gameModeDescription" VARCHAR(255) NOT NULL,
    "sportId" INTEGER NOT NULL,

    CONSTRAINT "GameMode_pkey" PRIMARY KEY ("gameModeId")
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
    "sportId" INTEGER NOT NULL,
    "gameModeId" INTEGER NOT NULL,
    "sportFieldId" INTEGER NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("matchId")
);

-- CreateTable
CREATE TABLE "Player" (
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

    CONSTRAINT "Player_pkey" PRIMARY KEY ("playerId")
);

-- CreateTable
CREATE TABLE "Team" (
    "teamId" SERIAL NOT NULL,
    "teamName" VARCHAR(100) NOT NULL,
    "teamLogo" VARCHAR(255) NOT NULL,
    "teamRegistrationDate" TIMESTAMPTZ NOT NULL,
    "teamSearchStatus" CHAR(1) NOT NULL,
    "sportId" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("teamId")
);

-- CreateTable
CREATE TABLE "SearchParameter" (
    "searchParameterId" SERIAL NOT NULL,
    "searchParameterMatchDate" DATE NOT NULL,
    "searchParameterMatchStartTime" TIMETZ NOT NULL,
    "searchParameterMatchEndTime" TIMETZ NOT NULL,
    "searchParameterDistrict" VARCHAR(50) NOT NULL,
    "sportId" INTEGER NOT NULL,
    "gameModeId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "SearchParameter_pkey" PRIMARY KEY ("searchParameterId")
);

-- CreateTable
CREATE TABLE "QuestionsTemplate" (
    "questionsTemplateId" SERIAL NOT NULL,
    "question" VARCHAR(255) NOT NULL,
    "sportId" INTEGER NOT NULL,

    CONSTRAINT "QuestionsTemplate_pkey" PRIMARY KEY ("questionsTemplateId")
);

-- CreateTable
CREATE TABLE "Answer" (
    "answerId" SERIAL NOT NULL,
    "answer" VARCHAR(255) NOT NULL,
    "questionsTemplateId" INTEGER NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("answerId")
);

-- CreateTable
CREATE TABLE "SportPlayer" (
    "sportId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "SportPlayer_pkey" PRIMARY KEY ("sportId","playerId")
);

-- CreateTable
CREATE TABLE "Preference" (
    "playerId" INTEGER NOT NULL,
    "sportId" INTEGER NOT NULL,
    "answerId" INTEGER NOT NULL,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("playerId","answerId","sportId")
);

-- CreateTable
CREATE TABLE "Member" (
    "playerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "memberRole" VARCHAR(1) NOT NULL,
    "memberRegistrationDate" TIMESTAMPTZ NOT NULL,
    "memberStatus" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("playerId","teamId")
);

-- CreateTable
CREATE TABLE "TeamMatch" (
    "teamId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,
    "statusNFU" BOOLEAN NOT NULL DEFAULT false,
    "playerId" INTEGER,

    CONSTRAINT "TeamMatch_pkey" PRIMARY KEY ("teamId","matchId")
);

-- CreateTable
CREATE TABLE "MatchMember" (
    "playerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,

    CONSTRAINT "MatchMember_pkey" PRIMARY KEY ("playerId","teamId","matchId")
);

-- AddForeignKey
ALTER TABLE "GameMode" ADD CONSTRAINT "GameMode_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("sportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("sportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_gameModeId_fkey" FOREIGN KEY ("gameModeId") REFERENCES "GameMode"("gameModeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_sportFieldId_fkey" FOREIGN KEY ("sportFieldId") REFERENCES "SportField"("sportFieldId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("sportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchParameter" ADD CONSTRAINT "SearchParameter_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("sportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchParameter" ADD CONSTRAINT "SearchParameter_gameModeId_fkey" FOREIGN KEY ("gameModeId") REFERENCES "GameMode"("gameModeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SearchParameter" ADD CONSTRAINT "SearchParameter_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsTemplate" ADD CONSTRAINT "QuestionsTemplate_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("sportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionsTemplateId_fkey" FOREIGN KEY ("questionsTemplateId") REFERENCES "QuestionsTemplate"("questionsTemplateId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportPlayer" ADD CONSTRAINT "SportPlayer_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "Sport"("sportId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportPlayer" ADD CONSTRAINT "SportPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_playerId_sportId_fkey" FOREIGN KEY ("playerId", "sportId") REFERENCES "SportPlayer"("playerId", "sportId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("answerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMatch" ADD CONSTRAINT "TeamMatch_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMatch" ADD CONSTRAINT "TeamMatch_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("matchId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMatch" ADD CONSTRAINT "TeamMatch_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("playerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchMember" ADD CONSTRAINT "MatchMember_playerId_teamId_fkey" FOREIGN KEY ("playerId", "teamId") REFERENCES "Member"("playerId", "teamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchMember" ADD CONSTRAINT "MatchMember_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("matchId") ON DELETE RESTRICT ON UPDATE CASCADE;
