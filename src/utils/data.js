export const getMuscleGroupCaptionByAlias = (alias) => {
  switch (alias.toLowerCase()) {
    case "legs":
      return "Ноги";
    case "hands":
      return "Руки";
    case "shoulders":
      return "Плечи";
    case "back":
      return "Спина";
    case "chest":
      return "Грудь";
    default:
      return "Неопределенная группа мышц";
  }
};
