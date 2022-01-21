# Creating a custom build image

[AWS Amplify][aws-amplify] lets you use a custom build image when running CI pipelines.

In this repository, we use a custom build image that is pre-installed with the tools
necessary to compile a WebAssembly (WASM) module using Rust. This allows us to complete
builds as quickly as possible, while also helping ensure that our build environments
are idempotent.

## Building the custom build image

A custom build image in AWS Amplify is a container image.
We can create one most commonly using [Docker][docker].

A `Dockerfile` is provided with this repository — this is a step-by-step list of instructions
on how to craft a container image. In this repository, we're creating an image that has
the various Rust-based tooling we require for the build already pre-installed.
If you're using a different set of tooling for your WebAssembly artifacts (such as
[Emscripten][emscripten], [Blazor][blazor], or [AssemblyScript][assemblyscript]), be sure to adjust the `Dockerfile`
to install the tools you need (and remove the tools you don't).

To create the container image, you just run the following from your shell:

```bash
# From the project root
docker build -t wasm-amplify-build-image ./ci-build-image
```

This will create the image `wasm-amplify-build-image:latest` available on your local.
You can verify this by running `docker images`.

## Making the build image available to AWS Amplify

So that AWS Amplify can use your build image, the image itself has to be somewhere
that AWS Amplify can access. At the time of this writing, this means that your image
has to be uploaded to a public repository of your choice. Commonly, this can just be
[Docker Hub][docker-hub], but you can also use a public repository on
[Amazon Elastic Container Registry (ECR)][ecr].

### Using Docker Hub

Log into your account on [Docker Hub][docker-hub], then navigate to your
[Repositories][docker-hub-repos], and opt to **Create Repository**. Specify a name
and specify that it is a **Public** repository.

> For the examples below, let's assume my repository name is `amplify-ci-image`.

To push your image to Docker Hub:

1. Log into your Docker Hub account on your shell via `docker login`,

2. Make sure your image is tagged to match your repository name above:

   ```bash
   docker tag wasm-amplify-build-image:latest <DOCKER HUB USERNAME>/<REPOSITORY NAME>:<TAG>
   ```

   ```bash
   # for example:
   docker tag wasm-amplify-build-image:latest richardneililagan/amplify-ci-image:0.1.0
   ```

3. Push the image to Docker Hub:
   ```bash
   docker push richardneililagan/amplify-ci-image:0.1.0
   ```

When creating the AWS Amplify app build configuration, your custom image name will be
`richardneililagan/amplify-ci-image:0.1.0`.

### Using Amazon ECR

[Amazon Elastic Container Registry][ecr] allows you to create public repositories as well.

> To complete the steps below, your environment will need to have the [AWS CLI][aws-cli] tool
> configured and authenticated to the appropriate AWS account.

1. On your [Amazon ECR Console][ecr-console], opt to **Create repository**.

2. Confirm that the repository is set to **Public** in **Visibility settings**.

3. Provide a repository name.
   For the next steps below, we'll use the name `amplify-ci-image` as an example.

   Confirm settings and **Create repository**.

4. Back in your Amazon ECR console, click through to your newly created repository.
   Click the **View push commands** button at the top to review the commands for pushing
   your build image to this repository from your environment.

Once pushed, your build image will be available to your AWS Amplify build configuration
in the format of `public.ecr.aws/xxHASHxx/amplify-ci-image:0.1.0`. For your convenience,
you can copy the image URI of any specific image tag you've pushed from the console.

---

[aws-cli]: https://aws.amazon.com/cli/
[aws-amplify]: https://aws.amazon.com/amplify
[docker]: https://docker.com
[docker-hub]: https://hub.docker.com
[docker-hub-repos]: https://hub.docker.com/repositories
[ecr]: https://aws.amazon.com/ecr
[ecr-console]: https://console.aws.amazon.com/ecr
[emscripten]: https://emscripten.org
[blazor]: https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor
[assemblyscript]: https://www.assemblyscript.org/
