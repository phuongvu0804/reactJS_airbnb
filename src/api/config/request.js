const SYSTEM_ERROR = 1;
const API_ERROR = 2;

class ApiError extends Error {
    constructor(error, type) {
        super();
        this.errors = error;
        this.type = type;
    }
}

const validateResponse = async (response) => {
    let responseOK = response && response.status === 200;

    if (!responseOK) {
        let error = {};
        let type = API_ERROR;

        switch (response.status) {
            case 400:
            case 403:
            case 404:
            case 420:
            case 422:
            case 500:
                type = API_ERROR;
                if (Array.isArray(response.message)) {
                    error = {
                        idErr: response.status,
                        message: response.message,
                    };
                }
                break;
            default:
                type = SYSTEM_ERROR;
                error = {
                    idErr: "SERVER_ERROR",
                    message: "SERVER_ERROR",
                };
                break;
        }

        if (error && type !== SYSTEM_ERROR) {
            throw new ApiError(error);
        } else {
            throw Error(error);
        }
    }

    return response.data;
};

const logError = (err) => {
    if (err instanceof ApiError) {
        alert(err);
    }
    return false;
};

const callApi = (api, onRequest, onError, onFinally) => {
    api.then(validateResponse)

        .then((data) => {
            onRequest && onRequest(data);
        })
        .catch((err) => {
            logError(err);
            onError && onError(err);
        })
        .finally(() => {
            onFinally && onFinally();
        });
};

export { callApi };
