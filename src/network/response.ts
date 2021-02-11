import { Response } from 'express'
type SuccessCodes = 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208;
type ErrorCodes = 400 | 401 | 402 | 403 | 404 | 500 | 501 | 502;

const statusResponses: any = {
	200: 'OK!',
	201: 'CREATED!',
	400: 'CLIENT ERROR!',
	404: 'NOT FOUND!',
	401: 'UNAUTHORIZED',
	500: 'INTERNAL SERVER ERROR'
}

interface HTTPResponse {
	message: string,
	data?: any
}

export const success = (response: Response, data: HTTPResponse, statusCode: SuccessCodes) => {
	response.status(statusCode).json({
		message: statusResponses[statusCode],
		data,
		status: statusCode
	})
}

export const error = (response: Response, msg: string, statusCode: ErrorCodes) => {
	response.status(statusCode).json({
		messageStatus: statusResponses[statusCode],
		msg,
		status: statusCode
	});
}
