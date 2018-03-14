var exercises = (function() {
    const https = require('http');

    var deleteLifting = function(liftingId) {
       https.request({
           method: "DELETE",
           url: "/lifting/exercise?id=" + liftingId
       });

    };

    return {
        deleteLifting: deleteLifting
    };
})();