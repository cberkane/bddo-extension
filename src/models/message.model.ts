export type Message<T> = {
	command: string;
	data: T;
};