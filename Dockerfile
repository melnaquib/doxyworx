# Note: This is currently designed to simplify development
# To get a smaller docker image, there should be 2 images generated, in 2 stages.

FROM rustlang/rust:nightly


ARG PROFILE=release
WORKDIR /next-step

# Upcd dates core parts
RUN apt-get update -y && \
	apt-get install -y cmake pkg-config libssl-dev git gcc build-essential clang libclang-dev

# Install rust wasm. Needed for substrate wasm engine
RUN rustup target add wasm32-unknown-unknown

# Download next-step repo
RUN git clone https://github.com/melnaquib/next-step /next-step
RUN cd /next-step && git submodule init && git submodule update

# Download rust dependencies and build the rust binary
RUN cargo build "--$PROFILE"

# 30333 for p2p traffic
# 9933 for RPC call
# 9944 for Websocket
# 9615 for Prometheus (metrics)
EXPOSE 30333 9933 9944 9615


ENV PROFILE ${PROFILE}

# The execution will re-compile the project to run it
# This allows to modify the code and not have to re-compile the
# dependencies.
CMD cargo run --bin next-step "--$PROFILE" -- --dev --execution native \
	--prometheus-external --execution-other native --wasm-execution interpreted-i-know-what-i-do --unsafe-rpc-external --unsafe-ws-external
