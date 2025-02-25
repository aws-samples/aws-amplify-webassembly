/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */
mod utils;

use sha2::{Digest, Sha256, Sha512};
use wasm_bindgen::prelude::*;
use js_sys::Uint8Array;
use web_sys::console;

use lol_alloc::{FreeListAllocator, LockedAllocator};

#[global_allocator]
static ALLOC: LockedAllocator<FreeListAllocator> = LockedAllocator::new(FreeListAllocator::new());

// :: ----------------------------------------------------------------------------------

/// Initialize the WASM module
#[wasm_bindgen(start)]
pub fn init() {
    utils::set_panic_hook();
    console::log_1(&"WASM module initialized".into());
}

/// Calculates the SHA-256 hash of an input string.
///
/// # Example
/// 
/// ```
/// let input = "hello AWS Amplify".to_string();
/// let hash = wasm::sha256(input);
///
/// assert_eq!(
///     hash,
///     "95448e9777337076b8864c9ce37d636d235f4aa411e7755025261c70b1d0a445".to_string()
/// );
/// ```
#[wasm_bindgen]
pub fn sha256(input: String) -> String {
    let mut hasher = Sha256::new();
    hasher.update(input);
    let digest = hasher.finalize();
    format!("{:x}", digest)
}

/// Calculates the SHA-512 hash of an input string.
#[wasm_bindgen]
pub fn sha512(input: String) -> String {
    let mut hasher = Sha512::new();
    hasher.update(input);
    let digest = hasher.finalize();
    format!("{:x}", digest)
}

/// Calculates the SHA-256 hash of binary data.
#[wasm_bindgen]
pub fn sha256_bytes(data: &[u8]) -> Uint8Array {
    let mut hasher = Sha256::new();
    hasher.update(data);
    let result = hasher.finalize();
    let array = Uint8Array::new_with_length(result.len() as u32);
    array.copy_from(result.as_slice());
    array
}

/// Compares two strings in constant time to prevent timing attacks.
/// Returns true if the strings are equal, false otherwise.
#[wasm_bindgen]
pub fn constant_time_compare(a: String, b: String) -> bool {
    if a.len() != b.len() {
        return false;
    }
    
    let a_bytes = a.as_bytes();
    let b_bytes = b.as_bytes();
    
    let mut result = 0;
    for i in 0..a.len() {
        result |= a_bytes[i] ^ b_bytes[i];
    }
    
    result == 0
}

/// Returns the version of the WASM module.
#[wasm_bindgen]
pub fn version() -> String {
    env!("CARGO_PKG_VERSION").to_string()
}

/// Generates a random array of bytes with the specified length.
#[wasm_bindgen]
pub fn random_bytes(length: usize) -> Result<Uint8Array, JsValue> {
    let mut bytes = vec![0u8; length];
    getrandom::getrandom(&mut bytes)
        .map_err(|e| JsValue::from_str(&format!("Failed to generate random bytes: {}", e)))?;
    
    let array = Uint8Array::new_with_length(length as u32);
    array.copy_from(&bytes);
    Ok(array)
}
