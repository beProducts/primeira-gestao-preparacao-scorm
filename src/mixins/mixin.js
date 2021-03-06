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
        const productStoragerKey = `product-${productId}-storage-checked-list-preparacao`;

        // Get check list
        let appChecks = localStorage.getItem(productStoragerKey) || '[]';

        // Cast
        appChecks = JSON.parse(appChecks);

        // Add new stage
        appChecks.push( objectId );

        // Remove duplicate values
        appChecks = Array.from(new Set(appChecks));

        // Store data
        localStorage.setItem(productStoragerKey, JSON.stringify(appChecks));

        // SCORM completed
        if (appChecks.length >= process.env.VUE_APP_QUANTITY_OF_SESSION) {
          try{
            window.scormAPI.LMSInitialize('');
            window.scormAPI.LMSSetValue("cmi.core.lesson_status", "completed");
            window.scormAPI.LMSCommit('');
          }catch(error){ console.log("not in lms") }
        }

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

        const productId = process.env.VUE_APP_PRODUCT_ID;
        const productStoragerKey = `product-${productId}-storage-checked-list-preparacao`;

        // Get check list
        let appChecks = localStorage.getItem(productStoragerKey) || '[]';

        // Cast
        appChecks = JSON.parse(appChecks);
        
        return new Promise((resolve) => {

          const userChecks = {
            status: true,
            message: "User checks list",
            userChecks: appChecks.map( objectId => { return {objectId} })
          }

          resolve(userChecks)
        })
        .then(data => data)
        .catch((error) => { throw error; });
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
    setTimeScorm( totalTimeMiliseconds ){
 
      const totalTimeStorage = localStorage.getItem("total-time") || 0;
 
      localStorage.setItem("total-time", totalTimeMiliseconds + parseInt(totalTimeStorage) );
 
      const millisecondsToCMIDuration = ( milliseconds ) => {
        let cmiTime = "";
        let time = new Date(); 
        time.setTime( milliseconds );
        let hours = "0" + Math.floor( milliseconds / 3600000 );
        let minutes = "0" + time.getMinutes();
        let seconds = "0" + time.getSeconds();
        cmiTime = hours.substr( hours.length - 2 ) + ":" + minutes.substr( minutes.length - 2 ) + ":" + seconds.substr( seconds.length - 2 );
        return cmiTime;
      }
 
      try{
        window.scormAPI.LMSInitialize('');
        window.scormAPI.LMSSetValue("cmi.core.session_time", millisecondsToCMIDuration( localStorage.getItem("total-time") ) );
        window.scormAPI.LMSCommit('');
      }catch(error){ console.log("not in lms") }
 
    }
  },
};

window.addEventListener( 'unload', () => { localStorage.removeItem("total-time"); })

export default mixin;
