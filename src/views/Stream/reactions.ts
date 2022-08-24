export enum Reaction {
  Alarm = 'alarm',
  Applause = 'applause',
  Celebrate = 'celebrate',
  Fire = 'fire',
  Rose = 'rose',
  Surprise = 'surprise',
  Heart = 'heart',
}

export const emojiMap = {
  [Reaction.Alarm]: "🚨",
  [Reaction.Applause]: "👏",
  [Reaction.Celebrate]: "🥳",
  [Reaction.Fire]: "🔥",
  [Reaction.Rose]: "🌹",
  [Reaction.Surprise]: "😱",
  [Reaction.Heart]: "💖"
}
