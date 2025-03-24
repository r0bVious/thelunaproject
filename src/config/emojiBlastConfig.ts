import { emojiBlast } from "emoji-blast";

// ------------------- "Emotions"
export const happyBlast = (element: HTMLDivElement) => {
  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const numSmileys = 15;
  const maxJumpHeight = 50;

  for (let i = 0; i < numSmileys; i++) {
    setTimeout(() => {
      const jumpHeight = Math.random() * maxJumpHeight + 10;
      emojiBlast({
        emojiCount: 1,
        emojis: ["😊"],
        position: { x, y },
        physics: {
          fontSize: { min: 50, max: 150 },
          gravity: 1,
          initialVelocities: {
            x: Math.random() * 100 - 50,
            y: -jumpHeight,
            rotation: 5,
          },
        },
      });
    }, i * 20);
  }
};

export const sadBlast = (element: HTMLDivElement) => {
  const rect = element.getBoundingClientRect();
  const leftEyeX = rect.left + rect.width * 0.1;
  const rightEyeX = rect.left + rect.width * 0.9;
  const eyeY = rect.top + rect.height * 0.75;

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
            fontSize: { max: 75, min: 35 },
            gravity: 1.2,
            initialVelocities: {
              rotation: { max: 0, min: 0 },
              x: { max: 2, min: -2 },
              y: { max: -5, min: -10 },
            },
          },
        });
      }, i * 300);
    }
  });
};

export const angryBlast = (element: HTMLDivElement) => {
  const rect = element.getBoundingClientRect();
  const head = rect.top - 75;

  for (let i = 0; i < 15; i++) {
    const x = rect.left + rect.width * (0.2 + Math.random() * 0.6);
    setTimeout(() => {
      emojiBlast({
        className: "fader",
        emojiCount: 1,
        emojis: ["🔥"],
        position: { x, y: head },
        physics: {
          fontSize: { max: 15 * i, min: 100 },
          gravity: -0.01,
          initialVelocities: {
            rotation: { max: 0, min: 0 },
            x: { max: 5, min: -5 },
            y: { max: -10, min: -10 },
          },
        },
      });
    }, i * 50);
  }
};

export const excitedBlast = (element: HTMLDivElement) => {
  const rect = element.getBoundingClientRect();
  const leftEyeX = rect.left + rect.width * 0.05;
  const rightEyeX = rect.left + rect.width * 0.95;
  const eyeY = rect.top + rect.height * 0.25;

  const starPositions = [
    { x: leftEyeX, y: eyeY },
    { x: rightEyeX, y: eyeY },
  ];

  starPositions.forEach(({ x, y }) => {
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        emojiBlast({
          className: "fader",
          emojiCount: 1,
          emojis: ["✨"],
          position: { x, y },
          physics: {
            fontSize: { max: 150, min: 25 },
            gravity: -1,
            initialVelocities: {
              rotation: { max: 10, min: -10 },
              x: { max: 5, min: -5 },
              y: { max: -5, min: -10 },
            },
          },
        });
      }, i * 200);
    }
  });
};

export const sillyBlast = (element: HTMLDivElement) => {
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

export const scaredBlast = (element: HTMLDivElement) => {
  const rect = element.getBoundingClientRect();
  const leftHeadX = rect.left;
  const rightHeadX = rect.right;
  const headY = rect.top - 80;

  const tearPositions = [leftHeadX, rightHeadX];

  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const positionX = tearPositions[i % 2];
      const direction = positionX === leftHeadX ? -1 : 1;
      emojiBlast({
        emojiCount: 1,
        emojis: ["💧"],
        position: { x: positionX, y: headY },
        physics: {
          fontSize: { max: 80, min: 30 },
          gravity: 1.2,
          initialVelocities: {
            rotation: { max: 0, min: 0 },
            x: { max: 10 * direction, min: 3 * direction },
            y: { max: -5, min: -10 },
          },
        },
      });
    }, i * 100);
  }
};

export const boredBlast = (element: HTMLDivElement) => {
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

export const nervousBlast = (element: HTMLDivElement) => {
  const rect = element.getBoundingClientRect();
  const head = rect.top - 120;

  for (let i = 0; i < 10; i++) {
    const x = rect.left + rect.width * (0.2 + Math.random() * 0.6);
    setTimeout(() => {
      emojiBlast({
        className: "fader",
        emojiCount: 1,
        emojis: ["❔", "❕"],
        position: { x, y: head },
        physics: {
          fontSize: { max: 20 * i, min: 80 },
          gravity: -0.05,
          initialVelocities: {
            rotation: { max: 0, min: 0 },
            x: { max: 2, min: -2 },
            y: { max: -5, min: -3 },
          },
        },
      });
    }, i * 200);
  }
};

export const tiredBlast = (element: HTMLDivElement) => {
  const rect = element.getBoundingClientRect();
  const head = rect.top;

  for (let i = 0; i < 5; i++) {
    const x = rect.left + rect.width * (0.2 + Math.random() * 0.6);
    setTimeout(() => {
      emojiBlast({
        className: "fader",
        emojiCount: 1,
        emojis: ["💤"],
        position: { x, y: head },
        physics: {
          fontSize: { max: 50 * i, min: 90 },
          gravity: -0.3,
          initialVelocities: {
            rotation: { max: 0, min: 0 },
            x: { max: 2, min: -2 },
            y: { max: -3, min: -1 },
          },
        },
      });
    }, i * 250);
  }
};
