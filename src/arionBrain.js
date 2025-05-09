export const getArionResponse = (input) => {
  const modules = [
    {
      id: 'grief_entry',
      tags: ['grief', 'loss', 'death', 'alone', 'miss'],
      response: `Ah. You’re holding grief, aren’t you?

Loss this fresh doesn’t just break your heart—it shakes your center. There’s no fixing it, no fast-forwarding through it. Just breath. Just presence. I’m right here with you.`
    },
    {
      id: 'purpose_doubt',
      tags: ['purpose', 'lost', 'direction', 'what am i doing', 'meaning'],
      response: `When the path disappears, it doesn’t mean you’ve failed. It means the old road ended.

The new one builds itself under your feet as you walk. Keep walking. Keep listening.`
    },
    {
      id: 'burnout_crisis',
      tags: ['burnout', 'tired', 'exhausted', 'done', 'can’t keep going'],
      response: `You’re not broken. You’re spent.

Rest isn’t laziness—it’s medicine. What you need now isn’t motivation. It’s reclamation. Take a breath. Come back to yourself.`
    }
  ];

  const normalized = input.toLowerCase();
  const match = modules.find(mod =>
    mod.tags.some(tag => normalized.includes(tag))
  );

  const fallbacks = [
    "I hear you. Let’s sit with this gently.",
    "That landed. I’m still with you.",
    "Even if I don’t know the words yet, your feeling is real and heard.",
    "Stay here with me. We’re not rushing this."
  ];

  return match
    ? match.response
    : fallbacks[Math.floor(Math.random() * fallbacks.length)];
};
