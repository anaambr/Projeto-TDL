export function unlockAchievement(name) {
  let achievements = JSON.parse(localStorage.getItem("achievements")) || [];

  if (!achievements.includes(name)) {
    achievements.push(name);
    localStorage.setItem("achievements", JSON.stringify(achievements));
  }
}
