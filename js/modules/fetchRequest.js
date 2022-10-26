const URL = 'http://localhost:3000/api/';

const fetchRequest = async (
    postfix,
    {method, callback, body, headers},
) => {
  try {
    const option = {
      method,
    };

    if (body) option.body = JSON.stringify(body);
    if (headers) option.headers = headers;
    const response = await fetch(`${URL}${postfix}`, option);

    if (response.ok) {
      const data = await response.json();
      if (callback) return callback(null, data);
      return;
    }

    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    return callback(err);
  }
};

export default fetchRequest;
