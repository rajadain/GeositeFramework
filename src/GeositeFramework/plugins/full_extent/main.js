﻿// "measure" plugin, main module


// Plugins should load their own versions of any libraries used even if those libraries are also used 
// by the GeositeFramework, in case a future framework version uses a different library version. 

require({
    // Specify library locations.
    packages: [
        {
            name: "jquery",
            location: "//ajax.googleapis.com/ajax/libs/jquery/1.9.0",
            main: "jquery.min"
        },
        {
            name: "underscore",
            location: "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3",
            main: "underscore-min"
        }
    ]
});

define(
    [
    "dojo/_base/declare",
    "framework/PluginBase",
    "esri/geometry/Extent",
    "esri/SpatialReference"],

    function (declare, PluginBase, Extent, SpatialReference) {
        var _extent;
        
        function fullExtent (regionConfig)
        {
            var x = regionConfig.initialExtent,
                extent = new Extent(
                    x[0], x[1], x[2], x[3],
                    new SpatialReference({ wkid: 4326 /*lat-long*/ })
                );
            return extent;   
        }
        
        return declare(PluginBase, {
            toolbarName: "FullExtent",
            fullName: "Zoom out to the default map extent",
            toolbarType: "map",
            allowIdentifyWhenActive: true,
            closeOthersWhenActive: false,
            
            initialize: function (args) {
                declare.safeMixin(this, args);
                _extent = fullExtent(this.app.regionConfig);
            },
            
            renderLauncher: function renderLauncher() {
                return $('<div class="full-extent"></div>');
            },

            activate: function () {
                var self = this;
                self.map.setExtent(_extent);
            }
        });
    }
);