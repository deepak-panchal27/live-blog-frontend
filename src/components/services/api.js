const BASE_URL = 'http://localhost:3001/api/v1';

const handleResponse = async (response) => {
  return response.json();
};

const get = async (url) => {
  const response = await fetch(`${BASE_URL}${url}`);
  return handleResponse(response);
};

const post = async (url, data) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

const put = async (url, data) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  };

const deleteRequest = async (url) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

export { get, post, put, deleteRequest };