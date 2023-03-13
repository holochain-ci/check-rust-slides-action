import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const filePath = path.join(__dirname, "index.html");
const html = fs.readFileSync(filePath, "utf8");

const dom = new JSDOM(html);
const popovers = dom.window.document.querySelectorAll("span.popover");
for (const popover of popovers) {
  popover.remove();
}

const selector = "code.rust";
const rusts = dom.window.document.querySelectorAll(selector);

for (const rust of rusts) {
  // const spans = rust.querySelectorAll("span");
  // for (const span of spans) {
  //   console.log(`---> ${span.classList.toString()}`);
  //   if (!span.classList.contains("popover")) {
  //     console.log(span.textContent);
  //     console.log("~~~~");
  //   }
  // }
  const code = rust.textContent;
  console.log(code);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
}

// await foo();

// async function foo() {
//   console.log("hi");
// }
