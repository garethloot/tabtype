import en from './en.json';
import nl from './nl.json';

export type Language = 'en' | 'nl';

export const SESSION_SIZE = 25;

const banks: Record<Language, string[]> = {
	en,
	nl
};

export function shuffle<T>(items: T[]): T[] {
	const arr = [...items];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

export function pickSessionWords(lang: Language, count = SESSION_SIZE): string[] {
	const bank = banks[lang];
	return shuffle(bank).slice(0, Math.min(count, bank.length));
}

export function isLanguage(value: string | null): value is Language {
	return value === 'en' || value === 'nl';
}
