

// ------------------------Opcion para resetear Página------------------------------


window.addEventListener( "pageshow", function ( event ) {
    console.log('HEY, reinicio')
    var historyTraversal = event.persisted ||
                           ( typeof window.performance != "undefined" &&
                                window.performance.navigation.type === 2 );
    if ( historyTraversal ) {
      // Handle page restore.
      window.location.reload();
    }
  }); 