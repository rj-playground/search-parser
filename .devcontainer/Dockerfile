FROM ubuntu:noble

RUN apt update && apt install -y lsb-release wget software-properties-common gnupg

RUN cd /tmp && wget https://apt.llvm.org/llvm.sh && bash +x llvm.sh 19 all

RUN update-alternatives --install /usr/bin/c++ c++ /usr/bin/clang++-19 60
RUN update-alternatives --install /usr/bin/clang++ clang++ /usr/bin/clang++-19 60
RUN update-alternatives --install /usr/bin/cc cc /usr/bin/clang-19 60
RUN update-alternatives --install /usr/bin/clang clang /usr/bin/clang-19 60

RUN update-alternatives --install /usr/bin/ar ar /usr/bin/llvm-ar-19 60
RUN update-alternatives --install /usr/bin/nm nm /usr/bin/llvm-nm-19 60
RUN update-alternatives --install /usr/bin/lldb lldb /usr/bin/lldb-19 60
RUN update-alternatives --install /usr/bin/clangd clangd /usr/bin/clangd-19 60
RUN update-alternatives --install /usr/bin/clang-tidy tidy /usr/bin/clang-tidy-19 60

RUN curl https://sh.rustup.rs -sSf | bash -s -- -y

RUN cd /tmp && wget https://github.com/Kitware/CMake/releases/download/v3.30.4/cmake-3.30.4-linux-x86_64.sh
RUN cd /tmp && mkdir -p /usr/local/cmake-distro && bash cmake-3.30.4-linux-x86_64.sh --skip-license --prefix=/usr/local/cmake-distro
ENV PATH = "$PATH:/usr/local/cmake-distro/bin"


ENV GEN=ninja