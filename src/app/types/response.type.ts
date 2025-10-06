type Success<T> = {
	success: true;
	data: T;
    error?: never;
}

type Failure = {
    success: false;
    data?: never;
    error: string;
}

export type Response<T> = Success<T> | Failure;