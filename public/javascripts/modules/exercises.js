

var exercises = (function() {
    var deleteLifting = function(liftingId) {
       axios({
           method: "DELETE",
           url: "/lifting/exercise",
           data: {
               id: liftingId
           }
       })
       .then(function(response) {
            alert("test");
            location.reload();
       })
       .catch(function(error) {
           debugger;
            alert("failed");
       }); 
    };

    return {
        deleteLifting: deleteLifting
    };
})();