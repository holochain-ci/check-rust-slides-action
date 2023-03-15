import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { run } from './run'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

run(`cp ../holochain-lesson-5/index.html ./`)

const filePath = path.join(__dirname, 'index.html')
const html = fs.readFileSync(filePath, 'utf8')

const dom = new JSDOM(html)

const popovers = dom.window.document.querySelectorAll('span.popover')
for (const popover of popovers) {
	popover.remove()
}

const rusts = dom.window.document.querySelectorAll('code.rust')

const HAPP_DIR = `${__dirname}/holochain-sandbox`
const SRC_DIR = `${HAPP_DIR}/dna/src`
const LIB_PATH = `${SRC_DIR}/lib.rs`

run(`rm -rf ${SRC_DIR}/*`)
run(`rm -rf ${LIB_PATH}`)
run(`touch ${LIB_PATH}`)
// run(`echo 'use hdk::prelude::*;' | tee ${LIB_PATH}`)

let i = 1
for (const rust of rusts) {
	let code = rust.textContent || ''
	code = `use hdk::prelude::*;\n\n${code}`
	code = mark_unimplemented(code)

	const filename = `${SRC_DIR}/rust_${i}.rs`
	fs.writeFileSync(filename, code)

	let lib = fs.readFileSync(LIB_PATH, 'utf8')
	lib = `${lib}\nmod rust_${i};`
	fs.writeFileSync(LIB_PATH, lib)

	i++
}

function mark_unimplemented(code: string) {
	const warnings = [
		'/* Create, create links, get, query... */',
		'// Defined in the "Capability Tokens (VII) slide"',
		'// ... execute the rest of the code',
	]
	for (const warning of warnings) {
		code = code.replace(warning, `${warning}\n  unimplemented!();`)
	}
	return code
}

run(`cd ${HAPP_DIR} && nix develop --command bash -c "cargo build --color always"`)
