#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;

#[wasm_bindgen_test]
fn calculates_correct_hash() {
    let input = "hello AWS Amplify".to_string();
    let hash = wasm::sha256(input);

    assert_eq!(
        hash,
        "95448e9777337076b8864c9ce37d636d235f4aa411e7755025261c70b1d0a445".to_string()
    );
}
