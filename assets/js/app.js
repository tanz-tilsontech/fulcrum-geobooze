app = {

  init: function() {
    this.authenticateModule.checkAuth();
    this.bindUIActions();
    this.geojsonModule.fulcrumLayer();
    this.geojsonModule.fetchGeojson();
  },

  bindUIActions: function() {
    $("#login-btn").click(function() {
      app.authenticateModule.login();
    });

    $("#about-btn").click(function() {
      $("#collapsed-navbar").collapse("hide");
      $("#about-modal").modal("show");
    });

    $("#map-toggle-btn").click(function() {
      $("#collapsed-navbar").collapse("hide");
      if ($("#mapboxStreets").hasClass("active")) {
        app.map.addLayer(app.mapModule.layers.mapboxOSM);
        app.map.removeLayer(app.mapModule.layers.mapboxSat);
      } else {
        app.map.addLayer(app.mapModule.layers.mapboxOSM);
        app.map.removeLayer(app.mapModule.layers.mapboxSat);
      }
    });

    $("#login-modal").on("shown.bs.modal", function (e) {
      $(".modal-backdrop").css("opacity", "1");
    });

    $("#login-modal").on("hidden.bs.modal", function (e) {
      $(".modal-backdrop").css("opacity", "");
    });

    $("#form").submit(function(e) {
      if ($("#photo")[0].files.length > 0) {
        app.formModule.uploadPhoto();
      } else {
        app.formModule.submitRecord();
      }
      $("#loading-modal").modal("show");
      e.preventDefault();
    });
  },

  authenticateModule: {
    checkAuth: function() {
      if (!sessionStorage.getItem("fulcrum_app_token")) {
        $("#login-modal").modal("show");
      } else {
        $("#login-modal").modal("hide");
      }
    },

    login: function() {
      var username = $("#email").val();
      var password = $("#password").val();
      $.ajax({
        type: "GET",
        url: "https://api.fulcrumapp.com/api/v2/users.json",
        contentType: "application/json",
        dataType: "json",
        headers: {
          "Authorization": "Basic " + btoa(username + ":" + password)
        },
        statusCode: {
          401: function() {
            alert("Incorrect credentials, please try again.");
          }
        },
        success: function (data) {
          $.each(data.user.contexts, function(index, context) {
            if (context.name == "Tilson SLC") {
              sessionStorage.setItem("fulcrum_app_token", btoa(context.api_token));
              sessionStorage.setItem("fulcrum_userfullname", data.user.first_name + " " + data.user.last_name);
            }
          });
          if (!sessionStorage.getItem("fulcrum_app_token")) {
            alert("This login does not have access to the Tilson DataMap.");
          }
          app.authenticateModule.checkAuth();
        }
      });
    }
  },

  featureConfig: {
    config: {
      geojson: "https://web.fulcrumapp.com/shares/fb96b48deb5cfb94.geojson",
      title: "SLC OneFiber (FiberTel)",
      layerName: "Routes",
      hoverProperty: "status_title_github",
      sortProperty: "fqnid",
      sortOrder: "ascend",
    },

    properties: [{
      value: "status_title",
      label: "Status",
      table: {
        visible: true,
        sortable: true
      },
      filter: {
        type: "string",
        input: "checkbox",
        vertical: true,
        multiple: true,
        operators: ["in", "not_in", "equal", "not_equal"],
        values: []
      }
    },
    {
      value: "hub",
      label: "Hub",
      table: {
        visible: true,
        sortable: true
      },
      filter: {
        type: "string",
        input: "checkbox",
        vertical: true,
        multiple: true,
        operators: ["in", "not_in", "equal", "not_equal"],
        values: []
      }
    },
    {
      value: "site",
      label: "Site",
      table: {
        visible: true,
        sortable: true
      },
      filter: {
        type: "string",
        input: "checkbox",
        vertical: true,
        multiple: true,
        operators: ["in", "not_in", "equal", "not_equal"],
        values: []
      }
    },
    {
      value: "wpid",
      label: "WPID",
      table: {
        visible: true,
        sortable: true
      },
      filter: {
        type: "string",
        input: "checkbox",
        vertical: true,
        multiple: true,
        operators: ["in", "not_in", "equal", "not_equal"],
        values: []
      }
    },
    {
      value: "fqnid",
      label: "ROUTE FQNID",
      table: {
        visible: true,
        sortable: true
      },
      filter: {
        type: "string",
        input: "checkbox",
        vertical: true,
        multiple: true,
        operators: ["in", "not_in", "equal", "not_equal"],
        values: []
      }
    },
    {
      value: "fiber_fqnid_1",
      label: "FIBER FQNID",
      table: {
        visible: true,
        sortable: true
      },
      filter: {
        type: "string",
        input: "checkbox",
        vertical: true,
        multiple: true,
        operators: ["in", "not_in", "equal", "not_equal"],
        values: []
      }
    },
    {
      value: "ntp_date",
      label: "Proposed Start Date",
      table: {
        visible: true,
        sortable: true
      },
      filter: {
        type: "date"
      }
    },
    {
      value: "proposed_type",
      label: "Proposed Type",
      table: {
        visible: true,
        sortable: true
      },
      filter: {
        type: "string"
      }
    },
    {
      value: "proposed_product",
      label: "Proposed Product",
      table: {
        visible: true,
        sortable: true
      },
      filter: {
        type: "string"
      }
    },
    {
      value: "proposed_footage",
      label: "Proposed Footage",
      table: {
        visible: true,
        sortable: true
      },
      filter: {
        type: "integer",
      }
    },
    {
      value: "construction_start_date_cx_final",
      label: "Construction Start Date",
      table: {
        visible: true,
        sortable: true
      },
      filter: {
        type: "date"
      }
    },
    {
      value: "construction_complete_date_cx_final",
      label: "Construction Complete Date",
      table: {
        visible: true,
        sortable: true
      },
      filter: {
        type: "date"
      }
    },
    {
      value: "construction_pass_date_qc_final",
      label: "Construction QC Pass Date",
      table: {
        visible: true,
        sortable: true
      },
      filter: {
        type: "date"
      }
    },
    {
      value: "construction_footage_cx_final",
      label: "Construction Total Footage",
      table: {
        visible: true,
        sortable: true
      },
      filter: {
        type: "integer",
      }
    },
    {
      value: "cable_placement_start_date_cx_final",
      label: "Cable Placement Start Date",
      table: {
        visible: true,
        sortable: true
      },
      filter: {
        type: "date"
      }
    },
    {
      value: "cable_placement_complete_date_cx_final",
      label: "Cable Placement Complete Date",
      table: {
        visible: true,
        sortable: true
      },
      filter: {
        type: "date"
      }
    },
    {
      value: "cable_placement_pass_date_qc_final",
      label: "Cable Placement QC Pass Date",
      table: {
        visible: true,
        sortable: true
      },
      filter: {
        type: "date"
      }
    },
    {
      value: "cable_placement_total_footage_cx_final",
      label: "Cable Placement Total Footage",
      table: {
        visible: true,
        sortable: true
      },
      filter: {
        type: "integer"
      }
    },
    {
      value: "fulcrum_id",
      label: "Record ID",
      table: {
        visible: false,
        sortable: false
      },
      info: false
    },
    {
      value: "contractor",
      label: "Contractor",
      table: {
        visible: false,
        sortable: false
      },
      info: false
    }]
  },

  geojsonModule: {
    fulcrumLayer: function() {
      if (app.authenticateModule.login.userEmail.includes("fibertel")) {
        
        featureLayer: L.fetchGeojson.geoJson(null, {
          filter: function(feature, layer) {
            if (feature.properties.contractor === "FiberTel") return true;
          },
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
              title: feature.properties["status_title_github"],
              riseOnHover: true,
              icon: L.icon({
                iconUrl: "assets/pictures/markers/cb0d0c.png",
                iconSize: [30, 40],
                iconAnchor: [15, 32]
              })
            });
          },
          onEachFeature: function (feature, layer) {
            if (feature.properties) {
              layer.on({
                click: function (e) {
                  identifyFeature(L.stamp(layer));
                  highlightLayer.clearLayers();
                  highlightLayer.addData(featureLayer.getLayer(L.stamp(layer)).toGeoJSON());
                },
                mouseover: function (e) {
                  if (config.hoverProperty) {
                    $(".info-control").html(feature.properties[config.hoverProperty]);
                    $(".info-control").show();
                  }
                },
                mouseout: function (e) {
                  $(".info-control").hide();
                }
              });
              if (feature.properties["marker-color"]) {
                layer.setIcon(
                  L.icon({
                    iconUrl: "assets/pictures/markers/" + feature.properties["marker-color"].replace("#",'').toLowerCase() + ".png",
                    iconSize: [30, 40],
                    iconAnchor: [15, 32]
                  })
                );
              }
            }
          }
        });
      } else if (app.authenticateModule.login.userEmail.includes("tilson") || app.authenticateModule.login.userEmail.includes("verizon")) {
        var featureLayer = L.geoJson(null, {
          filter: function(feature, layer) {
            if (feature.properties.contractor != "") return true;
          },
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
              title: feature.properties["status_title_github"],
              riseOnHover: true,
              icon: L.icon({
                iconUrl: "assets/pictures/markers/cb0d0c.png",
                iconSize: [30, 40],
                iconAnchor: [15, 32]
              })
            });
          },
          onEachFeature: function (feature, layer) {
            if (feature.properties) {
              layer.on({
                click: function (e) {
                  identifyFeature(L.stamp(layer));
                  highlightLayer.clearLayers();
                  highlightLayer.addData(featureLayer.getLayer(L.stamp(layer)).toGeoJSON());
                },
                mouseover: function (e) {
                  if (config.hoverProperty) {
                    $(".info-control").html(feature.properties[config.hoverProperty]);
                    $(".info-control").show();
                  }
                },
                mouseout: function (e) {
                  $(".info-control").hide();
                }
              });
              if (feature.properties["marker-color"]) {
                layer.setIcon(
                  L.icon({
                    iconUrl: "assets/pictures/markers/" + feature.properties["marker-color"].replace("#",'').toLowerCase() + ".png",
                    iconSize: [30, 40],
                    iconAnchor: [15, 32]
                  })
                );
              }
            }
          }
        });
      };
    },


    fetchGeojson: function() {
      $.getJSON(featureConfig.config.geojson, function (data) {
        geojson = data
        features = $.map(geojson.features, function(feature) {
          return feature.properties;
        });
        featureLayer.addData(data);
        buildConfig();
        $("#loading-mask").hide();
        var style = {
          "property": "status",
          "values": {
            "Segment Ready": "https://image.ibb.co/iXHCyH/1891c9.png",
            "Segment Not Ready": "https://image.ibb.co/hk21sc/242424.png",
            "Construction Started": "https://image.ibb.co/mC5Akx/ffd300.png",
            "Constractor CX QC": "https://image.ibb.co/hHRSXc/b3b3b3.png",
            "Tilson CX QC": "https://image.ibb.co/c3TVkx/ff8819.png",
            "Construction Fix": "https://image.ibb.co/cen1sc/cb0d0c.png",
            "Cable Placement Ready": "https://image.ibb.co/iXHCyH/1891c9.png",
            "Cable Placement Started": "https://image.ibb.co/mC5Akx/ffd300.png",
            "Contractor CP QC": "https://image.ibb.co/hHRSXc/b3b3b3.png",
            "Tilson CP QC": "https://image.ibb.co/c3TVkx/ff8819.png",
            "Cable Placement Fix": "https://image.ibb.co/cen1sc/cb0d0c.png",
            "Splicing/Testing Pending": "https://image.ibb.co/hxOkJH/87d30f.png"
          }
        }
        JSON.stringify(style);
        if (style.property && style.values) {
          $("#legend-item").removeClass("hidden");
          $("#legend-title").html(style.property.toUpperCase().replace(/_/g, " "));
          $.each(style.values, function(property, value) {
            if (value.startsWith("http")) {
              $("#legend").append("<p><img src='" + value + "'></i> " + property + "</p>");
            } else {
              $("#legend").append("<p><i style='background:" + value + "'></i> " + property + "</p>");
            }
          });
        }
      });
    }
  },

  mapModule: {
    layers: {
      mapboxOSM: L.tileLayer('http://{s}.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZWNvdHJ1c3QiLCJhIjoibGo4TG5nOCJ9.QJnT2dgjL4_4EA7WlK8Zkw', {
        maxZoom: 20
      }),

      mapboxSat: L.tileLayer('https://api.mapbox.com/v4/cfritz1387.573ca1ee/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2ZyaXR6MTM4NyIsImEiOiJjaWphZTZ0eHkwMDVwdWlseGx5aWhhbXlwIn0._lgb3vbGMSx1-jdZCufdgg', {
        maxZoom: 20
      }),

      SLCLLDRoute: L.tileLayer('http://ttm-tileify-proxy1.herokuapp.com/tiles/{z}/{x}/{y}?url=https%3A%2F%2Ftilsonwebdraco.3-gislive.com%2Farcgis%2Frest%2Fservices%2FSLClld%2FTilsonslc_lld%2FMapServer&transparent=true&layers=show%3A3%2C10%2C31%2C44%2C47%2C49', {
        maxZoom: 20
      })
    },

    controls: {
      locateCtrl: L.control.locate({
        position: "topright",
        setView: "untilPan",
        keepCurrentZoomLevel: false,
        clickBehavior: {
          inView: "stop",
          outOfView: "setView"
        },
        drawCircle: true,
        drawMarker: true,
        showPopup: false,
        markerStyle: {
          weight: 1,
          opacity: 0.8,
          fillOpacity: 0.8
        },
        circleStyle: {
          weight: 1,
          clickable: false
        },
        locateOptions: {
          maxZoom: 18,
          watch: true,
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 10000
        }
      }),

      fullscreenControl: L.control.fullscreen({
        position: "topright"
      })
    },

    configMap: function() {
      app.map = L.map("map", {
        layers: [this.layers.mapboxOSM, this.layers.mapboxSat, this.layers.SLCLLDRoute, app.geojsonModule.featureLayer],
        zoomControl: false
      }).fitWorld();

      app.map.attributionControl.setPrefix("");

      app.map.on("fullscreenchange", function(e) {
        if (app.map.isFullscreen()) {
          $(".crosshair").css("z-index", 9999999999);
        } else {
          $(".crosshair").css("z-index", "");
        }
    	});

      app.map.on("moveend", function(e) {
        $("#latitude").val(app.map.getCenter().lat.toFixed(6));
        $("#longitude").val(app.map.getCenter().lng.toFixed(6));
    	});

      this.controls.locateCtrl.addTo(app.map).start();

      this.controls.fullscreenControl.addTo(app.map);
    }
  }
};

$(document).ready(function() {
  app.init();
});
