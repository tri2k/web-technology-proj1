var elementsMenu = document.querySelector(".selectorElements");

const elementsMenuOption = document.createElement("option");
const elementsMenuText = document.createTextNode("Choose an element");
elementsMenuOption.append(elementsMenuText);

elementsMenu.append(elementsMenuOption);

addToElementMenu(document.querySelectorAll('body'));
addToElementMenu(document.querySelectorAll('header'));
addToElementMenu(document.querySelectorAll('article'));
addToElementMenu(document.querySelectorAll('section'));
addToElementMenu(document.querySelectorAll('aside'));
addToElementMenu(document.querySelectorAll('footer'));

function addToElementMenu(nodeList) {
    for (let i = 0; i < nodeList.length; i++) {
        let item = nodeList[i];
        const menuOption = document.createElement("option");
        const menuText = document.createTextNode(item.tagName[0] + item.tagName.substring(1).toLowerCase() + ` ${i + 1}`);
    
        menuOption.append(menuText);
    
        elementsMenu.append(menuOption);
    }
}

var customizerMenu = document.querySelector(".selectorCustomize");

addToCustomizerMenu("option", "Choose a customization");
addToCustomizerMenu("optgroup", "Fonts");
addToCustomizerMenu("option", "16px");
addToCustomizerMenu("option", "20px");
addToCustomizerMenu("optgroup", "Text Color");
addToCustomizerMenu("option", "White");
addToCustomizerMenu("option", "Magenta");


function addToCustomizerMenu(nodeType, nodeText) {

    var customizerMenuNode = document.createElement(nodeType);
    if (nodeType == "option") {
        var lastOptGroup = customizerMenu.querySelectorAll("optgroup")[-1];
        var customizerMenuText = document.createTextNode(nodeText);
        customizerMenuNode.append(customizerMenuText);
        if (lastOptGroup == undefined) {
            customizerMenu.append(customizerMenuNode);
        }
        else { 
            lastOptGroup.append(customizerMenuNode)
        }
     }
     else {
        customizerMenuNode.setAttribute("label", nodeText);
        customizerMenu.append(customizerMenuNode);
     }
}

var button = document.querySelector(".buttonConfirmation");
button.append(document.createTextNode("Change element"));
button.addEventListener("click", buttonClicked, false);

function buttonClicked(e) {
    var nodeType = elementsMenu.value.split(' ')[0];
    var nodeNum = elementsMenu.value.split(' ')[1];
    var changedNode = document.querySelectorAll(nodeType)[nodeNum - 1];
    console.log(changedNode);
    var color = customizerMenu.value;
    changeColor(changedNode, color);

}

function changeColor(node, color) { 
    node.style.color = color;
    var nodeList = node.querySelectorAll("*")
    for (let i = 0; i < nodeList.length; i++) {
        let item = nodeList[i];
        item.style.color = color;
    }
}







