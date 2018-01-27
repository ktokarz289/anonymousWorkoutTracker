var homepage = (function() {
    var closeSideBar = function() {
        document.getElementById("side-bar").style.display = "none";
    }

    var openSideBar = function() {
        document.getElementById("side-bar").style.display = "block";
    }

    return {
        closeSideBar: closeSideBar,
        openSideBar: openSideBar
    }
})();