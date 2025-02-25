#!
# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: MIT-0
#

#    IMPORTANT:
#
#    To be able to use a custom container image as a build environment in AWS Amplify,
#    it will need to have the following tools available inside:
#
#    1. `curl`
#    2. `git`
#    3. the OpenSSH package
#
#
#    Additionally, if the build will use Node.js and `npm` in the process (as is this repository),
#    those will also need to be pre-installed in the image.
#
#    @see https://docs.aws.amazon.com/amplify/latest/userguide/custom-build-image.html#setup

# :: -----------------------------------------------------------------------------------

# :: What tools you install in the image will depend significantly on what you use
#    to build out your WASM binaries. In this repository, we're using Rust and wasm-pack
#    for our WASM tooling, so we'll install those accordingly.
# 
#    Make sure to adjust based on your particular needs.


FROM node:20-slim

LABEL author="ilagan@amazon.com"
LABEL maintainer="ilagan@amazon.com"
LABEL description="Custom CI build image for an AWS Amplify-hosted React webapp + Rust-based WebAssembly."

# Set environment variables for Rust
ENV RUSTUP_HOME=/usr/local/rustup \
    CARGO_HOME=/usr/local/cargo \
    PATH=/usr/local/cargo/bin:$PATH

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    openssh-client \
    ca-certificates \
    gcc \
    libc6-dev \
    make \
    && rm -rf /var/lib/apt/lists/*

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | \
    sh -s -- -y --no-modify-path --default-toolchain stable && \
    rustup target add wasm32-unknown-unknown && \
    chmod -R a+w $RUSTUP_HOME $CARGO_HOME

# Install wasm-pack
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# Set up PATH in bashrc
RUN echo 'export PATH="$PATH"' >> ~/.bashrc

ENTRYPOINT ["bash", "-c"]
