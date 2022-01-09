export type Event = {
	once?: boolean;
	execute: (...args: any) => void | Promise<void>;
};
