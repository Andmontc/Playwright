class Apiutils {

    constructor (apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken () {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data:this.loginPayload
        })
    
        // grab the token
        const loginJson = await loginResponse.json();
        let token = loginJson.token;
        return token;
    }

    async createOrder(createOrderPayload) {
        // Create - order API Token
        let response = {};
        response.token = await this.getToken();
        const createOrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data:createOrderPayload,
        headers: {
            'Authorization' : response.token,
            'Content-Type' : 'application/json'
            },
        })

        const createOrderJson = await createOrderResponse.json();
        let orderId = createOrderJson.orders[0];
        response.orderId = orderId;  
        return response;
    }
}

export default {Apiutils};