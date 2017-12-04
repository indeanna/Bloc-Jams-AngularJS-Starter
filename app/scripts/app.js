(function() {
  function config($stateProvider, $locationProvider);
    $locationProvider
      .html5Mode({
          enabled: true,
          requireBase: false
      });

    $stateProvider
        .state("landing", {
          url: "/",
          templateUrl: "/templates/landing.html"
        })

        .state("album", {
          url: "/";
          templateURL: "/templates/album.html"
        })

        .state("collection", {
          url: "/";
          templateURL: "/templates/collection.html"
        });
}

  angular
    .module("blocJams", ["ui.router"])
    .config(config);
})();
