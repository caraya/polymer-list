/**
 * Copyright 2014 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

importScripts('lib/serviceworker-cache-polyfill.js');

var CACHE_NAME = 'chrome-dev-summit';
var CACHE_VERSION = 39;

self.oninstall = function(event) {

  event.waitUntil(
    caches.open(CACHE_NAME + '-v' + CACHE_VERSION).then(function(cache) {

      return cache.addAll([

      "bower_components/font-roboto/roboto.html",
      "bower_components/core-drawer-panel/core-drawer-panel.html",
      "bower_components/core-header-panel/core-header-panel.html",
      "bower_components/core-toolbar/core-toolbar.html",
      "bower_components/core-icons/core-icons.html",
      "bower_components/core-icons/social-icons.html",
      "bower_components/core-icons/editor-icons.html",
      "bower_components/core-menu/core-menu.html",
      "bower_components/core-item/core-item.html",
      "bower_components/core-overlay/core-overlay.html",
      "bower_components/paper-input/paper-input.html",
      "bower_components/paper-button/paper-button.html",
      "css/app.css",
      "elements.html",
      "project-app.html",
      "project-form.html",
      "project-list.html",
      "project-manu.html",
      "projects.json",
      "wc-project-list-json"

      ]);
    })
  );
};

self.onactivate = function(event) {

  var currentCacheName = CACHE_NAME + '-v' + CACHE_VERSION;
  caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        if (cacheName.indexOf(CACHE_NAME) == -1) {
          return;
        }

        if (cacheName != currentCacheName) {
          return caches.delete(cacheName);
        }
      })
    );
  });

};

self.onfetch = function(event) {

  function isTheConference() {
    var today = new Date();
    var correctDate = (today.getDate() === 19 || today.getDate() === 20);
    var correctMonth = (today.getMonth() === 10);
    var correctYear = (today.getFullYear() === 2014);

    return correctYear && correctMonth && correctDate;
  }

  var request = event.request;
  var requestURL = new URL(event.request.url);
  var userIsRequestingIndexPage = (requestURL.pathname === '/devsummit/');

  event.respondWith(

    // Check the cache for a hit.
    caches.match(request).then(function(response) {

      // If we have a response return it.
      if (response)
        return response;

      // Otherwise fetch it, store and respond.
      return fetch(request).then(function(response) {

        var responseToCache = response.clone();

        caches.open(CACHE_NAME + '-v' + CACHE_VERSION).then(
          function(cache) {
            cache.put(request, responseToCache).catch(function(err) {
              // Likely we got an opaque response which the polyfill
              // can't deal with, so log out a warning.
              console.warn(requestURL + ': ' + err.message);
            });
          });

        return response;
      });

    })
  );
};