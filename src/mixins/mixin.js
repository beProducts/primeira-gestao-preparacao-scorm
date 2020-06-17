const mixin = {
  methods: {
    goToRoute(route) {
      this.$router.push({ path: route });
    },
    logoff() {
      if( process.env.VUE_APP_SCORM_MODE !== 'ON' ){
        // Redirect
        this.goToRoute('/');

        // Get keys
        const productId = process.env.VUE_APP_PRODUCT_ID;
        const productUserKey = `product-${productId}-user`;
        const productTokenKey = `product-${productId}-token`;

        // Clear storage
        localStorage.removeItem(productUserKey);
        localStorage.removeItem(productTokenKey);
      }
    },
    saveVisit(objectId) {
      if( process.env.VUE_APP_SCORM_MODE !== 'ON' ){
        // Env variables
        const api = process.env.VUE_APP_BACKEND_ENDPOINT;
        const productId = process.env.VUE_APP_PRODUCT_ID;
        const companyId = process.env.VUE_APP_COMPANY_ID;

        // Get keys
        const productUserKey = `product-${productId}-user`;
        const productTokenKey = `product-${productId}-token`;

        // Storage data
        const token = localStorage.getItem(productTokenKey);
        let userData = localStorage.getItem(productUserKey);
        userData = JSON.parse(userData);

        // Prepare request
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            login: userData.login,
            customerId: userData.customerId,
            productId,
            objectId,
            companyId
          })
        };

        fetch(`${api}/tracking/saveVisit`, requestOptions)
          .then(res => res.json())
          .then(data => {
            if (data.result === false) {
              // Clear the screen
              var myNode = document.body;
              while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
              }

              // Write error message
              document.write(data.errorMessage);
            }
            return;
          })
          .catch((error) => { throw error; });
      }
    },
    setChecked(objectId) {
      if( process.env.VUE_APP_SCORM_MODE !== 'ON' ){
        // Env variables
        const api = process.env.VUE_APP_BACKEND_ENDPOINT;
        const productId = process.env.VUE_APP_PRODUCT_ID;
        const companyId = process.env.VUE_APP_COMPANY_ID;

        // Get keys
        const productUserKey = `product-${productId}-user`;
        const productTokenKey = `product-${productId}-token`;

        // Storage data
        const token = localStorage.getItem(productTokenKey);
        let userData = localStorage.getItem(productUserKey);
        userData = JSON.parse(userData);

        // Prepare request
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            customerId: userData.customerId,
            companyId,
            productId,
            objectId
          })
        };

        return fetch(`${api}/tracking/setWatched`, requestOptions)
          .then(res => res.json())
          .then(data => data)
          .catch((error) => { throw error; });
      }else{

        const productId = process.env.VUE_APP_PRODUCT_ID;
        const productStoragerKey = `product-${productId}-storage-checked-list`;

        // Get check list
        let appChecks = localStorage.getItem(productStoragerKey) || '[]';

        // Cast
        appChecks = JSON.parse(appChecks);

        // Add new stage
        appChecks.push({ objectId });

        // Remove duplicate values
        appChecks = Array.from(new Set(appChecks));

        // Store data
        localStorage.setItem(productStoragerKey, JSON.stringify(appChecks));

      }
    },
    setUserExit(objectId, timeElapsed) {
      if( process.env.VUE_APP_SCORM_MODE !== 'ON' ){
        // Env variables
        const api = process.env.VUE_APP_BACKEND_ENDPOINT;
        const productId = process.env.VUE_APP_PRODUCT_ID;

        // Get keys
        const productUserKey = `product-${productId}-user`;
        const productTokenKey = `product-${productId}-token`;

        // Storage data
        const token = localStorage.getItem(productTokenKey);
        let userData = localStorage.getItem(productUserKey);
        userData = JSON.parse(userData);

        // Prepare request
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            customerId: userData.customerId,
            objectId,
            productId,
            timeElapsed
          })
        };

        return fetch(`${api}/tracking/setUserExit`, requestOptions)
          .then(res => res.json())
          .then(data => data)
          .catch((error) => { throw error; });
      }
    },
    setUserTimeElapsed(objectId, timeElapsed) {
      if( process.env.VUE_APP_SCORM_MODE !== 'ON' ){
        // Env variables
        const api = process.env.VUE_APP_BACKEND_ENDPOINT;
        const productId = process.env.VUE_APP_PRODUCT_ID;

        // Get keys
        const productUserKey = `product-${productId}-user`;
        const productTokenKey = `product-${productId}-token`;

        // Storage data
        const token = localStorage.getItem(productTokenKey);
        let userData = localStorage.getItem(productUserKey);
        userData = JSON.parse(userData);

        // Prepare request
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            customerId: userData.customerId,
            objectId,
            productId,
            timeElapsed
          })
        };

        return fetch(`${api}/tracking/setObjectTimeElapsed`, requestOptions)
          .then(res => res.json())
          .then(data => data)
          .catch((error) => { throw error; });
      }
    },
    getUserChecks() {
      if( process.env.VUE_APP_SCORM_MODE !== 'ON' ){
        // Env variables
        const api = process.env.VUE_APP_BACKEND_ENDPOINT;
        const productId = process.env.VUE_APP_PRODUCT_ID;
        const companyId = process.env.VUE_APP_COMPANY_ID;

        // Get keys
        const productUserKey = `product-${productId}-user`;
        const productTokenKey = `product-${productId}-token`;

        // Storage data
        const token = localStorage.getItem(productTokenKey);
        let userData = localStorage.getItem(productUserKey);
        userData = JSON.parse(userData);

        // Prepare request
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            customerId: userData.customerId,
            companyId,
            productId
          })
        };

        return fetch(`${api}/customers/objectChecks`, requestOptions)
          .then(res => res.json())
          .then(data => data)
          .catch((error) => { throw error; });
      }else{
        return new Promise((resolve)=>{
          const message = {
            status: true,
            message: "User check list",
            userChecks: [{objectId: 84}, {objectId: 85}, {objectId: 86}, {objectId: 87}, {objectId: 90},{objectId: 88}]
          }
          resolve(message)
        })
      }
    },
    getHelpBarText() {
      if( process.env.VUE_APP_SCORM_MODE !== 'ON' ){
        // Env variables
        const api = process.env.VUE_APP_BACKEND_ENDPOINT;
        const productId = process.env.VUE_APP_PRODUCT_ID;
        const companyId = process.env.VUE_APP_COMPANY_ID;

        // Get keys
        const productTokenKey = `product-${productId}-token`;

        // Storage data
        const token = localStorage.getItem(productTokenKey);

        // Prepare request
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            companyId,
            productId
          })
        };

        return fetch(`${api}/products/helpText`, requestOptions)
          .then(res => res.json())
          .then(data => data)
          .catch((error) => { throw error; });
      }
    },
    getCommentList(objectId) {
      if( process.env.VUE_APP_SCORM_MODE !== 'ON' ){
        // Env variables
        const api = process.env.VUE_APP_BACKEND_ENDPOINT;
        const productId = process.env.VUE_APP_PRODUCT_ID;
        const companyId = process.env.VUE_APP_COMPANY_ID;

        // Get keys
        const productUserKey = `product-${productId}-user`;
        const productTokenKey = `product-${productId}-token`;

        // Storage data
        const token = localStorage.getItem(productTokenKey);
        let userData = localStorage.getItem(productUserKey);
        userData = JSON.parse(userData);

        // Prepare request
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            customerId: userData.customerId,
            companyId,
            productId,
            objectId
          })
        };

        return fetch(`${api}/objects/comments`, requestOptions)
          .then(res => res.json())
          .then(data => data)
          .catch((error) => { throw error; });
      }
    },
    sendCommentForm(objectId, commentText) {
      if( process.env.VUE_APP_SCORM_MODE !== 'ON' ){
        // Env variables
        const api = process.env.VUE_APP_BACKEND_ENDPOINT;
        const productId = process.env.VUE_APP_PRODUCT_ID;
        const companyId = process.env.VUE_APP_COMPANY_ID;

        // Get keys
        const productUserKey = `product-${productId}-user`;
        const productTokenKey = `product-${productId}-token`;

        // Storage data
        const token = localStorage.getItem(productTokenKey);
        let userData = localStorage.getItem(productUserKey);
        userData = JSON.parse(userData);

        // Prepare request
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            customerId: userData.customerId,
            companyId,
            productId,
            objectId,
            commentText
          })
        };

        return fetch(`${api}/objects/postComment`, requestOptions)
          .then(res => res.json())
          .catch((error) => { throw error; });
      }
    },
    setPageChecked(stage) {
      
        if (window.scormAPI !== undefined) {
          // Get keys
          const productId = process.env.VUE_APP_PRODUCT_ID;
          const productStoragerKey = `product-${productId}-storage`;

          // Get check list
          let appChecks = localStorage.getItem(productStoragerKey) || '[]';

          // Cast
          appChecks = JSON.parse(appChecks);

          // Add new stage
          appChecks.push(stage);

          // Remove duplicate values
          appChecks = Array.from(new Set(appChecks));

          // SCORM completed
          if (appChecks.length === 14) {
            window.scormAPI.LMSInitialize('');
            window.scormAPI.LMSSetValue("cmi.core.lesson_status", "completed");
            window.scormAPI.LMSCommit('');
            console.log('COMPLETED');
          }

          // Store data
          localStorage.setItem(productStoragerKey, JSON.stringify(appChecks));
        }
    },
  },
};

export default mixin;
