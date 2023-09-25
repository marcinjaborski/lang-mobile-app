import { Term, UNDERSTANDING } from "@src/types";

export const getAvatarColor = (string: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const toCountryCode = (code: string): string => {
  return code === "en" ? "gb" : code;
};

export const getProgress = (terms: Term[] = []): number => {
  if (!terms.length) return 0;
  const cumulativeUnderstanding = terms.reduce((acc, curr) => acc + curr.understanding, 0);
  const totalUnderstanding = terms.length * UNDERSTANDING.FINAL;
  return cumulativeUnderstanding / totalUnderstanding;
};

export const calculateScore = (time: number, correct: number) => {
  return Math.round(100 * Math.pow(Math.E, -0.01 * time) * correct);
};
