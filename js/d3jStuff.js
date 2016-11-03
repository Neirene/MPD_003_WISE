// D3J Stuff...
var db;
var dat;
var width;
var height;
var LIGHT;
var color;

function initGraph() {
    
    $(".dummyStill").text("");
    

    width = $(".dummyStill").outerWidth();
    height = $(".dummyStill").outerHeight();

    color = d3.scale.linear().domain([0, 80]).range(['hsla(195, 20%, 37%, 1)', 'hsla(195, 20%, 17%, 1)']);
       

    d3.json("js/indicatorsEX.json", function (error, data) {

        

        var treemap = d3.layout.treemap()
                          .children(function children(d, depth) { return d.children })
                          .sort(function comparator(a, b) { return b.value - a.value; })
                          .size([width, height])
                          .sticky(true)
                          .nodes(data)

        var div = d3.select(".dummyStill")
        var node = div.selectAll(".node")
            .data(treemap)
            .enter().append("div")
            .attr("class", "node")
            .style("position", "absolute")
            .style("transition", "all 0.3s ease")
            .style("color", "white")
            .style("left", function (d) { return d.x + "px"; })
            .style("top", function (d) { return d.y + "px"; })
            .style("width", function (d) { return d.dx + "px"; })
            .style("height", function (d) { return d.dy + "px"; })
            .style("background", function (d, i) { return d.children ? color(i) : null; })
            .style("cursor", "pointer")
            .style("border", "1px solid rgba(255,255,255,0.4)")
        

        //node.append("div")
        //    .attr("class","textTree")
        //    .text(function (d) { return d.name })
        //    .style("position", "absolute")
        //    .style("top", function (d) { return d.dy / 2 + "px" })
        //    .style("text-align", "center")
        //    .style("width", "100%")
        //    .style("white-space", "nowrap")
        //    .style("overflow", "hidden")
        //    .style("text-overflow", "ellipsis")
        //    .style("font-size", ".8em")
        //    .style("pointer-events","none")
        //    .style("opacity", function (i) {
        //        var colorPick;
        //        if ($(this).outerWidth() > 200) {
        //            colorPick = "1"
        //        } else {
        //            colorPick = "0"
        //        }
        //        return colorPick;
        //    })


        node.transition()
     .duration(0)
     .delay(function (d, i) { return i * 80; })
     .each(pulse);

        function pulse() {
            var rect = d3.select(this);
            (function loop() {
                rect = rect.transition()
                    .duration(750)
                    .style("background-color", color(Math.random() * 5 | 0))
                    .each("end", function () { if (this.__transition__.count < 2) loop(); });
            })();
        }

        //DYNAMIC EVENTS

        d3.selectAll('.node').on('click', function (d) {
           
            d3.selectAll('.node').style("background", function (d, i) { return d.children ? color(i) : null; })
            if (d3.select(d.currentTarget) ) {
                d3.selectAll('.node').style('color', 'white')
                d3.select(this).style('background-color', 'white')
                d3.select(this).style('color', 'grey')


                if (d3Switch == false) {
                    //null
                } else {
                    //extra
                    $(".legendBoxDefault").css("display", "none");
                    $(".legendOptionIcon").css("pointer-events", "none");
                    $(".legendClosedCaption").text("");
                    customLoop()
                }

             
            }




        })


        d3.selectAll('.node').on('mousemove', function (d, e) {
            d3.select(this).style('box-shadow', '3px 0px 30px #fff')
                           .style("z-index", 10000)
                            
                           
            

            d3.select(".graphCaptionBox")
            .transition()
            .duration(200)
            .style("opacity", .9)
            .style("z-index", 10000)
            .style("color", "Grey")


            tooltipInit(d); //box


            d3.select(".graphCaptionBox")
               .text(d.name + " " + d.value)


        });


        d3.selectAll('.node').on('mouseout', function (d) {
            d3.select(this).style('box-shadow', 'none')

          
            

            d3.select(".graphCaptionBox")
            .transition()
            .duration(400)
            .style("opacity", 0)

        });
        
    }); //closure d3json area...

}


function tooltipInit(coords) {

  

    $(".graphCaptionBox").css({ "top": event.pageY - $(".graphCaptionBox").outerHeight() - 10, "left": event.pageX - $(".graphCaptionBox").outerWidth() / 2 });

    if ($(".graphCaptionBox").offset().left < 0) {
        $(".graphCaptionBox").css("left", 10);
    }

    if ($(".graphCaptionBox").offset().left > $("body").outerWidth() / 1.2  ) {
        $(".graphCaptionBox").css("left", $("body").outerWidth() - $(".graphCaptionBox").outerWidth() - 10);
    }

    if ($(".graphCaptionBox").offset().top < 0) {
        $(".graphCaptionBox").css("top", 10);
    }

    if ($(".graphCaptionBox").offset().top > $("body").outerHeight()) {
        $(".graphCaptionBox").css("top", $("body").outerHeight() - $(".graphCaptionBox").outerHeight() - 10);
    }


}
