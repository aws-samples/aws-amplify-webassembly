/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */
mod utils;

use sha2::{Digest,Sha256};
use wasm_bindgen::prelude::*;

use lol_alloc::{FreeListAllocator, LockedAllocator};

#[global_allocator]
static ALLOC: LockedAllocator<FreeListAllocator> = LockedAllocator::new(FreeListAllocator::new());

// :: ----------------------------------------------------------------------------------

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
