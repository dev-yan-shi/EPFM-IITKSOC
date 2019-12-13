var tabButtons = document.querySelectorAll(".tabs-centered .tab");
var tabPanels = document.querySelectorAll(".tab-panels .center-area");

function showPanel(panelIndex) {
    tabPanels.forEach(function(node){
        node.style.display="none";
    });
    tabPanels[panelIndex].style.display="";
}
showPanel(0);