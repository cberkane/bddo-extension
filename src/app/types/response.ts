type Success<T> = {
	data: T;
	success: true;
    error?: never;
}

type Failure = {
    data?: never;
    success: false;
    error: string;
}

export type Response<T> = Success<T> | Failure;