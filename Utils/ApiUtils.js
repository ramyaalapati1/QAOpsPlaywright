class ApiUtils {

    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;

    }
    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        });
        const loginRespnseJson = await loginResponse.json();
        const token = loginRespnseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayload) {

        let response = {};
        response.token = await this.getToken();

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'authorization': response.token,
                    'content-type': 'application/json'

                },
            }
        );
        const orderResponseJson = await orderResponse.json();
        console.log("Order response is:", JSON.stringify(orderResponseJson, null, 2));
        const orderId = orderResponseJson.orders[0];
        console.log(`Order ID is : ${orderId}`)
        response.orderId = orderId;
        return response;

    }

}
module.exports = { ApiUtils };
//is a Node.js export statement.
// It tells Node.js what parts of your file should be made available to other files
// when they require() it.
