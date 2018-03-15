

var exercises = (function() {
    var deleteLifting = function(liftingId) {
       axios({
           method: "DELETE",
           url: "/lifting/exercise",
           data: {
               id: liftingId
           }
       });

    };

    return {
        deleteLifting: deleteLifting
    };
})();