///////////////////// CREATE MENU ////////////////////////////


navNode = document.querySelector("nav");
bodyNode = document.querySelector("body");
const header = document.createElement("header");
header.className = "header content-area--first";

// Adds header after the nav node
navNode.parentNode.insertBefore(header, navNode.nextSibling);

const elementsMenu = document.createElement("select");
elementsMenu.className = "selector-elements selector-menu";
header.append(elementsMenu);

const customizerMenu = document.createElement("select");
customizerMenu.className = "selector-elements selector-menu";
header.append(customizerMenu);

const button = document.createElement("button");
button.className = "button-confirmation";
header.append(button);



///////////////////// ELEMENTS MENU //////////////////////////

let elementTagsInMenu = ['body', 'header', 'article', 'section', 'aside', 'footer'];
fillElementsMenu();

// fills the elementsMenu with elements
function fillElementsMenu() {
    const elementsMenuOption = document.createElement("option");
    const elementsMenuText = document.createTextNode("Choose an element");
    elementsMenuOption.append(elementsMenuText);

    // Makes it so that the "Choose an element" option is hidden when another option is clicked (Change to a function if it looks easy?)
    elementsMenuOption.setAttribute("disabled", "");
    elementsMenuOption.setAttribute("selected", "");
    elementsMenuOption.setAttribute("hidden", "");

    elementsMenu.append(elementsMenuOption);

    // calls addToElementMenu with every tag mentioned in elementTagsInMenu
    elementTagsInMenu.forEach(tag => addToElementsMenu(document.querySelectorAll(tag)));
}

function addToElementsMenu(nodeList) {
    for (let i = 0; i < nodeList.length; i++) {
        let item = nodeList[i];
        const menuOption = document.createElement("option");
        const menuText = document.createTextNode(item.tagName[0] + item.tagName.substring(1).toLowerCase() + ` ${i + 1}`);
        menuOption.append(menuText);
        menuOption.className = "selector-menu__option";
    
        elementsMenu.append(menuOption);
    }
}

/////////////////////// CUSTOMIZE MENU ////////////////////////

addOptionToCustomizerMenu("Choose a customization");
addOptGroupToCustomizerMenu("Font Size");
addOptionToCustomizerMenu("14", "fontSize 14px");
addOptionToCustomizerMenu("15", "fontSize 15px");
addOptionToCustomizerMenu("16", "fontSize 16px");
addOptGroupToCustomizerMenu("Text Color");
addOptionToCustomizerMenu("Black", "color black");
addOptionToCustomizerMenu("Alice Blue", "color aliceblue");
addOptionToCustomizerMenu("Gray", "color gray");

// Second parameter is the value given if chosen. Colors are "color ???", font sizes are "fontSize ???"
function addOptionToCustomizerMenu(nodeText, nodeValue) {

    let optionNode = document.createElement("option");
    let optGroupList = customizerMenu.querySelectorAll("optgroup");
    let lastOptGroup = optGroupList[optGroupList.length - 1];
    let customizerMenuText = document.createTextNode(nodeText);

    // Sets the value if given
    optionNode.value = nodeValue;
    optionNode.append(customizerMenuText);
    optionNode.className = "selector-menu__option";
    
    // Checks to see if there is an optgroup to be a child of
    if (lastOptGroup == undefined) {
        // No optgroup => make the option a placeholder and append it to the menu
        optionNode.setAttribute("disabled", "");
        optionNode.setAttribute("selected", "");
        optionNode.setAttribute("hidden", "");
        customizerMenu.append(optionNode);
    }
    else { 
        // Append it to the last OptGroup
        lastOptGroup.append(optionNode)
    }
}

function addOptGroupToCustomizerMenu(nodeText) {
    optGroupNode = document.createElement("optgroup");

    optGroupNode.setAttribute("label", nodeText);
    optGroupNode.className = "selector-menu__optgroup";
    customizerMenu.append(optGroupNode);
}


////////////////// BUTTON /////////////////////////

button.append(document.createTextNode("Change element"));
button.addEventListener("click", buttonClicked, false);

// 

function buttonClicked(e) {
    // Finds the node to change
    let nodeType = elementsMenu.value.split(' ')[0];
    let nodeNum = elementsMenu.value.split(' ')[1];
    let changedNode = document.querySelectorAll(nodeType)[nodeNum - 1];

    let optionValue = customizerMenu.value;

    changeStyle(changedNode, optionValue.split(' ')[0], optionValue.split(' ')[1]);

}

// 

function changeStyle(node, style, styleValue) { 
    if (style == "color") {
        node.style.color = styleValue;
    } else {
        node.style.fontSize = styleValue;
    }

    let nodeList = node.querySelectorAll("*");
    for (let i = 0; i < nodeList.length; i++) {
        let item = nodeList[i];

        if (style == "color") {
            item.style.color = styleValue;
        } else {
            item.style.fontSize = styleValue;
        }
    }
}

// Adding styling for the info document

if (document.title == "Info")
{
    header.style =  "display:flex; width: 100%; flex-direction: row; flex-wrap: wrap; align-items: center; justify-content: center; font-family: 'Varela Round', sans-serif; margin-bottom: 20px; margin-top: 220px; column-gap: 20px;"
    
    elementsMenu.style =  "font-size: 12px; height: 30px; width: 150px; background-color: #00FFC5; text-align: center;"
    customizerMenu.style =  "font-size: 12px; height: 30px; width: 150px; background-color: #00FFC5; text-align: center;"
    
    button.style = "height: 30px; background-color: aliceblue;"
}

