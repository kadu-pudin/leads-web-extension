const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");
const inputBtn = document.querySelector("#input-btn");
const deleteBtn = document.querySelector("#delete-btn");
const tabBtn = document.querySelector("#tab-btn");

let leadsFromLS = JSON.parse(localStorage.getItem("myLeads"));
let myLeads = [];

if (leadsFromLS) {
  myLeads = leadsFromLS;
  render(myLeads);
}

function render(leads) {
  let listItem = "";
  for (let i = leads.length - 1; i >= 0; i--) {
    listItem += `
      <li>
        <a target="_blank" href="${leads[i]}">
          ${leads[i]}
        </a>
      </li>
    `;
  }
  ulEl.innerHTML = listItem;
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteBtn.addEventListener("dblclick", function () {
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  if (inputEl.value) myLeads.push(inputEl.value);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  inputEl.value = "";
  render(myLeads);
});
