import { emojiBlast } from "emoji-blast";

export const happyBlast = (element: HTMLButtonElement) => {
  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const numSmileys = 8;
  const maxJumpHeight = 50;

  for (let i = 0; i < numSmileys; i++) {
    setTimeout(() => {
      const jumpHeight = Math.random() * maxJumpHeight + 10;
      emojiBlast({
        emojiCount: 1,
        emojis: ["😊"],
        position: { x, y },
        physics: {
          fontSize: 100,
          gravity: 1,
          initialVelocities: {
            x: Math.random() * 40 - 20,
            y: -jumpHeight,
            rotation: 5,
          },
        },
      });
    }, i * 100);
  }
};

export const sadBlast = (element: HTMLButtonElement) => {
  const rect = element.getBoundingClientRect();
  const leftEyeX = rect.left + rect.width * 0.35;
  const rightEyeX = rect.left + rect.width * 0.65;
  const eyeY = rect.top + rect.height * 0.4;

  const tearPositions = [
    { x: leftEyeX, y: eyeY },
    { x: rightEyeX, y: eyeY },
  ];

  tearPositions.forEach(({ x, y }) => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        emojiBlast({
          emojiCount: 1,
          emojis: ["💧"],
          position: { x, y },
          physics: {
            fontSize: { max: 70, min: 25 },
            gravity: 1.2,
            initialVelocities: {
              rotation: { max: 0, min: 0 },
              x: { max: 5, min: -5 },
              y: { max: -5, min: -10 },
            },
          },
        });
      }, i * 300);
    }
  });
};

export const angryBlast = (element: HTMLButtonElement) => {
  const rect = element.getBoundingClientRect();
  const head = rect.top + rect.height * 0.025;

  for (let i = 0; i < 15; i++) {
    const x = rect.left + rect.width * (0.2 + Math.random() * 0.6);
    setTimeout(() => {
      emojiBlast({
        className: "fader",
        emojiCount: 3,
        emojis: ["🔥"],
        position: { x, y: head },
        physics: {
          fontSize: { max: 8 * i, min: 30 },
          gravity: -0.01,
          initialVelocities: {
            rotation: { max: 0, min: 0 },
            x: { max: 1, min: -1 },
            y: { max: -5, min: -1 },
          },
        },
      });
    }, i * 50);
  }
};

export const excitedBlast = (element: HTMLButtonElement) => {
  const rect = element.getBoundingClientRect();
  const leftEyeX = rect.left + rect.width * 0.35;
  const rightEyeX = rect.left + rect.width * 0.65;
  const eyeY = rect.top + rect.height * 0.4;

  const starPositions = [
    { x: leftEyeX, y: eyeY },
    { x: rightEyeX, y: eyeY },
  ];

  starPositions.forEach(({ x, y }) => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        emojiBlast({
          emojiCount: 1,
          emojis: ["✨"],
          position: { x, y },
          physics: {
            fontSize: { max: 70, min: 25 },
            gravity: -1,
            initialVelocities: {
              rotation: { max: 10, min: -10 },
              x: { max: 5, min: -5 },
              y: { max: -5, min: -10 },
            },
          },
        });
      }, i * 100);
    }
  });
};

export const sillyBlast = (element: HTMLButtonElement) => {
  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  emojiBlast({
    emojis: ["🤪"],
    position: { x, y },
    physics: {
      fontSize: { max: 100, min: 20 },
      gravity: 0.5,
      initialVelocities: {
        rotation: { max: 5, min: -5 },
        x: { max: 25, min: -20 },
        y: { max: 0, min: -50 },
      },
      rotationDeceleration: 1,
    },
  });
};

export const scaredBlast = (element: HTMLButtonElement) => {
  const rect = element.getBoundingClientRect();
  const leftHeadX = rect.left + rect.width * 0.35;
  const rightHeadX = rect.left + rect.width * 0.65;
  const headY = rect.top - 20;

  const tearPositions = [leftHeadX, rightHeadX];

  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const positionX = tearPositions[i % 2];
      const direction = positionX === leftHeadX ? -1 : 1;
      emojiBlast({
        emojiCount: 1,
        emojis: ["💧"],
        position: { x: positionX, y: headY },
        physics: {
          fontSize: { max: 50, min: 20 },
          gravity: 1.2,
          initialVelocities: {
            rotation: { max: 0, min: 0 },
            x: { max: 10 * direction, min: 3 * direction },
            y: { max: -5, min: -10 },
          },
        },
      });
    }, i * 150);
  }
};

export const boredBlast = (element: HTMLButtonElement) => {
  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2 + 100;

  const puffs = [
    {
      position: { x, y },
      rotation: 90,
      fontSize: { max: 150, min: 150 },
      initialVelocities: {
        rotation: { max: 0, min: 0 },
        x: { max: 0, min: 0 },
        y: { max: 10, min: 10 },
      },
    },
    {
      position: { x: x - 50, y: y - 50 },
      rotation: 135,
      fontSize: { max: 75, min: 75 },
      initialVelocities: {
        rotation: { max: 0, min: 0 },
        x: { max: -5, min: -5 },
        y: { max: 8, min: 8 },
      },
    },
    {
      position: { x: x + 50, y: y - 50 },
      rotation: 45,
      fontSize: { max: 75, min: 75 },
      initialVelocities: {
        rotation: { max: 0, min: 0 },
        x: { max: 5, min: 5 },
        y: { max: 8, min: 8 },
      },
    },
  ];

  puffs.forEach(({ rotation, fontSize, initialVelocities, position }) => {
    emojiBlast({
      className: "fader",
      emojiCount: 1,
      emojis: ["💨"],
      position: position,
      physics: {
        fontSize: fontSize,
        gravity: 0,
        rotation: rotation,
        initialVelocities: initialVelocities,
      },
    });

    setInterval(() => {});
  });
};

export const nervousBlast = (element: HTMLButtonElement) => {
  const rect = element.getBoundingClientRect();
  const head = rect.top + rect.height * 0.025;

  for (let i = 0; i < 10; i++) {
    const x = rect.left + rect.width * (0.2 + Math.random() * 0.6);
    setTimeout(() => {
      emojiBlast({
        className: "fader",
        emojiCount: 1,
        emojis: ["❔", "❕"],
        position: { x, y: head },
        physics: {
          fontSize: { max: 10 * i, min: 40 },
          gravity: -0.01,
          initialVelocities: {
            rotation: { max: 0, min: 0 },
            x: { max: 1, min: -1 },
            y: { max: -2, min: -1 },
          },
        },
      });
    }, i * 50);
  }
};

export const tiredBlast = (element: HTMLButtonElement) => {
  const rect = element.getBoundingClientRect();
  const head = rect.top + rect.height * 0.025;

  for (let i = 0; i < 5; i++) {
    const x = rect.left + rect.width * (0.2 + Math.random() * 0.6);
    setTimeout(() => {
      emojiBlast({
        className: "fader",
        emojiCount: 1,
        emojis: ["💤"],
        position: { x, y: head },
        physics: {
          fontSize: { max: 35 * i, min: 40 },
          gravity: -0.01,
          initialVelocities: {
            rotation: { max: 0, min: 0 },
            x: { max: 1, min: -1 },
            y: { max: -4, min: -1 },
          },
        },
      });
    }, i * 250);
  }
};
