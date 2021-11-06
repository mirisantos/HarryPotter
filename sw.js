// Generate App Shell

let cacheName = 'cache-v1';

let files_appShell = [
    "/",
    "index.html",
    "main.js",
    "not-found.html",
    "style.css"
];


self.addEventListener('install', result => {
    //Abrir el cache con base al nombre y sino existe lo crea

    result.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(files_appShell);
        })
        //.catch()
    );

})



self.addEventListener('fetch', event => {
    /* 
    1.- Cache Only

    event.respondWith(
        caches.match(event.request)
    )
    */


    /*
    2.- Network Only
    La aplicacion solamente hara peticiones a internet

    event.respondWith(
        // Deezer
        fetch(event.request)
    )

    */

    // 3. Cache First
    // La pagina web, primero antes que nada, va a revisar si los recurso
    //estan dentro del cache, en caso contrario, los va a pedir en la red

    // IF,   promise  (then, catch)

    /* if (caches.match(event.request)) {
        event.respondWith(caches.match(event.request))
    } else {
        event.respondWith(fetch(event.request))
    } */


    /* event.respondWith(caches.match(event.request).then(
        cacheResponse => {
            return cacheResponse || fetch(event.request)
        }
    )) */

    // 4. Network First: Obtener los datos más actualizados desde la red
    // cuando no podemos almacenar cierta info en cache

    /* 
    v1
    event.respondWith(
        fetch(event.request).then(
        networkResponse => {
            return networkResponse || caches.match(event.request).catch(error => {
                // Error de que no se encuentra en el cache
            })
        }
    ).catch(error => {
        // Error de que no se encuentra en la red
    })) */

    //v2
    // event.respondWith(fetch(event.request).catch(error => caches.match(event.request)))

    // 5. Primero el cache, sino esta busca en la red y 
    // si se encuentra lo guarda en cache
    
    /* event.respondWith(caches.match(event.request).then(
        cacheResponse => {
            return cacheResponse || fetch(event.request).then(
                networkResponse => {

                    //limpiarCache()
                    caches.open(cacheName).then(function (cache){
                        cache.put(event.request, networkResponse);

                    })
                    return networkResponse.clone()
                }
            )
        }
    )) */

    event.respondWith(caches.match(event.request).then(
        cacheResponse => {
            //Si estuvo en cache, lo va a regresar
            if(cacheResponse) return cacheResponse;
            //Sino estuvo en cache, lo va a buscar a la red
            return fetch(event.request).then(
                networkResponse => {
                    caches.open(cacheName).then(cache => {
                        cache.put(event.request, networkResponse)
                        // Tarea: Funcion de limpiar el cache
                    })
                }
            ).catch(err => {
                //Aqui se maneja el error
                console.log('no se encontro');
            })
        }
    ))
    
})

function limpiarCache() {

    // Identificar al cache - keys
    // Borrarlo - delete
    //Actualizarlo
    
}



