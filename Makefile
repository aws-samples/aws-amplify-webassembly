build: build-webapp

build-wasm:
	@wasm-pack build --target web -s wasm-amplify-build --release wasm

link:
	@yarn --cwd webapp
	@yarn link --cwd wasm/pkg
	@yarn link --cwd webapp @wasm-amplify-build/wasm

build-webapp: build-wasm link
	@yarn --cwd webapp build
	@echo
	@echo ---
	@echo Webapp assets available at webapp/dist.

serve: build-wasm link
	@yarn --cwd webapp dev
