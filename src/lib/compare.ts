export type CharStatus = 'correct' | 'incorrect';

export function compareChars(typed: string, target: string): CharStatus[] {
	return [...typed].map((char, i) => (char === target[i] ? 'correct' : 'incorrect'));
}

export function isExactMatch(typed: string, target: string): boolean {
	return typed === target;
}
