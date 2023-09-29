import { useColor } from '@/hooks/useColor';

const extensionVersion = chrome.runtime.getManifest().manifest_version;

export const App = () => {
  const { color } = useColor();

  const openNextPage = `
  function doStuff(){
    let list = document.querySelectorAll("div.tree-branch.tree-folder.line-item")
    let ld = list[8].children[1].querySelectorAll("div.tree-item.line-item")
    ld[parseInt(localStorage.getItem("child"))].children[0].children[0].children[0].children[0].children[0].click()
    localStorage.setItem("child", parseInt(localStorage.getItem("child"))+1)
}
doStuff()
  `;

  const openContentTab = `
  function setup(){
    document.querySelector("div.tabbable").children[0].children[3].children[0].click()
    let s = document.querySelector('[name="table_lists_length"]')
    let options = Array.from(s.options);
    options[5].selected = true
    const event = new Event('change', { bubbles: true });
    s.dispatchEvent(event);
}
setup()
  `;

  const changeToDisable = `
  const searchFilters = ["template - uf2015", "ufl.edu", "global", "PL - Accordion"];

const temp1 = document.getElementById("table_lists").children[1];

const changeToDisable = async () =>{

for await (const filter of searchFilters){

const inputElement = document.querySelector('input[aria-controls="table_lists"]');
inputElement.value = "";

const typeText = async (text) => {
  for (let i = 0; i < text.length; i++) {
    const keydownEvent = new KeyboardEvent('keydown', {
      key: text[i],
      bubbles: true,
      cancelable: true,
    });
    inputElement.dispatchEvent(keydownEvent);

    const keypressEvent = new KeyboardEvent('keypress', {
      key: text[i],
      bubbles: true,
      cancelable: true,
    });
    inputElement.dispatchEvent(keypressEvent);

    inputElement.value += text[i];

    const inputEvent = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    inputElement.dispatchEvent(inputEvent);

    await new Promise((resolve) => setTimeout(resolve, 100)); // wait for 100ms
  }
};

await typeText(filter);
if (filter !== "PL - Accordion") {
  for (let i = 0; i < temp1.children.length; i++) {
    // get all the <input> elements within the current <tr> element
    const inputs = temp1.children[i].querySelectorAll("td div label input");

    // mark the last <input> element within the row as "true" and all other <input> elements as "false"
    for (let j = 0; j < inputs.length; j++) {
      if (j === inputs.length - 1) {
      inputs[j].click();
        inputs[j].checked = true;
      } else {
        inputs[j].checked = false;
      }
    }
  }
}}
document.querySelector("button.btn.btn-primary.main-action.js-main-action-button").click();
};

changeToDisable();
  `;

  const setupLS = `
   const isLsSet = localStorage.getItem("child");
   if (!isLsSet) {
     localStorage.setItem("child", 0);
   }
  `;

  const setupLocalStorage = async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const curId = tabs[0].id;
      if (curId) {
        console.log(extensionVersion);
        if (extensionVersion === 3) {
          // chrome.scripting.executeScript({ target: { tabId: curId }, func: setupLs });
        } else {
          chrome.tabs.executeScript(curId, { code: setupLS });
        }
      }
    });
  };

  const openNextPagee = async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const curId = tabs[0].id;
      if (curId) {
        console.log(extensionVersion);
        if (extensionVersion === 3) {
          // chrome.scripting.executeScript({ target: { tabId: curId }, func: openNextPage });
        } else {
          chrome.tabs.executeScript(curId, { code: openNextPage });
        }
      }
    });
  };
  const openContentTabb = async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const curId = tabs[0].id;
      if (curId) {
        console.log(extensionVersion);
        if (extensionVersion === 3) {
          // chrome.scripting.executeScript({ target: { tabId: curId }, func: openContentTab });
        } else {
          chrome.tabs.executeScript(curId, { code: openContentTab });
        }
      }
    });
  };
  const changeToDisablee = async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const curId = tabs[0].id;
      if (curId) {
        console.log(extensionVersion);
        if (extensionVersion === 3) {
          // const funcToInject = new Function(changeToDisable)();
          // chrome.scripting.executeScript({ target: { tabId: curId }, func: funcToInject });
        } else {
          chrome.tabs.executeScript(curId, { code: changeToDisable });
        }
      }
    });
  };

  return (
    <div>
      <button onClick={setupLocalStorage}>Setup Localstorage</button>
      <button onClick={openNextPagee}>Open Next page</button>
      <button onClick={openContentTabb}>Open Content Tab</button>
      <button onClick={changeToDisablee}>Change to disable</button>
    </div>
  );
};
