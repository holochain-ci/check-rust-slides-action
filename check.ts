import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const filePath = path.join(__dirname, "index.html");
const html = fs.readFileSync(filePath, "utf8");

const dom = new JSDOM(html);
const selector = "code.rust";
const rusts = dom.window.document.querySelectorAll(selector);

for (const rust of rusts) {
  // const spans = rust.querySelectorAll("span");
  const childs = rust.children;
  for (const child of childs) {
    // console.log(child.textContent);
    console.log(`---> ${child.classList.toString()}`);
    if (!child.classList.contains("popover")) {
      console.log(child.textContent);
      console.log("~~~~");
    }
  }
  // const code = rust.textContent;
  // console.log(code);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
}

// await foo();

// async function foo() {
//   console.log("hi");
// }
