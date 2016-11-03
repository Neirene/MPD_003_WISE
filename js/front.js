(function(){ 

    console.log("INIT!");

    //DISABLE AJAX CACHING /////////////////////
    $.ajaxSetup({
        // Disable caching of AJAX responses
        cache: false
    });
    ////////////////////////////////////////////

    window.onresize = emergentBoxSet;
    function emergentBoxSet() {
        if ($(window).width() <= 765) {
            $(".emergent-panel").addClass("autoAdjust");
            $(".container-map").addClass("hide");
        } else {
            $(".emergent-panel").removeClass("autoAdjust");
            $(".container-map").removeClass("hide");
        }

    }

    $(document).on("click",".emergentItem", function () {
        
        var indexEmergent = $(this).index();

        if ($(this).hasClass("emergentItem") == true) {
            $(".emergentItem").removeClass("active");
            $(this).addClass("active");

            $(".emergent-content").removeClass("show");
            $(".emergent-content").removeClass("hide");
        }

            switch (indexEmergent) {
                case 0:
                    $("#machineStatus").addClass("show");
                    $("#machineReports").addClass("hide");
                    $("#machineGraph").addClass("hide");
                break;

                case 1:
                    $("#machineStatus").addClass("hide");
                    $("#machineReports").addClass("show");
                    $("#machineGraph").addClass("hide");

                break;

                case 2:
                    $("#machineStatus").addClass("hide");
                    $("#machineReports").addClass("hide");
                    $("#machineGraph").addClass("show");

                break;
            }
    });

    //MODALS

    var currentDataRow;
    $(document).on("click", "tr#valueRow", function (e) {

        if (e.currentTarget != this) {//HERE
            $("tr#valueRow").removeClass("info");
        }

        $("tr#valueRow").removeClass("info");
        $(this).addClass("info");

        currentDataRow = "The current ID is: " + $(this).index();
        console.log(currentDataRow);

        openModal(11,currentDataRow,2)

    })

    function openModal(id, contents, modalType) {

        $(".general-modal").find(".modal-header").removeClass("hide");
        $(".general-modal").find(".modal-footer").removeClass("hide");
        $(".general-modal").find(".modal-title").text("")
        $(".general-modal").find(".modal-body").html("");


        //MODAL TYPES(INTEGER):
        //1 : Remove Titlebar
        //2 : Show Titlebar
        //3 : Blank Modal

        if (modalType == 1) {
            //with title
            $(".general-modal").find(".modal-header").removeClass("hide");
        }

        if (modalType == 2) {
            //without title
            $(".general-modal").find(".modal-header").addClass("hide");
        }

        if (modalType == 3) {
            //blank modal
            $(".general-modal").find(".modal-header").addClass("hide");
            $(".general-modal").find(".modal-footer").addClass("hide");
        }

        //modify modal contents

        $(".general-modal").find(".modal-title").text(id)

        //load dynamic stuff into the modal body
        $(".modal-body").load("ajaxTests.html #parkingData");

        $(".general-modal").modal("show");  //fire modal

    }


    //POPOVERS
    var popParentSelector;
    var popOverContent;
    $(document).on("mouseover", ".stackedBar", function () {

        popParentSelector = ".stackedBar";
        popOverContent = $(this).attr("data-content");
        
        $(".stackedBar").removeClass("progress-bar-striped");
        $(".stackedBar").removeClass("active");
        $(this).addClass("progress-bar-striped");
        $(this).addClass("active");

        globalPopovers(popParentSelector,popOverContent);

    });

    $(document).on("mouseout", ".stackedBar", function () {

        $(this).removeClass("progress-bar-striped");
        $(this).removeClass("active");

    });


    function globalPopovers(selector,contents) {
        $(selector).popover({placement:'top',trigger:'hover'})
    }


    //custom scrolls
    customScroller();
    function customScroller() {
        $(".cityAreas").mCustomScrollbar({
            axis: "y", theme: "dark", autoHideScrollbar: true // horizontal scrollbar
        });

    }


    //mess


    $(document).on("click", ".cityArea", function (e) {

        $(".cityArea").removeClass("active");
        $(this).addClass("active");
    })

    $("#refreshCity").on("click", function () {
        drawZoneContainers(5)
        $(".cityZones").html("");
    });

    var zoneCounter = 0;
    var zoneAmount = 0;

    function drawZoneContainers(elementCount) {

        zoneAmount = elementCount;
        customLoop();

    }


    function customLoop() {

        $(".cityZones").append('<li class="cityArea hiddenElement"><a href="#">&nbsp;</a></li>');

        setTimeout(function () {
             
            $('.cityArea').each(function (zoneCounter) { $(this).removeClass('hiddenElement'); })
            zoneCounter++;

            if (zoneCounter <= zoneAmount) {
                customLoop();
            } else {
                zoneCounter = 0;
                drawZoneLabels();
            }

        }, 100);


    }

    function drawZoneLabels() {

        $(".cityArea").each(function (zoneAmount) {
            $(this).html("");
            $(this).append('<a href="#" class="infoHide" style="display:none"><span class="badge pull-right infoHide" style="display:none">00</span>Area HOLA</a>');

        });
        $('.infoHide').fadeIn();

    }
    //mess

    // Provide your access token
    L.mapbox.accessToken = 'pk.eyJ1IjoibmVpcmVuZSIsImEiOiJYV1ljbkVvIn0.PxAyXglhU0CRFeQgW3agAg';
    // Create a map in the div #map
    L.mapbox.map('mapArea', 'neirene.jil6mone').setView([40.426, -3.682], 14);;


})();

