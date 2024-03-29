build: build-webapp

build-ci-image:
	@docker build -t wasm-amplify-build-image ./ci-build-image

build-wasm:
	@wasm-pack build --target web -s wasm-amplify-build --release wasm

build-webapp: build-wasm link
	@yarn --cwd webapp build
	@echo
	@echo ---
	@echo Webapp assets available at webapp/dist.

serve: build-wasm link
	@yarn --cwd webapp dev

link:
	@yarn --cwd webapp
	@yarn link --cwd wasm/pkg
	@yarn link --cwd webapp @wasm-amplify-build/wasm
