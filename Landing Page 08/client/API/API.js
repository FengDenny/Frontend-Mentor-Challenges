function API(baseURL) {
  this.baseURL = baseURL;
  this.endpoint = "";
  this.headers = { "Content-Type": "application/json" };
  this.data = null;
}

API.prototype.setEndpoint = function (endpoint) {
  this.endpoint = endpoint;
  return this;
};

API.prototype.setHeader = function (key, value) {
  this.headers[key] = value;
  return this;
};

API.prototype.setData = function (data) {
  this.data = data;
  return this;
};

API.prototype.get = async function () {
  try {
    const response = await fetch(`${this.baseURL}${this.endpoint}`, {
      method: "GET",
      headers: this.headers,
    });

    // Check if response is not OK
    if (!response.ok) {
      const errorText = await response.text();
      return {
        ok: false,
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      };
    }

    // Return JSON data if response is OK
    return { ok: true, data: await response.json() };
  } catch (error) {
    console.error("Error in GET request:", error);
    return { ok: false, error: error.message };
  }
};
API.prototype.post = async function () {
  try {
    const response = await fetch(`${this.baseURL}${this.endpoint}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(this.data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Response: ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};

export default API;
