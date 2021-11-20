export const getMuscleGroupCaptionByAlias = (alias) => {
  switch (alias) {
    case MUSCLE_GROUP.legs:
      return "Ноги";
    case MUSCLE_GROUP.hands:
      return "Руки";
    case MUSCLE_GROUP.shoulders:
      return "Плечи";
    case MUSCLE_GROUP.back:
      return "Спина";
    case MUSCLE_GROUP.chest:
      return "Грудь";
    default:
      return "Неопределенная группа мышц";
  }
};

export const MUSCLE_GROUP = {
  legs: "LEGS",
  hands: "HANDS",
  shoulders: "SHOULDERS",
  back: "BACK",
  chest: "CHEST",
};
